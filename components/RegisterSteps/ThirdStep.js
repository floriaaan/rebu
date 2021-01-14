import React, { useState } from "react";

import { Button, Checkbox } from "react-native-paper";

import { Culinary } from "../../const";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, Text, View } from "react-native";

import firebase from "../../utils/firebase";

export default SecondStep = (props) => {
  const [culinaryPreferences, setCP] = useState([]);

  const handleStep = async () => {
    props.setData({
      ...props.data,
      culinaryPreferences: culinaryPreferences,
    });

    await firebase
      .auth()
      .createUserWithEmailAndPassword(props.data.email, props.data.password);

    await firebase.auth().currentUser.updateProfile({
      displayName: `${props.data.fname} ${props.data.lname}`,
    })

    await createUser(firebase.auth().currentUser.uid);

    props.setSteps(true);

    props.setProgress([{ value: 1 }, { value: 1 }, { value: 1 }]);
  };

  const handleBack = () => {
    props.setData({
      ...props.data,
      culinaryPreferences: "",
    });

    props.setSteps({
      current: 2,
      total: 3,
      name: "Enter your identity",
    });
    props.setProgress([
      { value: 1 },
      { value: 0, indeterminate: true },
      { value: 0 },
    ]);
  };

  const createUser = async (uid) => {
    let jsonUser = props.data;
    delete jsonUser.password;
    jsonUser.culinaryPreferences = JSON.stringify(props.data.culinaryPreferences);
    console.log(jsonUser);
    await firebase.firestore().collection("users").doc(uid).set(jsonUser);
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
          Register
        </Button>
      </View>
    </>
  );
};
