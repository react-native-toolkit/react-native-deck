import React, {
  Component,
  ReactNode,
  Children,
  cloneElement,
  createRef,
  RefObject
} from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface DeckProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

export interface DeckState {
  slides: ReactNode[];
  activeSlideIndex: number;
}

export interface SlideNode {
  nextStage: () => boolean;
  prevStage: () => boolean;
  jumpToLastStage: () => void;
  stageCount: number;
  activeStageIndex: number;
}

export interface SlideInterface extends RefObject<SlideNode> {
  current: SlideNode | null;
}

class Deck extends Component<DeckProps, DeckState> {
  state = {
    slides: [],
    activeSlideIndex: 0
  };
  $activeSlide: SlideInterface = createRef();

  get slideCount() {
    return this.state.slides.length;
  }

  get activeSlideIndex() {
    return this.state.activeSlideIndex;
  }

  get slideStageCount() {
    if (this.$activeSlide.current) {
      const { stageCount = 0 } = this.$activeSlide.current;
      return stageCount;
    } else {
      return 0;
    }
  }

  get slideActiveStageIndex() {
    if (this.$activeSlide.current) {
      const { activeStageIndex = 0 } = this.$activeSlide.current;
      return activeStageIndex;
    } else {
      return 0;
    }
  }

  setSlides = (childrenWithProps: ReactNode[]) =>
    this.setState({ slides: childrenWithProps });

  setActiveSlideIndex = (nextSlideIndex: number) =>
    this.setState({ activeSlideIndex: nextSlideIndex });

  componentDidMount() {
    const { children } = this.props;
    const childrenWithProps = Children.map(children, child =>
      cloneElement(child, { ref: this.$activeSlide })
    );
    this.setSlides(childrenWithProps);
  }

  nextSlide = () => {
    const { activeSlideIndex, slides } = this.state;
    const activeSlideNode = this.$activeSlide.current;
    if (activeSlideNode) {
      if (!activeSlideNode.nextStage()) {
        const nextSlideIndex = activeSlideIndex + 1;
        if (nextSlideIndex === slides.length) {
          return;
        }
        this.setActiveSlideIndex(nextSlideIndex);
      }
    }
  };

  prevSlide = () => {
    const { activeSlideIndex } = this.state;
    const activeSlideNode = this.$activeSlide.current;
    if (activeSlideNode) {
      if (!activeSlideNode.prevStage()) {
        if (!activeSlideIndex) {
          return;
        }
        this.setActiveSlideIndex(activeSlideIndex - 1);
        setTimeout(() => {
          const newActiveSlideNode = this.$activeSlide.current;
          if (newActiveSlideNode) {
            newActiveSlideNode.jumpToLastStage();
          }
        });
      }
    }
  };

  render() {
    const { containerStyle } = this.props;
    const { slides = [], activeSlideIndex = 0 } = this.state;

    return (
      <View style={[styles.deckContainer, containerStyle]}>
        {slides[activeSlideIndex]}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Deck;
