import React, { useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Restaurant from "./Restaurant";
import { Title } from "react-native-paper";



export default function PreviewList({data}) {
  const [restaurants, setRestaurants] = useState(data);
  return (
    <>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#11111180",
          padding: 20,
          width: Dimensions.get("window").width,
          height: 270,

          bottom: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Title style={{color: 'white', margin:20}}>For you</Title>
        <View
          style={{
            marginTop:20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {restaurants.map((item, key) => {
              return (
                <Restaurant
                  title={item.address.amenity}
                  address={(item.address.house_number || "") + " " +item.address.road + " - " + item.address.city + " " + item.address.postcode}
                  key={key}
                ></Restaurant>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
