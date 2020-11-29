import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import Item from "../Item";

export default function Grid(props) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <FlatList
        
        data={props.items}
        renderItem={props.renderItem}
        numColumns={props.columns}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}
