import React, { Component, useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Deck, Slide } from "react-native-deck";

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
    return <Text>Second Slide - {this.state.level}</Text>;
  }
}

class SlideTest3 extends Component {
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
    return <Text>Third Slide - {this.state.level}</Text>;
  }
}

const SimpleExample = () => {
  const $deckComponent = useRef(null);
  const [deckStatistics, setDeckStatistics] = useState([0, 0, 0, 0]);

  const nextSlide = () =>
    $deckComponent.current && $deckComponent.current.nextSlide();

  const prevSlide = () =>
    $deckComponent.current && $deckComponent.current.prevSlide();

  useEffect(() => {
    const deckInstance = $deckComponent.current;
    if (deckInstance) {
      setDeckStatistics([
        deckInstance.activeSlideIndex,
        deckInstance.slideCount,
        deckInstance.slideActiveStageIndex,
        deckInstance.slideStageCount
      ]);
    }
  });

  return (
    <View style={styles.container}>
      <Deck ref={$deckComponent}>
        <Slide>
          <SlideTest />
        </Slide>
        <Slide>
          <SlideTest2 />
        </Slide>
        <Slide>
          <SlideTest3 />
        </Slide>
      </Deck>
      <TouchableOpacity
        onPress={prevSlide}
        style={[styles.navButton, styles.prev]}
      >
        <Text>{"Prev"}</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>{`Current Slide - ${deckStatistics[0] +
        1} | Total Slides - ${
        deckStatistics[1]
      } | Current Stage - ${deckStatistics[2] + 1} | Total Stages - ${
        deckStatistics[3]
      }`}</Text>
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
