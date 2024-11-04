import React from "react";
import { Text } from "react-native";
import { View } from "react-native";

export const ParamsSection = () => {
  const PARAMS = [
    {
      name: "Гибкость",
      value: "2",
    },
    {
      name: "Сила",
      value: "12",
    },
    {
      name: "Знание",
      value: "2",
    },
    {
      name: "Дыхание",
      value: "2",
    },
  ];

  const SECOND_PARAMS = [
    {
      name: "Равновесие",
      value: "-20",
    },
    {
      name: "Духовность",
      value: "12",
    },
    {
      name: "Эмоции",
      value: "2",
    },
  ];

  return (
    <View
      style={{
        position: "absolute",
        width: "85%",
        bottom: 40,
        left: "50%",
        transform: [
          {
            translateX: "-50%",
          },
        ],
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        {PARAMS.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 13,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  width: 100,
                  fontSize: 14,

                  fontFamily: "axf-medium",
                }}
              >
                {item.name}
              </Text>
              <Text style={{ color: "#FEAA27", fontSize: 15 }}>
                {item.value}
              </Text>
            </View>
          );
        })}
      </View>
      <View>
        {SECOND_PARAMS.map((item, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    width: 140,
                    fontSize: 13,
                    fontFamily: "axf-medium",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: "#FEAA27",
                    fontSize: 15,
                    textAlign: "right",
                  }}
                >
                  {item.value}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  height: 1,
                  width: "100%",
                  marginBottom: 12,
                  opacity: 0.2,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
