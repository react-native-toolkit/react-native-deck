import React from "react";
import { Text, ViewStyle, StyleSheet, TextStyle } from "react-native";
import * as Animatable from "react-native-animatable";
import { CONSTANT_normalFont } from "../../../constants";

export interface DescriptionTextProps {
  text: string;
  containerStyle?: ViewStyle;
  textAlign?: "left" | "right" | "center" | "auto" | "justify";
  animation?: Animatable.Animation;
}

const DescriptionText = ({
  text,
  textAlign = "left",
  animation = "fadeInUp",
  containerStyle
}: DescriptionTextProps) => {
  const textStyle = {
    textAlign
  };

  return (
    <Animatable.View animation={animation} style={[containerStyle]}>
      <Text style={[styles.titleTextStyle, textStyle]}>{text}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  titleTextStyle: {
    fontFamily: CONSTANT_normalFont,
    fontSize: 18
  }
});

export default DescriptionText;
