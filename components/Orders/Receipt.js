import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";
// import TearLines from "react-native-tear-lines";

export default function Receipt(props) {
  const svRef = useRef(null);
  return (
    <View style={{ maxHeight: 400 }}>
      {/* <TearLines
        ref={svRef}
        color="#EBEBEB"
        backgroundColor="#fff"
        width={444}
      ></TearLines> */}
      <ScrollView
        style={{
          padding: 30,
          backgroundColor: "#EBEBEB",
        }}
        ref={svRef}
      >
        {props.items.map((el, key) => {
          return (
            <View
              style={{ flexDirection: "column", marginBottom: 14 }}
              key={key}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#aaa" }}>{el.qty}x</Text>
                  <Text style={{ fontSize: 18, color: "#111", marginLeft: 8 }}>
                    {el.name}
                  </Text>
                </View>

                <Text style={{ fontSize: 18, color: "#999" }}>{el.price}</Text>
              </View>

              {el.details && (
                <View style={{ marginLeft: 30, flexDirection: "column" }}>
                  {el.details.map((el2, key2) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        key={key2}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          {el2.qty && (
                            <Text style={{ fontSize: 18, color: "#aaa" }}>
                              {el2.qty}x
                            </Text>
                          )}
                          {el2.name && (
                            <Text
                              style={{
                                fontSize: 18,
                                color: "#999",
                                marginLeft: 8,
                              }}
                            >
                              {el2.name}
                            </Text>
                          )}
                        </View>

                        {el2.price && (
                          <Text style={{ fontSize: 18, color: "#999" }}>
                            {el2.price}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      {/* <TearLines
        isUnder
        ref={svRef}
        color="#EBEBEB"
        backgroundColor="#fff"
        width={444}
      ></TearLines> */}
    </View>
  );
}
