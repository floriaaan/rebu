import React, { useState } from "react";
import Category from "../components/Category";
import ScreenTemplate from "../components/Layouts/ScreenTemplate";
import Telltale from "../components/Layouts/Telltale";

export default function HomeScreen() {
  return (
    <ScreenTemplate title="Rebu Eats">
      <Telltale
        line1={{ text: "Hey ", name: "Florian" }}
        line2={{ text: "what's up ?" }}
      ></Telltale>
      <Category
        name="Favorites meals"
        items={[
          { name: "Crousty Cheese", price: "$6.90" },
          { name: "Maxi Miam", price: "$6.90" },
        ]}
        add
      ></Category>
      <Category
        name="Popular ones"
        items={[
          { name: "Tasty Toast", price: "$6.90" },
          { name: "Dear Donut", price: "$6.90" },
        ]}
      ></Category>
    </ScreenTemplate>
  );
}
