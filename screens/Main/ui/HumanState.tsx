import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

export const HumanState = () => {
  return (
    <View
      style={{
        width: 300,
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 40,
      }}
    >
      <Image
        source="../assets/images/dummies/man.png"
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
        }}
      />
    </View>
  );
};
