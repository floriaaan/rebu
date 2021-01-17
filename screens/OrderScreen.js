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

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { MAPS_APIKEY } from "../const";
import MapViewDirections from "react-native-maps-directions";

export default function OrderScreen(props) {
  const [id, setID] = React.useState(props.route.params.id);
  const [loading, setLoading] = React.useState(true);
  const [order, setOrder] = React.useState(null);

  const [delivery, setDelivery] = React.useState(null);
  const [isDelivery, setIsDelivery] = React.useState(null);

  const [isReceiptCollapsed, setReceiptCollapsed] = React.useState(true);
  const [isMapCollapsed, setMapCollapsed] = React.useState(false);

  const [location, setLocation] = React.useState(null);
  const [locationLoading, setLocationLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    setID(props.route.params.id);
    (async () => {
      const docOrder = await firebase
        .firestore()
        .collection("orders")
        .doc(props.route.params.id)
        .get();

      setOrder(
        {
          ...docOrder.data(),
          id: docOrder.id,
          content: JSON.parse(docOrder.data().content),
          progress: docOrder.data().progress
            ? JSON.parse(docOrder.data().progress)
            : null,
          steps: docOrder.data().steps
            ? JSON.parse(docOrder.data().steps)
            : null,
          provider: docOrder.data().provider
            ? JSON.parse(docOrder.data().provider)
            : null,
        } || null
      );

      const docDelivery = await firebase
        .firestore()
        .collection("deliveries")
        .doc(props.route.params.id)
        .get();

      if (docDelivery.exists) {
        setIsDelivery(true);
        setDelivery({
          ...docDelivery.data(),
          id: docDelivery.id,
          coords: {
            latitude: docDelivery.data().position.latitude,
            longitude: docDelivery.data().position.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
      } else {
        console.log("No delivery!");
        setIsDelivery(false);
      }

      // console.log("Data loading : done");
      setLoading(false);
    })();

    return () => {
      setID(null);
      setOrder(null);
      setDelivery(null);
    };
  }, [id]);

  React.useLayoutEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          ...location,
          coords: {
            ...location.coords,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
        setLocationLoading(false);

        // console.log("Location loading : done");
      } catch (err) {
        setErrorMsg(err);
        console.error("Location error : ", err);
        setLocation(null);
        setLocationLoading(true);
      }
    })();
  }, []);

  return (
    <ScreenTemplate
      title="Order"
      navigation={props.navigation}
      auth={props.route.params.auth}
      back
    >
      {!loading ? (
        <>
          {order.status === "done" ? (
            <Telltale
              line1={{
                text: "Thanks ",
                name: props.route.params.auth.displayName.split(" ")[0],
              }}
              line2={{ text: "enjoy your meal 💞" }}
            ></Telltale>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Telltale
                line1={{
                  text: "Just ",
                  name: "wait",
                }}
                line2={{ text: "it's on the road 😉" }}
                small
                style={{ marginTop: 50 }}
              ></Telltale>
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 30,
                  marginTop: -10,
                  marginLeft: 50,
                }}
              >
                <LottieView
                  source={require("../assets/lottie/order.json")}
                  autoPlay
                  resizeMode="contain"
                  style={{ height: 100, width: 133 }}
                ></LottieView>
              </View>
            </View>
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
            </>
          )}
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Button
              icon="email"
              mode="outlined"
              color="#162328"
              style={{ marginHorizontal: 2 }}
              onPress={() => console.log("mail receipt, order id:" + order.id)}
            >
              Mail
            </Button>
            <Button
              icon="ticket-outline"
              mode="outlined"
              color="#162328"
              style={{ marginHorizontal: 2 }}
              onPress={() => {
                setReceiptCollapsed(false);
                setMapCollapsed(true);
              }}
            >
              Receipt
            </Button>
            <Button
              icon="crosshairs-gps"
              mode="outlined"
              color="#3FC060"
              style={{ marginHorizontal: 2 }}
              onPress={() => {
                setReceiptCollapsed(true);
                setMapCollapsed(false);
              }}
            >
              Position
            </Button>
          </View>

          <Collapsible collapsed={isReceiptCollapsed}>
            <Receipt items={order.content || []}></Receipt>
          </Collapsible>
          <Collapsible collapsed={isMapCollapsed}>
            {!isDelivery ? (
              <View
                style={{
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>
                  It's seems that there's still no delivery man in charge of
                  your order yet
                </Text>
              </View>
            ) : (
              <>
                {!locationLoading && (
                  <MapView
                    initialRegion={
                      delivery.coords
                        ? {
                            latitude:
                              (delivery.coords.latitude +
                                location.coords.latitude) /
                              2,
                            longitude:
                              (delivery.coords.longitude +
                                location.coords.longitude) /
                              2,
                            latitudeDelta:
                              delivery.coords.latitude -
                                location.coords.latitude <
                              0
                                ? -(
                                    delivery.coords.latitude -
                                    location.coords.latitude
                                  ) + 0.1
                                : delivery.coords.latitude -
                                  location.coords.latitude +
                                  0.1,
                            longitudeDelta:
                              delivery.coords.longitude -
                                location.coords.longitude <
                              0
                                ? -(
                                    delivery.coords.longitude -
                                    location.coords.longitude
                                  ) + 0.1
                                : delivery.coords.longitude -
                                  location.coords.longitude +
                                  0.1,
                          }
                        : location.coords
                    }
                    showsCompass={false}
                    style={{ height: 500 }}
                  >
                    <Marker coordinate={location.coords}></Marker>
                    {delivery.coords && (
                      <Marker coordinate={delivery.coords}></Marker>
                    )}
                    {/* {location.coords && delivery.coords && (
                      <MapViewDirections
                        origin={delivery.coords}
                        destination={location.coords}
                        apikey={MAPS_APIKEY}
                      />
                    )} */}
                  </MapView>
                )}
              </>
            )}
          </Collapsible>
        </>
      ) : (
        <></>
      )}
    </ScreenTemplate>
  );
}
