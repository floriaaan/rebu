import "react-native-gesture-handler";
import React from "react";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/Layouts/DrawerContent";
const Drawer = createDrawerNavigator();
import Animated from "react-native-reanimated";

import firebase from "./utils/firebase";
import "./utils/firebase_fix";

import { routes, authentication } from "./routes";

export default function App() {
  const [auth, setAuth] = React.useState({});

  return (
    <PaperProvider
    // settings={{
    //   icon: (props) => <AwesomeIcon {...props} />,
    // }}
    >
      <StatusBar style="light"></StatusBar>
      <NavigationContainer>
        {auth.uid ? (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => (
              <DrawerContent auth={auth} _auth={setAuth} {...props} />
            )}
          >
            {routes.map((el, key) => {
              return (
                <Drawer.Screen
                  options={el.options}
                  name={el.name}
                  component={el.component}
                  key={key}
                  initialParams={{ auth: auth, _auth: setAuth }}
                />
              );
            })}
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            {authentication.map((el, key) => {
              return (
                <Stack.Screen
                  options={el.options}
                  name={el.name}
                  component={el.component}
                  key={key}
                  initialParams={{ auth: auth, _auth: setAuth }}
                />
              );
            })}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
