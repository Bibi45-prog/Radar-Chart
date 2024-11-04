import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HumanState } from "./HumanState";
import { ParamsSection } from "./ParamsSection";
import { StateChangerSection } from "./StateChangerSection";
import { ChartState } from "./ChartState";

export type TMode = "person" | "chart";

export const Main: React.FC = () => {
  const [mode, setMode] = React.useState<TMode>("person");

  const title = mode === "person" ? "Аватар" : "Баланс";

  const renderMode = () =>
    mode === "person" ? <HumanState /> : <ChartState />;

  return (
    <ScrollView>
      <LinearGradient
        colors={["#EDEDED", "#9A9FA8"]}
        style={{ minHeight: Dimensions.get("window").height }}
      >
        <StateChangerSection setMode={setMode} mode={mode} />
        <View>
          <Text style={styles.heading}>{title}</Text>
        </View>
        <View style={styles.divider}></View>
        {renderMode()}
        <ParamsSection />
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "#8B9497",
    textAlign: "center",
    fontSize: 40,
    marginTop: 10,
    fontWeight: "100",
  },
  divider: {
    backgroundColor: "#E5BF85",
    height: 2,
    width: 100,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
