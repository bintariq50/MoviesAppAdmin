import { StatusBar, StyleSheet, View, Text } from 'react-native';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { NavigationContainer } from "@react-navigation/native"

import auth from '@react-native-firebase/auth'
import { useAuthStore } from './src/store/useAuthStore'

import BottomTabNavigatin from "./src/navigation/BottomTabNavigation"

import Login from "./src/screens/auth/Login"
import { useEffect } from 'react';

function RootNavigator() {
  const { user, setUser } = useAuthStore()

  useEffect(() => {
    const listenr = auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return listenr;
  }, [])

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigatin /> : <Login />}
    </NavigationContainer>
  )
}

function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <RootNavigator />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});

export default App;
