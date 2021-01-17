import "react-native-gesture-handler";
import React from "react";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/Layouts/DrawerContent";
const Drawer = createDrawerNavigator();

import "./utils/firebase_fix";

import { routes, authentication } from "./routes";
import { user } from "./const";

import { fromBottom, fromLeft, zoomOut } from "react-navigation-transitions";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (
    prevScene &&
    nextScene.route.routeName === "Order"
  ) {
    return fromBottom();
  }
  return fromLeft();
};

export default function App() {
  const [auth, setAuth] = React.useState(user);

  return (
    <PaperProvider
    // settings={{
    //   icon: (props) => <AwesomeIcon {...props} />,
    // }}
    >
      <StatusBar style="light"></StatusBar>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={auth.uid ? "Orders" : "Login"}
          drawerContent={(props) => (
            <DrawerContent auth={auth} _auth={setAuth} {...props} />
          )}
          transitionConfig={(nav) => handleCustomTransition(nav)}
        >
          {auth.uid &&
            routes.map((el, key) => {
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

          {!auth.uid &&
            authentication.map((el, key) => {
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
      </NavigationContainer>
    </PaperProvider>
  );
}
