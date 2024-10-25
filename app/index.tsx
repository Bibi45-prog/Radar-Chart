import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
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
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";

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

const App: React.FC = () => {
  const [isBefore, setIsBefore] = useState<boolean>(true);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const generateRandomData = (): RadarData[] => {
    return staticDonutData.map((data) => ({
      ...data,
      A: Math.floor(Math.random() * 151),
    }));
  };

  useEffect(() => {
    setRadarData(generateRandomData());
  }, []);

  const handleTogglePress = (before: boolean) => {
    setIsBefore(before);
    setTimeout(() => {
      setRadarData(generateRandomData());
    }, 600);
    setSliderValue(before ? 50 : 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Icon name="heart" size={30} color="#3C8B98" />
        <Text style={styles.number}>2,250</Text>
      </View>

      <View style={styles.banner}>
        <Image
          source={require("../assets/images/bg3.jpg")}
          style={styles.bannerImage}
        />
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.description}>
          There is some short description about this card...
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* "Before" Button */}
        <TouchableOpacity
          onPress={() => handleTogglePress(true)}
          style={[styles.button, styles.buttonLeft]} // Apply left-rounded corners
        >
          <LinearGradient
            colors={isBefore ? ["#834270", "#FF9B77"] : ["#50566E", "#50566E"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Before</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* "After" Button */}
        <TouchableOpacity
          onPress={() => handleTogglePress(false)}
          style={[styles.button, styles.buttonRight]} // Apply right-rounded corners
        >
          <LinearGradient
            colors={!isBefore ? ["#834270", "#FF9B77"] : ["#50566E", "#50566E"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>After</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderValue}>{sliderValue}%</Text>
        <View style={styles.trackContainer}>
          <LinearGradient
            colors={["#661A68", "#C57246"]}
            style={[styles.gradient, { width: `${sliderValue}%` }]}
          />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={sliderValue}
            onValueChange={setSliderValue}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="#50566E"
            thumbTintColor="#ffffff"
          />
        </View>
      </View>

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
                const words = label.split(" & "); // Split the label by " & "
                const line1 = words.length > 1 ? words[0] + " &" : words[0]; // Add "&" only if there's more than one word
                const line2 = words.length > 1 ? words[1] : ""; // Second line (e.g., "Finance" or empty if not available)
                return (
                  <g>
                    <text
                      x={x}
                      y={y - 10} // Adjust y position for the first line
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
                      y={y + 10} // Adjust y position for the second line
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

      <TouchableOpacity>
        <LinearGradient
          colors={["#5cc9c2", "#508bbf"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.continueButton}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2932",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  banner: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  box: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A6C78",
    padding: 8,
    borderRadius: 60,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  number: {
    marginLeft: 10,
    fontSize: 20,
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
  contentContainer: {
    position: "absolute",
    top: 180,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#2A2E3A",
    borderRadius: 60,
    padding: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    flex: 1,
    borderRadius: 0,
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
  },

  sliderContainer: {
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
  },
  sliderValue: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  trackContainer: {
    width: "90%",
    height: 12,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#313741",
  },
  gradient: {
    height: "100%",
  },
  slider: {
    width: "100%",
    height: 40,
    marginLeft: 10,
    marginRight: 10,
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
    borderRadius: 20,
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "350px", // or use a specific pixel value like '300px'
    alignSelf: "center", // ensure the button stays centered with the new width
  },
});

export default App;

