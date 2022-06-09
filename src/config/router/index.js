import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import Home from '../../pages/home';
import {navigationRef} from './rootNavigation';
import PokeBag from '../../pages/pokebag';
import Login from '../../pages/login';
import Register from '../../pages/register';
import {Button, Image} from 'react-native';
import Detail from '../../pages/detail';
import * as navigation from './rootNavigation';
import {useSelector} from 'react-redux';

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
  const image = useSelector(state => state.poke.dataUser);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'PokeDex',
            headerTintColor: 'orange',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('PokeBag')}
                title="PokeBag"
                color="orange"
              />
            ),
            headerLeft: () => (
              <Image
                source={{uri: image['avatar']}}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 20,
                  borderRadius: 15,
                }}
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
          options={{
            headerTintColor: 'orange',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Home')}
                title="Home"
                color="orange"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
