import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Divider,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import firebase from "../../utils/firebase";

export function DrawerContent(props) {
  const logOut = async () => {
    await firebase
      .auth()
      .signOut()
      .catch((err) => {
        console.warn(err);
      });
    props._auth({});
  };

  const [darkTheme, setDT] = React.useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                "https://avatars0.githubusercontent.com/u/10078837?s=460&u=3c5bb03510dda069aa9b69c2d345719a3f1a073a&v=4",
            }}
            size={100}
          />
          <Title style={styles.title}>Florian Leroux</Title>
          <Caption style={styles.caption}>@floriaaan</Caption>
          <Divider style={{ marginTop: 20, marginLeft: -20 }} />
          {/* <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View> */}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "space-between",
          }}
        >
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => props.navigation.navigate("Home")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => {}}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="ticket-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Orders"
              onPress={() => props.navigation.navigate("Receipt")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="tune" color={color} size={size} />
              )}
              label="Preferences"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="lock-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Log out"
              onPress={logOut}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <View style={styles.preference}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={darkTheme ? "weather-night" : "white-balance-sunny"}
                  style={{ marginRight: 30 }}
                  color="#777"
                  size={25}
                />
                <Text style={{ color: "#777" }}>Dark Theme</Text>
              </View>

              <Switch
                value={darkTheme}
                onValueChange={() => setDT(!darkTheme)}
              />
            </View>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <Switch value={false} />
            </View>
          </Drawer.Section>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
