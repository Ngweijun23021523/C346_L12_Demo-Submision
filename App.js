import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from "expo-sensors";
import { Audio } from "expo-av";

export default function App() {
    const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
    const [mySound, setMySound] = useState(null);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        let subscription;
        let sound;

        async function loadSound() {
            const { sound: loadedSound } = await Audio.Sound.createAsync(
                require('./canshake.wav')
            );
            setMySound(loadedSound);
            sound = loadedSound;
        }

        loadSound();

        subscription = Gyroscope.addListener(({ x, y, z }) => {
            setData({ x, y, z });

            if (Math.abs(x) > 2 || Math.abs(y) > 2 || Math.abs(z) > 2) {
                if (!isShaking) {
                    setIsShaking(true);
                    playSound(sound);
                }
            } else {
                setIsShaking(false);
            }
        });

        return () => {
            subscription?.remove();
            sound?.unloadAsync();
        };
    }, []);

    async function playSound(sound) {
        if (sound) {
            await sound.replayAsync();
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.heading}>Shake the phone</Text>
            <Text>X: {x}</Text>
            <Text>Y: {y}</Text>
            <Text>Z: {z}</Text>
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
