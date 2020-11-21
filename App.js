import "react-native-gesture-handler";
import React from "react";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "./routes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider
      // settings={{
      //   icon: (props) => <AwesomeIcon {...props} />,
      // }}
    >
      <StatusBar style="light"></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          {routes.map((el, key) => {
            return (
              <Stack.Screen options={el.options} name={el.name} component={el.component} key={key} />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
