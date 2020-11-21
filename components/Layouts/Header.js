import React from "react";
import { View, Dimensions, Text, Platform } from "react-native";
import { IconButton } from "react-native-paper";
import { human, systemWeights } from "react-native-typography";

export default function Header(props) {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? 60 : 20,
        position: "absolute",
        backgroundColor: "#162328",
        padding: 25,
        width: Dimensions.get("window").width,
        height: 200,
        top: 0,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <IconButton
          icon="menu"
          color="#fff"
          size={30}
          onPress={() => console.log("Pressed")}
        />

        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 30,
            letterSpacing: 10,
            paddingTop: 15,
            ...systemWeights.bold,
            color: "#fff",
            marginLeft: 20,
            marginTop: -3
          }}
        >
          {props.title}
        </Text>
      </View>

      <IconButton
        icon="cart-outline"
        color="#fff"
        size={27}
        onPress={() => console.log("Pressed")}
      />
      {/* <Image
        style={{ height: 31, width: 190 }}
        source={require("../../assets/rebu-white.png")}
      ></Image> */}
    </View>
  );
}
