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
  Ref
} from "react";

export interface SlideProps {
  children: ReactNode;
  nextStage?: () => boolean;
  prevStage?: () => boolean;
}

export interface ISlideElement {
  stages: object[];
  setState: (arg1: object) => any;
}

export interface ISlideRef {
  readonly stageCount: number;
  readonly activeStageIndex: number;
  nextStage(): boolean;
  prevStage(): boolean;
  jumpToLastStage(): false;
}

const Slide = forwardRef(({ children }: SlideProps, ref: Ref<ISlideRef>) => {
  const [ChildNode, setChildNode] = useState<ReactNode>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const $slideElement = useRef<ISlideElement>(null);

  useImperativeHandle(ref, () => ({
    get stageCount(): number {
      return activeStageIndex;
    },
    get activeStageIndex(): number {
      return activeStageIndex;
    },
    nextStage() {
      if ($slideElement.current) {
        const { stages = [] } = $slideElement.current;
        const newStageIndex = activeStageIndex + 1;
        if (newStageIndex === stages.length) {
          return false;
        }
        const newState = stages[newStageIndex];
        $slideElement.current.setState(newState);
        setActiveStageIndex(newStageIndex);
        return true;
      }
      return false;
    },
    prevStage() {
      if ($slideElement.current) {
        if (!activeStageIndex) {
          return false;
        }
        const { stages = [] } = $slideElement.current;
        const newStageIndex = activeStageIndex - 1;
        const newState = stages[newStageIndex];
        $slideElement.current.setState(newState);
        setActiveStageIndex(newStageIndex);
        return true;
      }
      return false;
    },
    jumpToLastStage() {
      if ($slideElement.current) {
        const { stages = [] } = $slideElement.current;
        const newStageIndex = stages.length - 1;
        const newState = stages[newStageIndex];
        $slideElement.current.setState(newState);
        setActiveStageIndex(newStageIndex);
      }
      return false;
    }
  }));

  useEffect(() => {
    const childrenWithProps = Children.map(children, child =>
      isValidElement(child)
        ? cloneElement(child, {
            ref: $slideElement
          })
        : null
    );
    setChildNode(childrenWithProps);
  }, [children]);

  return <>{ChildNode}</>;
});

export default Slide;
