import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Barometer } from 'expo-sensors';

export default function App() {
    const [{ pressure, relativeAltitude }, setBarometerData] = useState({
        pressure: 0,
        relativeAltitude: 0,
    });

    useEffect(() => {
        const subscription = Barometer.addListener(({ pressure, relativeAltitude }) => {
            setBarometerData({ pressure, relativeAltitude });
        });

        return () => subscription.remove(); // Cleanup to avoid memory leaks
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.heading}>Barometer Readings:</Text>
            <Text>Pressure: {pressure.toFixed(2)} hPa</Text>
            <Text>Relative Altitude: {relativeAltitude ? relativeAltitude.toFixed(2) : 'N/A'} m</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
