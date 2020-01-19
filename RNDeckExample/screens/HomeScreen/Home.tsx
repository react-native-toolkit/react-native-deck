import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

export interface HomeProps {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}

const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.titleText}>
        Presentations built with React Native Deck
      </Text>
      <View style={styles.button}>
        <Button
          title="Simple Example"
          color="purple"
          onPress={() => navigation.navigate("SimpleExample")}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="App Development"
          color="gold"
          onPress={() => navigation.navigate("AppDevelopment")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold"
  },
  button: {
    marginVertical: 8
  }
});

export default Home;
