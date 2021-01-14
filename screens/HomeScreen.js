import React, { useState } from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import Category from "../components/Category";
import ScreenTemplate from "../components/Layouts/ScreenTemplate";
import Telltale from "../components/Layouts/Telltale";

export default function HomeScreen(props) {
  return (
    <ScreenTemplate title="Rebu Eats" navigation={props.navigation} auth={props.route.params.auth}>
      <Telltale
        line1={{ text: "Hey ", name: !props.route.params.auth.isAnonymous ? "Florian": "anonymous" }}
        line2={{ text: "what's up ?" }}
      ></Telltale>
      <Category
        name={!props.route.params.auth.isAnonymous ? "Favorites meals 😍" : "Proposed meals 🧐"}
        items={[
          {
            name: "Crousty Cheese",
            image:
              "https://ws.mcdonalds.fr/media/94/c3/d0/94c3d0d9662007b5ee84b1bf5c3b645dce20ba86",
            price: "$6.90",
          },
          {
            name: "Maxi Miam",
            image:
              "https://ws.mcdonalds.fr/media/f9/2a/46/f92a4620185b701485e4b69cad53d81f67e7c3b1",
            price: "$6.90",
          },
        ]}
        favorite={true}
      ></Category>
      <Category
        name="Popular ones 🎉"
        items={[
          {
            name: "Tasty Toast",
            image:
              "https://cdn.imgbin.com/14/23/15/imgbin-fast-food-hamburger-toast-cheeseburger-quick-toast-QDgX3fMQFpsn16B7CxLaWERiT.jpg",
            price: "$6.90",
          },
          {
            name: "Dear Donut",
            image:
              "https://e7.pngegg.com/pngimages/837/78/png-clipart-bacon-egg-and-cheese-sandwich-breakfast-bagel-egg-sandwich-toast-bacon-food-cheese.png",
            price: "$6.90",
          },
        ]}
      ></Category>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <FAB
          icon="magnify"
          onPress={() => props.navigation.navigate("Search")}
          label="Find your Meal"
          color="#fff"
          style={{
            backgroundColor: "#3FC060",
            elevation: 0,
            width: 300,
            alignItems: "center",
          }}
        />
      </View>
    </ScreenTemplate>
  );
}
