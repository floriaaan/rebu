import React from "react";
import { View } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function Restaurant({ title, address, rating }) {
  return (
    <View style={{ width: 300, height: 180, marginRight: 10 }}>
      <Card
        style={{
          borderRadius: 20,
        }}
      >
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{
            height: 100,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />

        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{address}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}
