import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import MapHeader from "./components/Layouts/MapHeader";
import PreviewList from "./components/Restaurant/PreviewList";

import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        coords: {
          ...location.coords,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
      });
    })();

    const fetchRestaurants = async () => {
      const response = await fetch(
        "https://nominatim.openstreetmap.org/search?q=Rouen[amenity=restaurant][delivery=yes]&format=json&addressdetails=1&extratags=1&namedetails=1"
      );
      const body = await response.json();
      setRestaurants(body);
    };
    fetchRestaurants();
  }, []);

  return (
    <PaperProvider
      settings={{
        icon: (props) => <AwesomeIcon {...props} />,
      }}
    >
      {!errorMsg && location ? (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={location.coords}
            showsCompass={false}
            mapPadding={{ top: 60, bottom: 250, left: 0, right: 0 }}
          >
            <Marker coordinate={location.coords}></Marker>
            {restaurants.map((item, key) => {
              return (
                <Marker
                  coordinate={{
                    latitude: parseFloat(item.boundingbox[0]),
                    longitude: parseFloat(item.boundingbox[2]),
                  }}
                  key={key}
                >
                  <View
                    style={{ ...styles.marker,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{fontSize:15}}>🍔</Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
          <MapHeader></MapHeader>
          <PreviewList data={restaurants}></PreviewList>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>{errorMsg}</Text>
        </View>
      )}
      <StatusBar style="light"></StatusBar>
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
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#222222aa",
  },
});
