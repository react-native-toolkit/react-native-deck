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
  ForwardRefExoticComponent
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

const Deck = forwardRef(({ children, containerStyle }: DeckProps, ref) => {
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
});

const styles = StyleSheet.create({
  deckContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Deck;
