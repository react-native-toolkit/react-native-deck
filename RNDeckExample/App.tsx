import React, { useState, useEffect } from "react";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/HomeScreen/Home";
import SimpleExample from "./presentations/SimpleExample/SimpleExample";
import AppDevelopment from "./presentations/AppDevelopment/AppDevelopment";
import * as Font from "expo-font";
import { Platform, UIManager } from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type RootStackParamList = {
  Home: undefined;
  SimpleExample: undefined;
  AppDevelopment: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState<boolean>(false);

  useEffect(() => {
    Font.loadAsync({
      "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
      "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf")
    })
      .then(() => {
        setIsFontLoaded(true);
      })
      .catch(() => {
        setIsFontLoaded(true);
      });
  }, []);

  if (!isFontLoaded) return null;

  return (
    <NavigationNativeContainer>
      <Stack.Navigator headerMode="screen" initialRouteName="AppDevelopment">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "React Native Deck" }}
        />
        <Stack.Screen
          name="SimpleExample"
          component={SimpleExample}
          options={{ title: "A Simple Presentation for explaining RNDeck" }}
        />
        <Stack.Screen
          name="AppDevelopment"
          component={AppDevelopment}
          options={{
            title: "Evolution of Application Development",
            header: () => null
          }}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
