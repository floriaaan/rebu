import React, { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import ScreenTemplate from "../../components/Layouts/ScreenTemplate";

// import firebase from "../../utils/firebase";
import Telltale from "../../components/Layouts/Telltale";
import ProcessBar from "../../components/Layouts/ProcessBar";

import FirstStep from "../../components/RegisterSteps/FirstStep";
import SecondStep from "../../components/RegisterSteps/SecondStep";
import ThirdStep from "../../components/RegisterSteps/ThirdStep";

export default function RegisterScreen(props) {
  const [snackVisible, setSnackVisible] = useState(false);
  const [loginErr, setLoginErr] = useState("");

  const [progress, setProgress] = useState([
    { value: 0, indeterminate: true },
    { value: 0 },
    { value: 0 },
  ]);

  const [steps, setSteps] = useState({
    current: 1,
    total: 3,
    name: "Enter your credentials",
  });

  const [data, setData] = React.useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });

  return (
    <ScreenTemplate
      title="Register"
      navigation={props.navigation}
      auth={props.route.params.auth}
    >
      <Telltale
        line1={{ text: "Come join ", name: "us" }}
        line2={{ text: "welcome among us" }}
      ></Telltale>
      <ProcessBar
        style={{ marginHorizontal: 30, marginBottom: 20 }}
        steps={steps}
        progress={progress}
      ></ProcessBar>
      <View>
        {progress[0].value !== 1 && (
          <FirstStep
            setSteps={setSteps}
            setProgress={setProgress}
            data={data}
            setData={setData}
          ></FirstStep>
        )}
        {progress[0].value === 1 && progress[1].value !== 1 && (
          <SecondStep
            setSteps={setSteps}
            setProgress={setProgress}
            data={data}
            setData={setData}
          ></SecondStep>
        )}
        {progress[0].value === 1 && progress[1].value === 1 && progress[2].value !== 1 && (
          <ThirdStep
            setSteps={setSteps}
            setProgress={setProgress}
            data={data}
            setData={setData}
          ></ThirdStep>
        )}
      </View>
      <View style={{marginTop: 10}}>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        > */}
          <Button
            icon="account"
            mode="outlined"
            onPress={() => props.navigation.navigate("Login")}
            //style={{ width: Dimensions.get("screen").width / 2 - 25 }}
          >
            Log In
          </Button>
        {/* </View> */}
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => {
          setSnackVisible(false);
        }}
      >
        {loginErr}
      </Snackbar>
      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>
    </ScreenTemplate>
  );
}
