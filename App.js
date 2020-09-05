import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import PreviewList from "./components/Restaurant/PreviewList";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  return (
    <PaperProvider
      settings={{
        icon: (props) => <AwesomeIcon {...props} />,
      }}
    >
      {!errorMsg && location ? (
        <View style={styles.container}>
          <MapView style={styles.map}>
            <Marker coordinate={location.coords}>
            </Marker>
            </MapView>
          <PreviewList></PreviewList>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>{errorMsg}</Text>
        </View>
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
