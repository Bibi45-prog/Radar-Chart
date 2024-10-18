import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

const COLORS = ['#507096', '#E4AC9F', '#BB7F87', '#905A72', '#603B5C', '#2E1E42', '#40456D'];

const App: React.FC = () => {
  const [isBefore, setIsBefore] = useState<boolean>(true);
  const [radarData, setRadarData] = useState<RadarData[]>([]);

  const staticDonutData: RadarData[] = [
    { subject: 'Spirituality', A: 50, fullMark: 150 },
    { subject: 'Money & Finance', A: 50, fullMark: 150 },
    { subject: 'Career & Growth', A: 50, fullMark: 150 },
    { subject: 'Health & Fitness', A: 50, fullMark: 150 },
    { subject: 'Fun & Recreation', A: 50, fullMark: 150 },
    { subject: 'Personal Development', A: 50, fullMark: 150 },
    { subject: 'Relationship', A: 50, fullMark: 150 },
  ];

  const generateRandomData = (): RadarData[] => {
    const subjects = ['Spirituality', 'Money & Finance', 'Career & Growth', 'Health & Fitness', 'Fun & Recreation', 'Personal Development', 'Relationship'];
    return subjects.map(subject => ({
      subject,
      A: Math.floor(Math.random() * 151),
      fullMark: 150
    }));
  };

  useEffect(() => {
    setRadarData(generateRandomData());
  }, []);

  const handleBeforePress = () => {
    setIsBefore(true);
    setRadarData(generateRandomData());
  };

  const handleAfterPress = () => {
    setIsBefore(false);
    setRadarData(generateRandomData());
  };

  return (
    <View style={styles.container}>
      {/* Banner Section */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/bg3.jpg')}
          style={styles.bannerImage}
        />
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.description}>There is some short description about this card...</Text>
      </View>

      {/* Container for the content below the banner */}
      <View style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleBeforePress}
            style={[styles.button, isBefore && styles.activeButton]}
          >
            <Text style={styles.buttonText}>Before</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAfterPress}
            style={[styles.button, !isBefore && styles.activeButton]}
          >
            <Text style={styles.buttonText}>After</Text>
          </TouchableOpacity>
        </View>

        {/* Donut Chart with Radar inside */}
        <View style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={staticDonutData} 
                dataKey="A"
                outerRadius="90%" 
                innerRadius="50%" 
                fill="#8884d8"
                stroke="transparent" 
                label={({ index }) => (
                  <Text style={styles.labelText}>{staticDonutData[index].subject}</Text>
                )}
              >
                {staticDonutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                <Radar 
                  name="Category" 
                  dataKey="A" 
                  stroke="#A77282" 
                  strokeWidth={3}
                  fill="none" 
                  dot={{ stroke: '#white', fill: 'white', r: 4 }} 
                />
              </RadarChart>
            </ResponsiveContainer>

            {/* Adding labels inside the donut chart */}
            {staticDonutData.map((entry, index) => (
              <Text
                key={index}
                style={[
                  styles.labelText,
                  {
                    position: 'absolute',
                    left: `${50 + (Math.cos((index * (360 / staticDonutData.length) * Math.PI) / 180) * 40)}%`, 
                    top: `${50 - (Math.sin((index * (360 / staticDonutData.length) * Math.PI) / 180) * 40)}%`, 
                    transform: [{ translateX: -50 }, { translateY: -50 }],
                    color: '#FFFFFF',
                  },
                ]}
              >
                {entry.subject}
              </Text>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2932',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 0,
    padding: 0,
  },
  banner: {
    width: '100%',
    alignItems: 'center',
    margin: 0,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 20,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: 60,
  },
  bannerImage: {
    width: '100%',
    height: 250,
    borderRadius: 0,
  },
  contentContainer: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    backgroundColor: '#2A2E3A',
    borderRadius: 20,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9, 
    shadowRadius: 13,  
  },
  chartContainer: {
    position: 'relative',
    width: '100%',
    height: 400,
  },
  radarChartContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#2A2E3A',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center', // Center text vertically
  },
  activeButton: {
    backgroundColor: '#E47F75',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#3E6E8E',
    padding: 10,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center', // Center text vertically
    marginTop: 10,
  },
  labelText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default App;
