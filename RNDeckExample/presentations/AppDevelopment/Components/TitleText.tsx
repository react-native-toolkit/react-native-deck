import React from "react";
import { Text, StyleSheet, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";
import { CONSTANT_titleFont } from "../../../constants";

export interface TitleTextProps {
  title: string;
  containerStyle?: ViewStyle;
  textAlign?: "left" | "right" | "center" | "auto" | "justify";
  animation?: Animatable.Animation;
}

const TitleText = ({
  title,
  containerStyle,
  textAlign = "left",
  animation = "fadeInUp"
}: TitleTextProps) => {
  const textStyle = {
    textAlign
  };

  return (
    <Animatable.View animation={animation} style={[containerStyle]}>
      <Text style={[styles.titleTextStyle, textStyle]}>{title}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  titleTextStyle: {
    fontFamily: CONSTANT_titleFont,
    fontSize: 24
  }
});

export default TitleText;
