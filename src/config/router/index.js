import React, {useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../pages/home';
import {navigationRef} from './rootNavigation';
import PokeBag from '../../pages/pokebag';
import Login from '../../pages/login';
import Register from '../../pages/register';
import {Button} from 'react-native';
import Detail from '../../pages/detail';

const HomeScreen = () => {
  return <Home />;
};
const DetailScreen = () => {
  return <Detail />;
};
const PokeBagScreen = () => {
  return <PokeBag />;
};
const RegisterScreen = () => {
  return <Register />;
};
const LoginScreen = () => {
  return <Login />;
};

const Stack = createNativeStackNavigator();

const Routing = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Detail">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'PokeDex',
            headerTintColor: 'orange',
            headerRight: () => (
              <Button
                onPress={() => alert('go to poke bag')}
                title="PokeBag"
                color="orange"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'Pokemon Details',
            headerTintColor: 'orange',
            headerRight: () => (
              <Button
                onPress={() => alert('catch pokemon')}
                title="Catch"
                color="orange"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PokeBag"
          component={PokeBagScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
