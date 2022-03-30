import { Text, View,StyleSheet,Platform } from 'react-native'
import React, { Component,useState } from 'react'
import {Picker} from '@react-native-picker/picker';

export default function UnitsPicker({unitsSystem,setUnitsSystem}) {

    return (
        <View style={styles.unitsSystem}>
          <Picker
        selectedValue={unitsSystem}
        onValueChange={(item) => setUnitsSystem(item)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
      </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
      marginVertical: 30,
      width: 100,
      padding: 10,
      borderWidth: 1,
      borderColor: "#666",
    },
    unitsSystem: {
      position: 'absolute',
      ...Platform.select({
        ios: {
          top: -40,
        },
        android: {
          top: 40,
        },
      }),
      left: 40,
      height: 40,
      width: 100,
    },
  });