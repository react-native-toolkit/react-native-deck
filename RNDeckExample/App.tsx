import React from "react";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/HomeScreen/Home";
import SimpleExample from "./presentations/SimpleExample/SimpleExample";

export type RootStackParamList = {
  Home: undefined;
  SimpleExample: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
