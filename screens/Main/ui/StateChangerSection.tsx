import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Person from "../../../assets/images/person.svg";
import Chart from "../../../assets/images/chart.svg";

import { TMode } from "./Screen";

interface Props {
  setMode: React.Dispatch<React.SetStateAction<TMode>>;
  mode: TMode;
}

const modes = [
  {
    icon: Person,
    mode: "person" as TMode,
  },
  {
    icon: Chart,
    mode: "chart" as TMode,
  },
];

export const StateChangerSection: React.FC<Props> = ({ mode, setMode }) => {
  return (
    <View style={[styles.flex, styles.header]}>
      {modes.map((item) => {
        return (
          <TouchableOpacity
            key={item.mode}
            onPress={() => setMode(item.mode)}
            style={[styles.icon, { opacity: mode === item.mode ? 1 : 0.5 }]}
          >
            <item.icon width={30} height={30} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 30,
    rowGap: 50,
  },
  icon: {
    marginHorizontal: 6, // Add horizontal spacing
  },
});
