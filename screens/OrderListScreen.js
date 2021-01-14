import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import ScreenTemplate from "../components/Layouts/ScreenTemplate";
import Order from "../components/Orders/Order";
import firebase from "../utils/firebase";

export default function OrderListScreen(props) {
  const [oInProgress, setOInProgress] = React.useState([]);
  const [oDone, setODone] = React.useState([]);

  const RenderList = ({ list }) => {
    return (
      <ScrollView
        style={{
          maxHeight: Dimensions.get("screen").height / 3,
          marginBottom: 50,
        }}
      >
        {list.map((el, key) => {
          // return <Text key={key}>{JSON.stringify(el)}</Text>;
          return (
            <Order
              data={el}
              large={el.status === "in_progress"}
              key={key}
            ></Order>
          );
        })}
      </ScrollView>
    );
  };

  const snapshotOrders = (type, set) => {
    firebase
      .firestore()
      .collection("orders")
      .where("uid", "==", props.route.params.auth.uid)
      .orderBy("date")
      .where("status", "==", type)
      .onSnapshot(function (querySnapshot) {
        let _tmpList = [];

        querySnapshot.forEach(function (doc) {
          _tmpList.push({
            ...doc.data(),
            id: doc.id,
            content: JSON.parse(doc.data().content),
            progress: doc.data().progress
              ? JSON.parse(doc.data().progress)
              : null,
            steps: doc.data().steps ? JSON.parse(doc.data().steps) : null,
            provider: doc.data().provider
              ? JSON.parse(doc.data().provider)
              : null,
          });
        });

        set(_tmpList);
      });
  };

  React.useEffect(() => {
    snapshotOrders("in_progress", setOInProgress);
    snapshotOrders("done", setODone);
  }, []);

  return (
    <ScreenTemplate
      title="Orders"
      navigation={props.navigation}
      auth={props.route.params.auth}
    >
      <View style={{ marginTop: 50 }}>
        <RenderList list={oInProgress}></RenderList>
        <RenderList list={oDone}></RenderList>
      </View>
    </ScreenTemplate>
  );
}
