import React,{useState, useEffect} from 'react';
import {StatusBar, Button, StyleSheet, Text, View} from 'react-native';
import {Audio} from "expo-av";




export default function App() {
    const [mySound,setMySound] = useState();

    async function playSound(){
        const soundfile = require('./short1.wav');
        const {sound }= await Audio.Sound.createAsync(soundfile)
        setMySound(sound)
        await sound.playAsync()
    }

    useEffect(()=> {
        return mySound
        ?() => {
            console.log('Unloading Sound');
            mySound.unloadAsync();
            }
        : undefined;

    }, [mySound] )

  return (
    <View style={styles.container}>
      <StatusBar />
      <Button title="Play Sound" onPress={
      ()=>{
          playSound();

      }}
      />
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


