import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { LinearGradient } from "expo-linear-gradient";

interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

const COLORS = [
  "#507096",
  "#E4AC9F",
  "#BB7F87",
  "#905A72",
  "#603B5C",
  "#2E1E42",
  "#40456D",
];

const staticDonutData: RadarData[] = [
  { subject: "Spirituality", A: 50, fullMark: 150 },
  { subject: "Money & Finance", A: 50, fullMark: 150 },
  { subject: "Career & Growth", A: 50, fullMark: 150 },
  { subject: "Health & Fitness", A: 50, fullMark: 150 },
  { subject: "Fun & Recreation", A: 50, fullMark: 150 },
  { subject: "Personal Development", A: 50, fullMark: 150 },
  { subject: "Relationship", A: 50, fullMark: 150 },
];

export const ChartState: React.FC = () => {
  const [radarData, setRadarData] = useState<RadarData[]>([]);

  const generateRandomData = (): RadarData[] => {
    return staticDonutData.map((data) => ({
      ...data,
      A: Math.floor(Math.random() * 151),
    }));
  };

  useEffect(() => {
    setRadarData(generateRandomData());
  }, []);

  return (
    <View style={styles.container}>
      {/* Donut Chart with Radar inside */}
      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={staticDonutData}
              dataKey="A"
              outerRadius="100%"
              innerRadius="50%"
              fill="#8884d8"
              stroke="transparent"
              labelLine={false}
              label={({ index, midAngle, outerRadius, cx, cy }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius * 0.79;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                const label = staticDonutData[index].subject;
                const words = label.split(" & ");
                const line1 = words.length > 1 ? words[0] + " &" : words[0];
                const line2 = words.length > 1 ? words[1] : "";
                return (
                  <g>
                    <text
                      x={x}
                      y={y - 10}
                      fill="white"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10}
                      fontFamily="Arial"
                    >
                      {line1}
                    </text>
                    <text
                      x={x}
                      y={y + 10}
                      fill="white"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10}
                      fontFamily="Arial"
                    >
                      {line2}
                    </text>
                  </g>
                );
              }}
            >
              {staticDonutData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Radar Chart inside the donut */}
        <View style={styles.radarChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="40%" data={radarData}>
              <PolarGrid stroke="transparent" radialLines={false} />
              <PolarAngleAxis dataKey="subject" stroke="transparent" />
              <Radar
                name="Category"
                dataKey="A"
                stroke="#A77282"
                strokeWidth={3}
                fill="none"
                dot={{ stroke: "#white", fill: "white", r: 5 }}
                animationBegin={0}
                animationDuration={1300}
              />
            </RadarChart>
          </ResponsiveContainer>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1F2932",
    alignItems: "center",
    width: "85%",
    // height: "100%",
    elevation: 4,
    marginLeft: "auto",
    marginRight: "auto",
    transform: [
      {
        scale: 1,
      },
    ],
  },
  banner: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  box: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A6C78",
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 30,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  outlineIcon: {
    position: "absolute",
    marginLeft: -2,
    shadowColor: "#000",
  },
  mainIcon: {
    zIndex: 1,
  },

  number: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: 40,
  },
  description: {
    color: "white",
    textAlign: "center",
    position: "absolute",
    top: 80,
  },
  bannerImage: {
    width: "100%",
    height: 250,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    paddingRight: 10,
  },
  button: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    overflow: "hidden",
  },
  buttonLeft: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: -12,
    marginLeft: 12,
  },
  buttonRight: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: -12,
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 200,
  },
  sliderContainer: {
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  sliderValueContainer: {
    backgroundColor: "#AE8565",
    marginTop: 12,
    borderRadius: 5,
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 5,
    marginBottom: 8,
  },
  sliderValue: {
    color: "white",
    fontSize: 18,
    fontWeight: 400,
  },
  trackContainer: {
    width: "90%",
    height: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#313741",
  },
  gradient: {
    height: "100%",
  },
  slider: {
    width: "100%",
  },
  chartContainer: {
    width: "100%",
    height: 400,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  radarChartContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "350%",
    alignSelf: "center",
  },
});
