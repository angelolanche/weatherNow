import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { JosefinSans_300Light, JosefinSans_400Regular, JosefinSans_700Bold, useFonts } from '@expo-google-fonts/josefin-sans';

import Main from './src/pages/Main';

export default function App() {
  const [fonts] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_700Bold,
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
