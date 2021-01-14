import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import ProcessBar from "../Layouts/ProcessBar";

export default function Order(props) {
  const refRBSheet = React.useRef();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          console.log("Short press");
        }}
        onLongPress={() => refRBSheet.current.open()}
      >
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 20,
            backgroundColor: "#efefef",
            height: props.large ? 200 : 100,
            paddingHorizontal: 20,
            paddingTop: 30,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {props.data.provider.image ? (
            <Image
              style={{ borderRadius: 20, height: 50 }}
              source={{
                uri: props.data.image,
              }}
            />
          ) : (
            <></>
          )}

          {props.data.progress && typeof props.data.progress === "object" && (
            <ProcessBar
              order
              steps={
                props.data.steps && typeof props.data.steps === "object"
                  ? props.data.steps
                  : true
              }
              progress={props.data.progress}
            ></ProcessBar>
          )}
        </View>
      </TouchableOpacity>

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
          <View style={{ padding: 20 }}>
            <Text>{JSON.stringify(props.data)}</Text>
          </View>
        </View>
      </RBSheet>
    </>
  );
}
