import React from "react";
import { View, Dimensions, Text, Platform } from "react-native";
import { Badge, IconButton } from "react-native-paper";
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
        {props.auth.uid && (
          <IconButton
            icon="menu"
            color="#fff"
            size={30}
            onPress={props.navigation.toggleDrawer}
          />
        )}

        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 30,
            letterSpacing: 10,
            paddingTop: 15,
            ...systemWeights.bold,
            color: "#fff",
            marginLeft: 20,
            marginTop: -3,
          }}
        >
          {props.title}
        </Text>
      </View>

      {props.auth.uid && (
        <View style={{ flexDirection: "row" }}>
          {props.title !== "Search" ? (
            <IconButton
              icon="magnify"
              color="#fff"
              size={27}
              onPress={() => props.navigation.navigate("Search")}
            />
          ) : (
            <IconButton
              icon="keyboard-backspace"
              color="#fff"
              size={27}
              onPress={() => props.navigation.navigate("Home")}
            />
          )}
          <View style={{ flexDirection: "column" }}>
            <IconButton
              icon="cart-outline"
              color="#fff"
              size={27}
              onPress={() => console.log("Pressed")}
            />
            <Badge
              style={{
                position: "absolute",
                marginTop: 5,
                marginRight: 5,
                backgroundColor: "#3FC060",
                color: "#fff",
                fontSize: 13,
              }}
              size={17}
            >
              3
            </Badge>
          </View>
        </View>
      )}

      {/* <Image
        style={{ height: 31, width: 190 }}
        source={require("../../assets/rebu-white.png")}
      ></Image> */}
    </View>
  );
}
