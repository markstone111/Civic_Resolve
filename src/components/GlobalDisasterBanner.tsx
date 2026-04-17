import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { useDisaster } from '../context/DisasterContext';

export default function GlobalDisasterBanner() {
  const { isDisasterMode } = useDisaster();

  if (!isDisasterMode) return null;

  return (
    <SafeAreaView style={styles.safeArea} pointerEvents="none">
      <View style={styles.banner}>
        <Text style={styles.text}>🚨 DISASTER MODE ACTIVE 🚨</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#b30000',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 9999,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  banner: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
    textAlign: 'center'
  }
});
