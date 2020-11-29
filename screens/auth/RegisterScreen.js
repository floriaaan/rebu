import React, { useState, useEffect } from "react";
import { View, Alert, Dimensions, Text } from "react-native";
import {
  Divider,
  TextInput,
  Button,
  Snackbar,
  IconButton,
  ProgressBar,
} from "react-native-paper";
import ScreenTemplate from "../../components/Layouts/ScreenTemplate";

import * as LocalAuthentication from "expo-local-authentication";
import firebase from "../../utils/firebase";
import Telltale from "../../components/Layouts/Telltale";
import ProcessBar from "../../components/Layouts/ProcessBar";

let gProvider = new firebase.auth.GoogleAuthProvider();

export default function RegisterScreen(props) {
  const [snackVisible, setSnackVisible] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEV] = useState(true);
  const [password, setPassword] = useState("");

  const handleEmail = (text) => {
    if (text !== "") {
      const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      emailformat.test(text) ? setEV(true) : setEV(false);
    } else {
      setEV(true);
    }
    setEmail(text);
  };

  const handlePass = (text) => {
    setPassword(text);
  };

  return (
    <ScreenTemplate
      title="Register"
      navigation={props.navigation}
      auth={props.route.params.auth}
    >
      <Telltale
        line1={{ text: "Come join ", name: "us" }}
        line2={{ text: "Welcome among us" }}
      ></Telltale>
      <ProcessBar
        style={{ marginHorizontal: 30, marginBottom: 20 }}
        steps={{ current: 1, total: 3, name: "Create your credentials" }}
        progress={[
          { value: 0, indeterminate: true },
          { value: 0 },
          { value: 0 },
        ]}
      ></ProcessBar>
      <View>
        <TextInput
          label="Email 👦"
          autoCompleteType="email"
          keyboardType="email-address"
          type="email"
          mode="outlined"
          error={!emailValid}
          onChangeText={(text) => handleEmail(text)}
          theme={{
            colors: { primary: "#3FC060", underlineColor: "transparent" },
          }}
        ></TextInput>
        <TextInput
          color="#3FC060"
          label="Password 🔐"
          mode="outlined"
          secureTextEntry
          onChangeText={(text) => handlePass(text)}
          style={{ marginTop: 10 }}
          theme={{
            colors: { primary: "#3FC060", underlineColor: "transparent" },
          }}
        ></TextInput>
        <TextInput
          color="#3FC060"
          label="Password confirmation 🔐"
          mode="outlined"
          secureTextEntry
          onChangeText={(text) => handlePass(text)}
          style={{ marginTop: 10 }}
          theme={{
            colors: { primary: "#3FC060", underlineColor: "transparent" },
          }}
        ></TextInput>
        <Button
          icon="arrow-right"
          color="#3FC060"
          mode="outlined"
          onPress={() => {}}
          style={{ marginTop: 50 }}
        >
          Next
        </Button>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Button
            icon="plus"
            mode="outlined"
            onPress={() => props.navigation.navigate("Login")}
            style={{ width: Dimensions.get("screen").width / 2 - 25 }}
          >
            Log In
          </Button>
        </View>
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => {
          setSnackVisible(false);
        }}
      >
        {loginErr}
      </Snackbar>
    </ScreenTemplate>
  );
}
