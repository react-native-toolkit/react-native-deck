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
  Ref,
  DependencyList
} from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { SlideProps, ISlideRef } from "./Slide";

export interface DeckProps {
  children: ReturnType<ForwardRefExoticComponent<SlideProps>>[];
  containerStyle?: ViewStyle;
  onSlideChange?: () => any;
}

export interface IDeckStatus {
  readonly slideCount: number;
  readonly activeSlideIndex: number;
  readonly slideStageCount: number;
  readonly slideActiveStageIndex: number;
}

export interface IDeckRef extends IDeckStatus {
  nextSlide(): void;
  prevSlide(): void;
}

const useDidUpdate = (callback: () => any, deps: DependencyList) => {
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
  (
    { children, containerStyle, onSlideChange = () => null }: DeckProps,
    ref: Ref<IDeckRef>
  ) => {
    const [slides, setSlides] = useState(children);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [lastUpdateHash, setLastUpdateHash] = useState(Math.random());

    const $activeSlide = useRef<ISlideRef>(null);

    useDidUpdate(
      useCallback(() => {
        setSlides(children);
      }, [setSlides, children]),
      [setSlides, children]
    );

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
        setTimeout(() => onSlideChange(), 100);
      },

      prevSlide() {
        const activeSlideNode = $activeSlide.current;
        if (activeSlideNode) {
          if (!activeSlideNode.prevStage()) {
            if (!activeSlideIndex) {
              return;
            }
            setActiveSlideIndex(activeSlideIndex - 1);
            setTimeout(() => setLastUpdateHash(Math.random()));
          }
        }
        setTimeout(() => onSlideChange(), 100);
      }
    }));

    useDidUpdate(() => {
      const newActiveSlideNode = $activeSlide.current;
      if (newActiveSlideNode) {
        newActiveSlideNode.jumpToLastStage();
      }
    }, [lastUpdateHash]);

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
