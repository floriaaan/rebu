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
         props.navigation.navigate("Order", {id: props.data.id});
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
          {props.data.provider.image && props.large ? (
            <Image
              style={{ borderRadius: 5, height: 80 }}
              source={{
                uri: props.data.provider.image,
              }}
            />
          ) : (
            <></>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>
              {props.data.provider.name} -
            </Text>
            <Text style={{ fontWeight: "bold", color: "#3FC060" }}>
              {" " + props.data.total}
            </Text>
          </View>

          {props.data.status === "in_progress" &&
            props.data.progress &&
            typeof props.data.progress === "object" && (
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
          {props.data.status === "done" && (
            <ProcessBar
              order
              steps={true}
              progress={[{ value: 1 }, { value: 1 }, { value: 1 }]}
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
        <View style={{ height: 800 }}>
          <View style={{ padding: 20 }}>
            <Text>{JSON.stringify(props.data)}</Text>
          </View>
        </View>
      </RBSheet>
    </>
  );
}
