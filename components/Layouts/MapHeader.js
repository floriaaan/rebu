import React from 'react'
import { View, Dimensions, Image, Platform } from 'react-native'

export default function MapHeader() {
    return (
        <View
      style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
        position: "absolute",
        backgroundColor: "#11111180",
        padding: 20,
        width: Dimensions.get("window").width,
        height: 100,

        top: 0,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image style={{height:31, width:190}} source={ require('../../assets/rebu-white.png')}></Image>
    </View>
    )
}
