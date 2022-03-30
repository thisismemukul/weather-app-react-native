import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { colors } from '../utils';
const {PRIMARY_COLOR,SECONDARY_COLOR} = colors;
export default function Weatherinformation({ currentWeather }) {
    const { 
        main: { temp },
        weather:[details],
        name
     } = currentWeather;
     const { icon,main,description } = details;
     const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
    return (
        <View style={styles.weatherInfo}>
            <Text>Weather Info</Text>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri:iconUrl}}/>
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}
const styles= StyleSheet.create({
    weatherInfo:{
        alignItems:'center'
    },
    weatherDescription:{
        textTransform:'capitalize'
    },
    weatherIcon:{
        width:100,
        height:100
    },
    textPrimary:{
        color:PRIMARY_COLOR,
        fontSize:40
    },
    textSecondary:{
        color:SECONDARY_COLOR,
        fontSize:20,
        fontWeight:'500',
        marginTop:10
    },
})