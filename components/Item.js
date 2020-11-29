import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Button, Colors, Divider, IconButton } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { systemWeights } from "react-native-typography";

export default function Item(props) {
  const refRBSheet = React.useRef();
  const [fav, setFav] = React.useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 30,
          width: 150,
          ...props.style,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log("Short press");
          }}
          onLongPress={() => refRBSheet.current.open()}
        >
          <View
            style={{
              height: 120,
              width: 120,
              backgroundColor: "#efefef",
              borderColor: "#ebebeb",
              borderWidth: 1,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 100, width: 100, opacity: 1 }}
              source={{
                uri: props.image,
              }}
            />
          </View>
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{ position: "relative", fontSize: 17, marginTop: 5 }}
        >
          {props.name}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 3, color: "#9A9A9A" }}>
          {props.price}
        </Text>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        }}
      >
        <View style={{ height: 400 }}>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
            }}
          >
            <Image
              style={{ height: 100, width: 100, opacity: 1 }}
              source={{
                uri: props.image,
              }}
            />
            <View
              style={{ flexDirection: "column", marginLeft: 10, marginTop: 20 }}
            >
              <Text style={{ ...systemWeights.bold, fontSize: 28 }}>
                {props.name}
              </Text>
              <Text
                style={{
                  ...systemWeights.light,
                  fontSize: 15,
                  color: "#707070",
                  marginLeft: 5,
                }}
              >
                Price : {props.price}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                icon={fav ? "heart" : "heart-outline"}
                color={Colors.red500}
                size={25}
                animated
                onPress={() => setFav(!fav)}
              />
            </View>
          </View>
          <Divider></Divider>
          <Button
            icon="plus"
            mode="contained"
            color="#3FC060"
            onPress={() => {
              console.log("add to cart");
            }}
            style={{
              marginTop: 30,
              marginHorizontal: 40,
              color: "#fff",
              elevation: 0,
            }}
          >
            <Text style={{ color: "#fff" }}>Add to cart</Text>
          </Button>
        </View>
      </RBSheet>
    </>
  );
}
