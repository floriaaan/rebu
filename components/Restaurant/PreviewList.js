import React, { useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Restaurant from "./Restaurant";

const tmp = [
  {
    title: "Le Florian",
    address: "22bis rue du Gros Horloge, Rouen",
  },
  {
    title: "Pascaline",
    address: "5 rue du coquelicot, Marseille",
  },
  {
    title: "Garden Resto",
    address: "2 rue de la carpette, Toulouse",
  },
  {
    title: "Chez Gill",
    address: "1 rue du Bonheur, Rouen",
  },
];

export default function PreviewList() {
  const [restaurants, setRestaurants] = useState(tmp);
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "#11111180",
        padding: 20,
        width: Dimensions.get("window").width,
        height: 210,

        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((item, key) => {
          return (
            <Restaurant
              title={item.title}
              address={item.address}
              key={key}
            ></Restaurant>
          );
        })}
      </ScrollView>
    </View>
  );
}
