import { View,StyleSheet } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons'; 
import { colors } from '../utils';

export default function ReloadIcon({load}) {
  return (
    <View style={styles.reloadIcon}>
      <EvilIcons onPress={load} name="refresh" size={28} color={colors.PRIMARY_COLOR} />
    </View>
  )
}
const styles = StyleSheet.create({
    reloadIcon:{
        position: 'absolute',
        top: 90,
        right: 60,
    }
})