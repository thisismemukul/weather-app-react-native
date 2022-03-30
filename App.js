import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Weatherinformation from './components/Weatherinformation';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { colors } from './utils';
// import { REACT_APP_WEATHER_API_KEY } from 'react-native-dotenv';
// import { WEATHER_API_KEY } from '@env';
// import envs from './config/env';
// import config from './config';
// console.log("mm",process.env)
// console.log("envs",envs)
// console.log("config",config)
 const WEATHER_API_KEY = `c7b7049fe72586093e1175b7c4a14d12`;
const BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`;
export default function App() {
  const [errorMessage, seterrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  // const [unitsSystem, setUnitsSystem] = useState('imperial');F 
  const [unitsSystem, setUnitsSystem] = useState('metric');
  useEffect(() => {
    load();
  }, [unitsSystem])
  async function load() {
    setCurrentWeather(null);
    seterrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        seterrorMessage('Access to location is needed to use this app');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      // const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        seterrorMessage(result.message);
      }
    } catch (error) {
      seterrorMessage(error.message);
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <Weatherinformation currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.SECONDARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
