import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Item(props) {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 30,
        width: 150,
      }}
    >
      <TouchableOpacity
       onPress={() => {console.log('Short press')}}
       onLongPress={() => {console.log('Long press')}}>
        <View
          style={{
            height: 120,
            width: 120,
            backgroundColor: "#efefef",
            borderColor: "#ebebeb",
            borderWidth: 1,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 46, width: 46, opacity: 1 }}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
        </View>
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={{ position: "relative", fontSize: 17, marginTop: 5 }}
      >
        {props.name}
      </Text>
      <Text style={{ fontSize: 14, marginTop: 3, color: "#9A9A9A" }}>
        {props.price}
      </Text>
    </View>
  );
}
