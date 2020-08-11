import React from 'react';
import { StyleSheet, View } from 'react-native';
import {AppLoading} from 'expo';
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import { JosefinSans_300Light, JosefinSans_400Regular, useFonts } from '@expo-google-fonts/josefin-sans';

import Main from './src/pages/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    JosefinSans_300Light,
    JosefinSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

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
