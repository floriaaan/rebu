import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Colors, FAB, IconButton } from "react-native-paper";
import Item from "./Item";

export default function Category(props) {
  const [editMode, setEditMode] = React.useState(false);

  return (
    <View
      style={{
        paddingLeft: 50,
        marginTop: 40,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 30,
          }}
        >
          {props.name}
        </Text>
        {props.favorite && (
          <IconButton
            icon={editMode ? "close" : "trash-can-outline"}
            color={editMode ? "#707070" : Colors.red500}
            size={20}
            onPress={() => setEditMode(!editMode)}
          />
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={{ flexDirection: "row" }}
      >
        {props.items.map((el, key) => {
          return props.favorite ? (
            <Item
              name={el.name}
              image={el.image}
              price={el.price}
              edit={editMode}
              key={key}
            ></Item>
          ) : (
            <Item
              name={el.name}
              image={el.image}
              price={el.price}
              key={key}
            ></Item>
          );
        })}

        {props.favorite && (
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
      </ScrollView>
    </View>
  );
}
