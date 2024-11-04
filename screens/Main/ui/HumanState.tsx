import React from "react";
import { Image, View } from "react-native";

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
        source={require("@/assets/images/dummies/man.png")}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
        }}
      />
    </View>
  );
};
