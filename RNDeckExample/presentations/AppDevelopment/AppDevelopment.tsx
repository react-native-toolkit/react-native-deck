import React, { useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Slide, Deck } from "react-native-deck";
import Intro from "./Slides/IntroSlide/Intro";
import { TouchableOpacity } from "react-native-gesture-handler";

const AppDevelopment = () => {
  const $deckComponent = useRef(null);

  const nextSlide = () =>
    $deckComponent.current && $deckComponent.current.nextSlide();

  const prevSlide = () =>
    $deckComponent.current && $deckComponent.current.prevSlide();

  return (
    <View style={styles.container}>
      <Deck ref={$deckComponent}>
        <Slide>
          <Intro />
        </Slide>
      </Deck>
      <TouchableOpacity
        onPress={prevSlide}
        style={[styles.navButton, styles.prev]}
      >
        <Text>{"Prev"}</Text>
      </TouchableOpacity>
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
    flex: 1
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
  }
});

export default AppDevelopment;
