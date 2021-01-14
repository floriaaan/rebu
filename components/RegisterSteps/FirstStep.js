import React from "react";

import { TextInput, Button, HelperText } from "react-native-paper";

export default FirstStep = (props) => {
  const [email, setEmail] = React.useState(props.data.email || "");
  const [emailValid, setEV] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordConf, setPasswordConf] = React.useState("");

  const [formValid, setFormValid] = React.useState(
    emailValid && password !== "" && password === passwordConf
  );

  const handleEmail = (text) => {
    if (text !== "") {
      const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      emailformat.test(text) ? setEV(true) : setEV(false);
    } else {
      setEV(true);
    }
    setEmail(text);
    setFormValid(emailValid && password !== "" && password === passwordConf);

  };

  const handlePass = (text) => {
    setPassword(text);
    setFormValid(emailValid && password !== "" && password === passwordConf);

  };
  const handlePassConf = (text) => {
    setPasswordConf(text);
    setFormValid(emailValid && password !== "" && password === passwordConf);
  };

  const handleStep = () => {
    if (formValid || true) { // TODO : fix react render delay
      props.setData({ ...props.data, email: email, password: password });

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
    }
  };

  React.useEffect(() => {
    props.setData({ ...props.data, password: "" });

  }, []);

  return (
    <>
      <TextInput
        label="Email 👦"
        autoCompleteType="email"
        keyboardType="email-address"
        type="email"
        mode="outlined"
        value={email}
        // error={!emailValid}
        onChangeText={(text) => handleEmail(text)}
        theme={{
          colors: { primary: "#3FC060", underlineColor: "transparent" },
        }}
      ></TextInput>
      <HelperText type="error" visible={!emailValid}>
        Email address is invalid!
      </HelperText>
      <TextInput
        color="#3FC060"
        label="Password 🔐"
        mode="outlined"
        value={password}
        secureTextEntry
        onChangeText={(text) => handlePass(text)}
        style={{ marginTop: 10 }}
        theme={{
          colors: { primary: "#3FC060", underlineColor: "transparent" },
        }}
      ></TextInput>
      <TextInput
        color="#3FC060"
        label="Password confirmation"
        mode="outlined"
        value={passwordConf}
        secureTextEntry
        onChangeText={(text) => handlePassConf(text)}
        style={{ marginTop: 10 }}
        theme={{
          colors: { primary: "#3FC060", underlineColor: "transparent" },
        }}
      ></TextInput>
      <HelperText type="error" visible={passwordConf !== password}>
        Passwords do not match!
      </HelperText>
      <Button
        icon="arrow-right"
        color={formValid ? "#3FC060" : "#B00020"}
        mode="outlined"
        onPress={handleStep}
        style={{ marginTop: 50 }}
      >
        Next
      </Button>
    </>
  );
};
