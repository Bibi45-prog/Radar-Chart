import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from 'recharts';

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

  const toggleSwitch = () => {
    setIsBefore(previousState => {
      const newState = !previousState;
      setData(generateRandomData());
      return newState;
    });
  };

  return (
    <View style={styles.container}>
   
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/healthcare-banner.png')} 
          style={styles.bannerImage}
        />
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.description}>There is some short description about this card...</Text>
      </View>

     
      <View style={styles.switchContainer}>
        <Text>Before</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isBefore ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isBefore}
        />
        <Text>After</Text>
      </View>

 
      <RadarChart cx={180} cy={150} outerRadius={90} width={360} height={300} data={data}>
        <PolarGrid radialLines={false} />
        <PolarAngleAxis dataKey="subject" stroke="#fff" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} stroke="#fff" />

        
        <Radar 
          name="Category 1" 
          dataKey="A" 
          stroke="#FF5733"
          fill="#FF5733" 
          fillOpacity={0.6} 
        />
        <Radar 
          name="Category 2" 
          dataKey="A" 
          stroke="#33FF57" 
          fill="#33FF57" 
          fillOpacity={0.6} 
        />
        <Radar 
          name="Category 3" 
          dataKey="A" 
          stroke="#3357FF" 
          fill="#3357FF" 
          fillOpacity={0.6} 
        />
      </RadarChart>

      <Button title="Continue" buttonStyle={styles.continueButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  banner: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 250, 
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4B4D',
    position: 'absolute', 
    top: 20, 
  },
  description: {
    color: '#4A4B4D',
    textAlign: 'center',
    position: 'absolute', 
    top: 60, 
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  continueButton: {
    backgroundColor: '#3D8593',
    marginTop: 30,
  },
});

export default App;
