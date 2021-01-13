import React, { useState } from "react";

import { Button, Checkbox } from "react-native-paper";

import { Culinary } from "../../const";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, Text, View } from "react-native";

export default SecondStep = (props) => {
  const [culinaryPreferences, setCP] = useState([]);

  const handleStep = () => {
    if (fname !== "" && lname !== "") {
      props.setData({
        ...props.data,
        culinaryPreferences: culinaryPreferences,
      });

      props.setSteps(true);

      props.setProgress([{ value: 1 }, { value: 1 }, { value: 1 }]);
    } else {
    }
  };

  const handleCheck = (culinary) => {
    if (!culinaryPreferences.includes(culinary)) {
      setCP([...culinaryPreferences, culinary]);
    } else {
      let tmpCP = culinaryPreferences;
      tmpCP.splice(tmpCP.indexOf(culinary));
      setCP(tmpCP);
    }
  };

  return (
    <>
      <ScrollView style={{ height: Dimensions.get("screen").height / 3 }}>
        {Culinary.map((el, key) => {
          return (
            <View key={key}>
              <Checkbox.Item
                label={<Text>{el.name}</Text>}
                labelStyle={{ color: "black" }}
                color="#3FC060"
                status={
                  culinaryPreferences.includes(el) ? "checked" : "unchecked"
                }
                onPress={() => handleCheck(el)}
              />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          icon="arrow-left"
          style={{ width: Dimensions.get("screen").width / 2 - 25 }}
          color="#162328"
          mode="outlined"
        >
          Back
        </Button>
        <Button
          style={{ width: Dimensions.get("screen").width / 2 - 25 }}
          icon="arrow-right"
          color="#3FC060"
          mode="outlined"
          onPress={handleStep}
        >
          Register
        </Button>
      </View>
    </>
  );
};
