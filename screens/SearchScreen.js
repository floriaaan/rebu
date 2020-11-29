import React, { useState } from "react";
import { Divider, Searchbar } from "react-native-paper";
import Item from "../components/Item";
import Grid from "../components/Layouts/Grid";
import ScreenTemplate from "../components/Layouts/ScreenTemplate";
import Telltale from "../components/Layouts/Telltale";

export default function SearchScreen(props) {
  const [input, setInput] = useState("");

  return (
    <ScreenTemplate
      title="Search"
      navigation={props.navigation}
      auth={props.route.params.auth}
    >
      {input === "" && (
        <Telltale
          line1={{ text: "Hey ", name: "Florian" }}
          line2={{ text: "what's up ?" }}
        ></Telltale>
      )}
      <Searchbar
        style={{ margin: 30, elevation: 1 }}
        placeholder="Search a meal/restaurant 🧐"
        value={input}
        onChangeText={(input) => setInput(input)}
      />
      <Divider style={{ marginVertical: 5 }}></Divider>
      <Grid
        columns={3}
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
        renderItem={({ item }) => (
          <Item
            name={item.name}
            image={item.image}
            price={item.price}
            style={{
              marginTop: 20,
            }}
          ></Item>
        )}
      ></Grid>
    </ScreenTemplate>
  );
}
