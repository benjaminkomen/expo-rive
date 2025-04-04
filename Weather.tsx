import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Fit} from 'rive-react-native';
import {Asset, useAssets} from 'expo-asset';

import {RiveAnimation} from "./RiveAnimation";

export const Weather = () => {
  const riveRef = useRef(null);
  const [assets, error] = useAssets([require('./assets/rive/weather_app.riv')]);
  if (error) {
    console.error('Error loading assets', error);
  }

  if (!assets || !assets.length) {
    console.debug('No assets found');
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Text>Could not load Rive asset..</Text>
      </SafeAreaView>
    );
  } else {
    console.debug('Assets loaded successfully', assets);
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <RiveAnimation
        source={assets[0]}
        ref={riveRef}
        autoplay={true}
        artboardName="proto1"
        stateMachineName="State Machine 1"
        style={styles.riveStyles}
        fit={Fit.FitHeight}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  riveStyles: {
    flexGrow: 1,
    width: '100%',
    height: 750,
  },
});
