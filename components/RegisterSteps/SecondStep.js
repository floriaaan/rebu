import React, { useState } from "react";
import { Dimensions, View } from "react-native";

import { TextInput, Button } from "react-native-paper";

export default SecondStep = (props) => {
  const [fname, setFName] = useState(props.data.fname || "");
  const [lname, setLName] = useState(props.data.lname || "");

  const handleFName = (text) => {
    setFName(text);
  };
  const handleLName = (text) => {
    setLName(text);
  };

  const handleStep = () => {
    if (fname !== "" && lname !== "") {
      props.setData({ ...props.data, fname: fname, lname: lname });

      props.setSteps({
        current: 3,
        total: 3,
        name: "Culinary preferences",
      });

      props.setProgress([
        { value: 1 },
        { value: 1 },
        { value: 0, indeterminate: true },
      ]);
    } else {
    }
  };

  const handleBack = () => {
    props.setData({
      ...props.data,
      fname: "",
      lname: "",
    });

    props.setSteps({
      current: 1,
      total: 3,
      name: "Enter your credentials",
    });
    props.setProgress([
      { value: 0, indeterminate: true },
      { value: 0 },
      { value: 0 },
    ]);
  };

  return (
    <>
      <TextInput
        label="First name"
        type="text"
        mode="outlined"
        value={fname}
        onChangeText={(text) => handleFName(text)}
        theme={{
          colors: { primary: "#3FC060", underlineColor: "transparent" },
        }}
      ></TextInput>
      <TextInput
        color="#3FC060"
        label="Last name"
        mode="outlined"
        value={lname}
        onChangeText={(text) => handleLName(text)}
        style={{ marginTop: 10 }}
        theme={{
          colors: { primary: "#3FC060", underlineColor: "transparent" },
        }}
      ></TextInput>

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
          onPress={handleBack}
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
          Next
        </Button>
      </View>
    </>
  );
};
