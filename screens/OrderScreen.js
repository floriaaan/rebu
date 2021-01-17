import React from "react";
import { Text, View } from "react-native";
import ProcessBar from "../components/Layouts/ProcessBar";
import ScreenTemplate from "../components/Layouts/ScreenTemplate";
import Telltale from "../components/Layouts/Telltale";
import Receipt from "../components/Orders/Receipt";
import firebase from "../utils/firebase";

import LottieView from "lottie-react-native";
import Collapsible from "react-native-collapsible";
import { Button } from "react-native-paper";

export default function OrderScreen(props) {
  const [id, setID] = React.useState(props.route.params.id);
  const [loading, setLoading] = React.useState(true);
  const [order, setOrder] = React.useState({ status: "done" });

  const [isReceiptCollapsed, setReceiptCollapsed] = React.useState(!true);

  React.useEffect(() => {
    console.log("effect");
    setID(props.route.params.id);
    (async () => {
      const doc = await firebase
        .firestore()
        .collection("orders")
        .doc(props.route.params.id)
        .get();

      setOrder(
        {
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
        } || null
      );
      setLoading(false);
    })();

    return () => {
      console.log("unmount");

      setID(null);
      setOrder(null);
    };
  }, [id]);

  return (
    <ScreenTemplate
      title="Order"
      navigation={props.navigation}
      auth={props.route.params.auth}
      back
    >
      {!loading ? (
        <>
          {/* {order.status === "done" ? ( */}
          {false ? (
            <Telltale
              line1={{
                text: "Thanks ",
                name: props.route.params.auth.displayName.split(" ")[0],
              }}
              line2={{ text: "enjoy your meal 💞" }}
            ></Telltale>
          ) : (
            <Telltale
              line1={{
                text: "Just ",
                name: "wait",
              }}
              line2={{ text: "it's on the road 😉" }}
              small
              style={{ marginTop: 50 }}
            ></Telltale>
          )}
          {order.progress && (
            <>
              <ProcessBar
                style={{ marginHorizontal: 30, marginBottom: 20 }}
                steps={
                  order.steps && typeof order.steps === "object"
                    ? order.steps
                    : true
                }
                progress={order.progress}
              ></ProcessBar>
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 30,
                  marginTop: -10,
                }}
              >
                <LottieView
                  source={require("../assets/lottie/order.json")}
                  autoPlay
                  resizeMode="contain"
                  style={{ height: 150, width: 200 }}
                ></LottieView>
              </View>
            </>
          )}
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Button
              icon="email"
              mode="outlined"
              color="#3FC060"
              style={{ marginHorizontal: 2 }}
              onPress={() => console.log("mail receipt, order id:" + order.id)}
            >
              Mail
            </Button>
            <Button
              icon="ticket-outline"
              mode="outlined"
              color="#3FC060"
              style={{ marginHorizontal: 2 }}
              onPress={() => setReceiptCollapsed(!isReceiptCollapsed)}
            >
              Receipt
            </Button>
          </View>
          <Collapsible collapsed={isReceiptCollapsed}>
            <Receipt items={order.content || []}></Receipt>
          </Collapsible>
          <Text style={{ marginTop: 300 }}>{JSON.stringify(order)}</Text>
        </>
      ) : (
        <></>
      )}
    </ScreenTemplate>
  );
}
