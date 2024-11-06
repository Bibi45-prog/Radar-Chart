import React from "react";
import { Dimensions, Image, View } from "react-native";

const Dot = (type: "light" | "red" = "light", top: number, left: number) => {
  const imageSources = {
    light: require("@/assets/icons/person/light.png"),
    red: require("@/assets/icons/person/red.png"),
  };
  return (
    <Image
      source={imageSources[type]}
      style={{
        width: 50,
        height: 50,
        resizeMode: "contain",
        position: "absolute",
        top: top,
        left: left,
      }}
    />
  );
};

export const HumanState = () => {
  return (
    <View
      style={{
        // flex: 1,
        marginTop: 40,
        // height: 450,
      }}
    >
      <View
        style={{
          width: 350,
          height: 550,
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
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
        {Dot("light", -10, 175)}
        {Dot("light", 110, 165)}
        {Dot("light", 180, 190)}
        {Dot("light", 280, 155)}
        {Dot("red", 220, 55)}
        {Dot("red", 125, 65)}
        {Dot("red", 160, 130)}
      </View>
    </View>
  );
};
