import React, {
  Component,
  useRef,
  useState,
  useEffect,
  forwardRef,
  Ref,
  MutableRefObject
} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Deck,
  Slide,
  IDeckRef,
  getDeckDetails,
  useSlideControl,
  ISlideComponent,
  IDeckStatus
} from "react-native-deck";

class SlideTest extends Component {
  state = {
    level: 0
  };

  stages = [
    {
      level: 0
    },
    {
      level: 1
    },
    {
      level: 2
    },
    {
      level: 3
    },
    {
      level: 4
    }
  ];

  render() {
    return <Text>First Slide - {this.state.level}</Text>;
  }
}

class SlideTest2 extends Component {
  state = {
    level: 1
  };

  stages = [
    {
      level: 1
    },
    {
      level: 2
    },
    {
      level: 3
    },
    {
      level: 4
    },
    {
      level: 5
    }
  ];

  render() {
    return <Text>Second Slide - {this.state.level}</Text>;
  }
}

class SlideTest3 extends Component {
  state = {
    level: 1
  };

  stages = [
    {
      level: 1
    },
    {
      level: 2
    },
    {
      level: 3
    },
    {
      level: 4
    },
    {
      level: 5
    }
  ];

  render() {
    return <Text>Third Slide - {this.state.level}</Text>;
  }
}

const SlideTest4 = forwardRef((props, ref: Ref<ISlideComponent>) => {
  const activeState = useSlideControl(ref, [
    {
      level: 1
    },
    {
      level: 2
    },
    {
      level: 3
    },
    {
      level: 4
    },
    {
      level: 5
    }
  ]);
  return <Text>Fourth Slide - {activeState.level}</Text>;
});

const SimpleExample = () => {
  const $deckComponent = useRef<IDeckRef>(null);
  const [deckStatus, setDeckStatus] = useState<IDeckStatus | null>(null);

  const nextSlide = () =>
    $deckComponent.current && $deckComponent.current.nextSlide();

  const prevSlide = () =>
    $deckComponent.current && $deckComponent.current.prevSlide();

  useEffect(() => {
    if ($deckComponent.current) {
      setDeckStatus(
        getDeckDetails($deckComponent as MutableRefObject<IDeckRef>)
      );
    }
  }, []);

  const slideChangeCb = () => {
    if ($deckComponent.current) {
      setDeckStatus(
        getDeckDetails($deckComponent as MutableRefObject<IDeckRef>)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Deck ref={$deckComponent} onSlideChange={slideChangeCb}>
        {[
          <Slide key={0}>
            <SlideTest />
          </Slide>,
          <Slide key={1}>
            <SlideTest2 />
          </Slide>,
          <Slide key={2}>
            <SlideTest3 />
          </Slide>,
          <Slide key={3}>
            <SlideTest4 />
          </Slide>
        ]}
      </Deck>
      <TouchableOpacity
        onPress={prevSlide}
        style={[styles.navButton, styles.prev]}
      >
        <Text>{"Prev"}</Text>
      </TouchableOpacity>
      {deckStatus && (
        <Text
          style={styles.infoText}
        >{`Current Slide - ${deckStatus.activeSlideIndex +
          1} | Total Slides - ${
          deckStatus.slideCount
        } | Current Stage - ${deckStatus.slideActiveStageIndex +
          1} | Total Stages - ${deckStatus.slideStageCount}`}</Text>
      )}
      <TouchableOpacity
        onPress={nextSlide}
        style={[styles.navButton, styles.next]}
      >
        <Text>{"Next"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  navButton: {
    position: "absolute",
    bottom: 40
  },
  prev: {
    left: 40
  },
  next: {
    right: 40
  },
  infoText: {
    position: "absolute",
    bottom: 40
  }
});

export default SimpleExample;
