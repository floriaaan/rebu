import React from "react";
import { View, Text } from "react-native";
import { FAB } from "react-native-paper";
import Item from "./Item";

export default function Category(props) {
  return (
    <View
      style={{
        paddingLeft: 50,
        marginTop: 40,
        flexDirection: "column",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          marginBottom: 20,
        }}
      >
        {props.name}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props.items.map((el, key) => {
          return <Item name={el.name} price={el.price} key={key}></Item>;
        })}

        {props.add && (
          <FAB
            style={{
              backgroundColor: "#3FC060",
              width: 58,
              height: 58,
              position: "relative",
              marginTop: -50,
              marginLeft: 10,
              elevation: 0,
            }}
            icon="plus"
            color="#fff"
            onPress={() => console.log("Pressed")}
          />
        )}
      </View>
    </View>
  );
}
