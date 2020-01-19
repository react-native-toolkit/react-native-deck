import React, { Component } from "react";
import { View, StyleSheet, Text, LayoutAnimation } from "react-native";
import TitleText from "../../Components/TitleText";
import { responsiveHeight } from "react-native-responsive-dimensions";
import DescriptionText from "../../Components/DescriptionText";

class Intro extends Component {
  state = {
    title: true,
    desc: false
  };

  stages = [
    {
      title: true,
      desc: false
    },
    {
      title: true,
      desc: true
    }
  ];

  componentDidMount() {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState(this.stages[1]);
    }, 1500);
  }

  render() {
    const { title, desc } = this.state;

    return (
      <View style={styles.slideContainer}>
        {title && (
          <TitleText
            containerStyle={styles.titleTextContainer}
            title={"Evolution of Application Development"}
            textAlign="center"
          />
        )}
        {desc && (
          <DescriptionText
            containerStyle={styles.descriptionContainer}
            text={"By Dani Akash"}
            textAlign="center"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: responsiveHeight(40)
  },
  titleTextContainer: { marginVertical: 16 },
  descriptionContainer: { marginVertical: 16 }
});

export default Intro;
