import React, { useState } from "react";
import ScreenTemplate from "../components/Layouts/ScreenTemplate";
import Telltale from "../components/Layouts/Telltale";
import Receipt from "../components/Receipt";

export default function ReceiptScreen(props) {
  return (
    <ScreenTemplate title="Receipt" navigation={props.navigation} auth={props.route.params.auth}>
      <Telltale
        line1={{ text: "Thanks ", name: "Florian" }}
        line2={{ text: "enjoy your meal 💞" }}
      ></Telltale>
      <Receipt
        items={[
          { name: "Handcrafted Meal", qty: 1, price: "9.90" },
          {
            name: "Menu WacFirst",
            qty: 1,
            price: 4.95,
            details: [
              { name: "Chicken" },
              { name: "Ice Tea" },
              { name: "Potatoes" },
              { name: "Special Sauce" },
            ],
          },
        ]}
      ></Receipt>
    </ScreenTemplate>
  );
}
