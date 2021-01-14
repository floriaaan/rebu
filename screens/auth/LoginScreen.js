import React, { useState, useEffect } from "react";
import { View, Alert, Dimensions } from "react-native";
import {
  Divider,
  TextInput,
  Button,
  Snackbar,
  IconButton,
} from "react-native-paper";
import ScreenTemplate from "../../components/Layouts/ScreenTemplate";

import * as LocalAuthentication from "expo-local-authentication";
import firebase from "./../../utils/firebase";
import Telltale from "../../components/Layouts/Telltale";

let gProvider = new firebase.auth.GoogleAuthProvider();

export default function LoginScreen(props) {
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

  const [biometricsCompatible, setBC] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
        console.log(firebase.auth().currentUser)
      props.route.params._auth(user);
    } catch (err) {
      setLoginErr(err.message);
      setSnackVisible(true);
    }
  };

  const handleGoogleLogin = async () => {
    firebase
      .auth()
      .signInWithCredential(gProvider.credential(""))
      .then(function (result) {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    (async () => {
      const isBioCompatible = await checkDeviceForHardware();
      const hasBio = await checkForEnrolled();
      if (isBioCompatible && hasBio) {
        setBC(true);
      }
    })();
  }, []);

  const checkDeviceForHardware = async () => {
    return await LocalAuthentication.hasHardwareAsync();
  };
  const checkForEnrolled = async () => {
    return await LocalAuthentication.isEnrolledAsync();
  };

  const scanBiometrics = async () => {
    // let result = await LocalAuthentication.authenticateAsync({
    //   promptMessage: "Log into RebuEats 🔐",
    // });
    // if (result.success) {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        props.route.params._auth(firebase.auth().currentUser);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("😰", "Server can't keep up");
      });
    // } else {
    //   Alert.alert("😰", "Fingerprint does not works");
    // }
  };

  return (
    <ScreenTemplate
      title="Login"
      navigation={props.navigation}
      auth={props.route.params.auth}
    >
      <Telltale
        line1={{ text: "Glad to see you ", name: "again" }}
        line2={{ text: "Log on Rebu Eats" }}
      ></Telltale>
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
        <Button
          icon="account"
          color="#3FC060"
          mode="outlined"
          onPress={handleLogin}
          style={{ marginTop: 50 }}
        >
          Log In
        </Button>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          {biometricsCompatible && (
            <Button
              icon="fingerprint"
              mode="outlined"
              onPress={scanBiometrics}
              style={{ width: Dimensions.get("screen").width / 2 - 25 }}
              theme={{
                colors: { primary: "#212d22", underlineColor: "transparent" },
              }}
            >
              Anonymously
            </Button>
          )}
          <Button
            icon="plus"
            mode="outlined"
            onPress={() => props.navigation.navigate("Register")}
            style={{ width: Dimensions.get("screen").width / 2 - 25 }}
          >
            Sign up
          </Button>
        </View>

        <Divider style={{ marginVertical: 7 }} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <IconButton
            icon="google"
            color="#4285F4"
            onPress={handleGoogleLogin}
          ></IconButton>
          <IconButton
            icon="apple"
            color="#000000"
            onPress={() => console.log("apple")}
          ></IconButton>
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
