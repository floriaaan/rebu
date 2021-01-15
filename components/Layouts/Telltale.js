import React from "react";
import { View, Text } from "react-native";
import { systemWeights } from "react-native-typography";

export default function Telltale(props) {
  return (
    <View
      style={
        props.style
          ? props.style
          : { padding: 50, paddingTop: 80, paddingBottom: 40 }
      }
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={{ ...systemWeights.bold, fontSize: 40 }}>
          {props.line1.text}
        </Text>
        <Text style={{ ...systemWeights.bold, fontSize: 40, color: "#3FC060" }}>
          {props.line1.name}
        </Text>
        {props.line2 && (
          <Text style={{ ...systemWeights.bold, fontSize: 40 }}>,</Text>
        )}
      </View>
      {props.line2 && (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 27 }}>{props.line2.text}</Text>
        </View>
      )}
    </View>
  );
}
