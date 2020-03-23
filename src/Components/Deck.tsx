import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  Children,
  cloneElement,
  isValidElement,
  ForwardRefExoticComponent,
  Ref
} from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { SlideProps } from "./Slide";

export interface DeckProps {
  children: ReturnType<ForwardRefExoticComponent<SlideProps>>[];
  containerStyle?: ViewStyle;
}

export interface ISlideNode {
  nextStage: () => boolean;
  prevStage: () => boolean;
  jumpToLastStage: () => void;
  stageCount: number;
  activeStageIndex: number;
}

export interface IDeckRef {
  readonly slideCount: number;
  readonly activeSlideIndex: number;
  readonly slideStageCount: number;
  readonly slideActiveStageIndex: number;
  nextSlide(): void;
  prevSlide(): void;
}

const useDidUpdate = (callback: () => any, deps: any[]) => {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const Deck = forwardRef(
  ({ children, containerStyle }: DeckProps, ref: Ref<IDeckRef>) => {
    const [slides, setSlides] = useState(children);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const $activeSlide = useRef<ISlideNode>(null);

    useDidUpdate(
      useCallback(() => {
        setSlides(children);
        setActiveSlideIndex(0);
      }, [setSlides, setActiveSlideIndex, children]),
      [setSlides, setActiveSlideIndex, children]
    );

    // useEffect(() => {
    //   const childrenWithProps = Children.map(children, child =>
    //     isValidElement(child) ? cloneElement(child, { ref: $activeSlide }) : null
    //   );
    //   setSlides(childrenWithProps);
    // });

    useImperativeHandle(ref, () => ({
      get slideCount(): number {
        return slides.length;
      },
      get activeSlideIndex(): number {
        return activeSlideIndex;
      },
      get slideStageCount(): number {
        if ($activeSlide.current) {
          const { stageCount = 0 } = $activeSlide.current;
          return stageCount;
        } else {
          return 0;
        }
      },

      get slideActiveStageIndex() {
        if ($activeSlide.current) {
          const { activeStageIndex = 0 } = $activeSlide.current;
          return activeStageIndex;
        } else {
          return 0;
        }
      },
      nextSlide() {
        const activeSlideNode = $activeSlide.current;
        if (activeSlideNode) {
          if (!activeSlideNode.nextStage()) {
            const nextSlideIndex = activeSlideIndex + 1;
            if (nextSlideIndex === slides.length) {
              return;
            }
            setActiveSlideIndex(nextSlideIndex);
          }
        }
      },

      prevSlide() {
        const activeSlideNode = $activeSlide.current;
        if (activeSlideNode) {
          if (!activeSlideNode.prevStage()) {
            if (!activeSlideIndex) {
              return;
            }
            setActiveSlideIndex(activeSlideIndex - 1);
            setTimeout(() => {
              const newActiveSlideNode = $activeSlide.current;
              if (newActiveSlideNode) {
                newActiveSlideNode.jumpToLastStage();
              }
            });
          }
        }
      }
    }));

    return (
      <View style={[styles.deckContainer, containerStyle]}>
        {Children.map(slides[activeSlideIndex], child =>
          isValidElement(child)
            ? cloneElement(child, { ref: $activeSlide })
            : null
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  deckContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Deck;
