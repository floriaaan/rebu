import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ProgressBar } from "react-native-paper";

export default function ProcessBar(props) {
  return (
    <View style={{ ...props.containerStyle }}>
      {props.steps !== true && (
        <View
          style={{
            flexDirection: "row",
            marginBottom: props.order ? 5 : 0,
            ...props.style,
          }}
        >
          {!props.order && <Text style={{ fontSize: 18 }}>Step </Text>}
          <Text
            style={{
              color: props.color || "#3FC060",
              fontSize: props.order ? 14 : 18,
              fontWeight: "bold",
            }}
          >
            {props.steps.current}
          </Text>
          <Text style={{ fontSize: props.order ? 14 : 18, color: "#777" }}>
            {" "}
            {props.order ? " / " : "on"} {props.steps.total} :{" "}
          </Text>
          <Text
            style={{
              color: props.color || "#3FC060",
              fontSize: props.order ? 14 : 18,
              fontWeight: "bold",
            }}
          >
            {props.steps.name}
          </Text>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("screen").width,
          marginLeft: props.order ? 0 : 30,
          marginBottom: 30,
        }}
      >
        {props.progress.map((el, key) => {
          return (
            <ProgressBar
              key={key}
              progress={el.value}
              style={{
                width:
                  (Dimensions.get("screen").width -
                    (100 + props.progress.length * 5)) /
                  props.progress.length,
                marginRight: 5,
                ...el.style,
              }}
              indeterminate={el.indeterminate}
              color={props.color || "#3FC060"}
            />
          );
        })}
      </View>
    </View>
  );
}
