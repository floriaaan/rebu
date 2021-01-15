import React from "react";
import { Text } from "react-native";
import ScreenTemplate from "../components/Layouts/ScreenTemplate";
import Telltale from "../components/Layouts/Telltale";
import Receipt from "../components/Orders/Receipt";
import firebase from "../utils/firebase";

export default function OrderScreen(props) {
  const [id, setID] = React.useState(props.route.params.id);
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
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
    })();
  }, [id]);

  return (
    <ScreenTemplate
      title="Order"
      navigation={props.navigation}
      auth={props.route.params.auth}
      back
    >
      <Telltale
        line1={{
          text: "Thanks ",
          name: props.route.params.auth.displayName.split(" ")[0],
        }}
        line2={{ text: "enjoy your meal 💞" }}
      ></Telltale>
      <Receipt items={order.content || []}></Receipt>
      <Text>{JSON.stringify(order)}</Text>
    </ScreenTemplate>
  );
}
