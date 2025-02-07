import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function App() {
    const [{ x, y, z }, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {

        const subscription = Magnetometer.addListener(({ x, y, z }) => {
            setMagnetometerData({ x, y, z });
        });

        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.heading}>Magnetometer Readings:</Text>
            <Text>X: {x.toFixed(2)}</Text>
            <Text>Y: {y.toFixed(2)}</Text>
            <Text>Z: {z.toFixed(2)}</Text>
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
