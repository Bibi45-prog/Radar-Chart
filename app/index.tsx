import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

const App: React.FC = () => {
  const [isBefore, setIsBefore] = useState<boolean>(true);
  const [data, setData] = useState<RadarData[]>([]);

  const generateRandomData = (): RadarData[] => {
    const subjects = ['Spirituality', 'Money & Finance', 'Career & Growth', 'Health & Fitness', 'Fun & Recreation', 'Personal Development', 'Relationship'];
    return subjects.map(subject => ({
      subject,
      A: Math.floor(Math.random() * 151),
      fullMark: 150
    }));
  };

  useEffect(() => {
    setData(generateRandomData());
  }, []);

  const handleBeforePress = () => {
    setIsBefore(true);
    setData(generateRandomData());
  };

  const handleAfterPress = () => {
    setIsBefore(false);
    setData(generateRandomData());
  };

  return (
    <View style={styles.container}>
      {/* Banner Section */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/bg2.jpg')} 
          style={styles.bannerImage}
        />
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.description}>There is some short description about this card...</Text>
      </View>

      {/* Before and After Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Before" onPress={handleBeforePress} color={isBefore ? "#81b0ff" : "#767577"} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="After" onPress={handleAfterPress} color={!isBefore ? "#81b0ff" : "#767577"} />
        </View>
      </View>

      {/* Radar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data}>
          <PolarGrid stroke="#ccc" radialLines={false} />
          <PolarAngleAxis dataKey="subject" stroke="#fff" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
          <Radar 
            name="Category" 
            dataKey="A" 
            stroke="#FF5733"  
            fillOpacity={0.6} 
            dot={{ stroke: '#fff', fill: '#fff', r: 4 }} 
          />
        </RadarChart>
      </ResponsiveContainer>

      <Button title="Continue" color="#3D8593"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
  },
  subjects:{
    fontFamily: 'Montserrat',

  },
  banner: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
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
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    
  },
  buttonWrapper: {
    marginHorizontal: 0,
    width: '100%',
    marginBottom: 40,
  },
});

export default App;