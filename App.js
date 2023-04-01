import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { Footer, Header } from './components/HeaderFooter.js';
import RegisterScreen from './screens/RegisterScreen.js';
import StoreScreen from './screens/Store.js';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Header />
        <Stack.Navigator>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="store" component={StoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Footer/>
      <StatusBar style="auto" />
    </View>
  );
}
