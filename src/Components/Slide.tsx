import React, {
  ReactNode,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  Children,
  cloneElement,
  isValidElement,
  Ref,
  RefObject
} from "react";
import { ISlideComponent } from "./useSlideControl";

export interface SlideProps {
  children: ReactNode;
  nextStage?: () => boolean;
  prevStage?: () => boolean;
}

export interface ISlideRef {
  readonly stageCount: number;
  readonly activeStageIndex: number;
  nextStage(): boolean;
  prevStage(): boolean;
  jumpToLastStage(): boolean;
}

const cloneSlides = (
  children: ReactNode,
  slideRef: RefObject<ISlideComponent>
) =>
  Children.map(children, child =>
    isValidElement(child)
      ? cloneElement(child, {
          ref: slideRef
        })
      : null
  );

const Slide = forwardRef(({ children }: SlideProps, ref: Ref<ISlideRef>) => {
  const [ChildNode, setChildNode] = useState<ReactNode>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const $slideElement = useRef<ISlideComponent>(null);

  useImperativeHandle(ref, () => ({
    get stageCount(): number {
      if ($slideElement.current) {
        const { stages = [] } = $slideElement.current;
        return stages.length;
      } else {
        return 0;
      }
    },
    get activeStageIndex(): number {
      return activeStageIndex;
    },
    nextStage() {
      if ($slideElement.current) {
        const { stages = [], slideActions } = $slideElement.current;
        const newStageIndex = activeStageIndex + 1;
        if (newStageIndex >= stages.length) {
          return false;
        }
        const newState = stages[newStageIndex];
        $slideElement.current.setState(newState);
        setActiveStageIndex(newStageIndex);
        if (
          slideActions &&
          slideActions[newStageIndex] &&
          slideActions[newStageIndex].forward
        ) {
          // @ts-ignore
          slideActions[newStageIndex].forward();
        }
        return true;
      }
      return false;
    },
    prevStage() {
      if ($slideElement.current) {
        if (!activeStageIndex) {
          return false;
        }
        const { stages = [], slideActions } = $slideElement.current;
        const newStageIndex = activeStageIndex - 1;
        const newState = stages[newStageIndex];
        $slideElement.current.setState(newState);
        setActiveStageIndex(newStageIndex);
        if (
          slideActions &&
          slideActions[newStageIndex + 1] &&
          slideActions[newStageIndex + 1].backward
        ) {
          // @ts-ignore
          slideActions[newStageIndex + 1].backward();
        }
        return true;
      }
      return false;
    },
    jumpToLastStage() {
      if ($slideElement.current) {
        const { stages = [], slideActions } = $slideElement.current;
        const newStageIndex = stages.length - 1;
        const newState = stages[newStageIndex];
        $slideElement.current.setState(newState);
        setActiveStageIndex(newStageIndex);
        if (
          slideActions &&
          slideActions[newStageIndex] &&
          slideActions[newStageIndex].forward
        ) {
          // @ts-ignore
          slideActions[newStageIndex].forward();
        }
        return true;
      }
      return false;
    }
  }));

  useEffect(() => {
    const childrenWithProps = cloneSlides(children, $slideElement);
    setChildNode(childrenWithProps);
  }, [children]);

  return <>{ChildNode ? ChildNode : cloneSlides(children, $slideElement)}</>;
});

export default Slide;
