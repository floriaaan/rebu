import React from "react";
import { View, Dimensions } from "react-native";
import Header from "./Header";

export default function ScreenTemplate(props) {
  return (
    <View>
      <Header title={props.title} navigation={props.navigation} auth={props.auth}></Header>
      <View
        style={{
          position: "absolute",
          borderRadius: 40,
          backgroundColor: "#fff",
          height: Dimensions.get('screen').height - 150,
          top: 150,
          width: Dimensions.get('window').width,
          padding: 20,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}
