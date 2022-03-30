import { View, Text, StyleSheet, Linking, Pressable, Share } from 'react-native'
import React, { useCallback } from 'react'
import { colors } from '../utils';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;
const OpenDeveloperButton = ({ children }) => {
    const handlePress = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openURL('https://www.thisismemukul.ml');
    }, []);

    return <Pressable style={styles.linkButton} title={children} onPress={handlePress} ><Text>Mukul Saini</Text></Pressable >;
};
const OpenShareButton = ({ children }) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                title:
                    'React Native | A framework for building native apps using React',
                message: 'Check Out a Simple Weather App using React-Native https://github.com/thisismemukul/weather-android-ios-app',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return <Pressable title={children} onPress={onShare} ><Text><AntDesign name="sharealt" size={24} color={colors.PRIMARY_COLOR} />
    </Text></Pressable >;
};
export default function WeatherDetails({ currentWeather, unitsSystem }) {
    const {
        main: { feels_like, humidity, pressure, },
        wind: { speed },
    } = currentWeather;
    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`;
    return (
        <>
            <View style={styles.weatherDetails}>
                <View style={styles.weatherDetailsRow}>
                    <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                        <View style={styles.weatherDetailsRow}>
                            <FontAwesome5 name="temperature-low" size={24} color={colors.PRIMARY_COLOR} />
                            <Text style={styles.weatherDetailsDiscription}>Feels Like:</Text>
                            <Text style={styles.textSecondary}>{feels_like}°</Text>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsBox}>
                        <View style={styles.weatherDetailsRow}>
                            <MaterialCommunityIcons name="water" size={24} color={colors.PRIMARY_COLOR} />
                            <Text style={styles.weatherDetailsDiscription}>Humidity:</Text>
                            <Text style={styles.textSecondary}>{humidity} %</Text>
                        </View>
                    </View>
                </View>
                <View style={{ ...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR }}>
                    <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                        <View style={styles.weatherDetailsRow}>
                            <MaterialCommunityIcons name="weather-windy" size={24} color={colors.PRIMARY_COLOR} />
                            <Text style={styles.weatherDetailsDiscription}>Wind Speed:</Text>
                            <Text style={styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsBox}>
                        <View style={styles.weatherDetailsRow}>
                            <MaterialCommunityIcons name="speedometer" size={24} color={colors.PRIMARY_COLOR} />
                            <Text style={styles.weatherDetailsDiscription}>Pressure:</Text>
                            <Text style={styles.textSecondary}>{pressure} hPa</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.weatherDetails}>
                <View style={styles.weatherDetailsRow}>
                    <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                        <View style={styles.weatherDetailsRow}>
                            <MaterialIcons name="developer-board" size={24} color={colors.PRIMARY_COLOR} />
                            <Text style={styles.weatherDetailsDiscription}>Developed By:</Text>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsBox}>
                        <View style={styles.weatherDetailsRow}>
                            <OpenDeveloperButton> Mukul Saini </OpenDeveloperButton>
                            <OpenShareButton> Share </OpenShareButton>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 30,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20,
    },
    weatherDetailsDiscription: {
        color: colors.PRIMARY_COLOR,
    },
    textSecondary: {
        color: colors.SECONDARY_COLOR,
        fontWeight: '700',
    },
    linkButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginHorizontal: 10,
        borderRadius: 2,
        elevation: 1.5,
        backgroundColor: colors.SECONDARY_COLOR,
    },
});