import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../pages/home';
import {navigationRef} from './rootNavigation';
import PokeBag from '../../pages/pokebag';
import Login from '../../pages/login';
import Register from '../../pages/register';
import {Button, Image} from 'react-native';
import Detail from '../../pages/detail';
import * as navigation from './rootNavigation';

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
      <Stack.Navigator initialRouteName="PokeBag">
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
                source={require('../../assets/icon/pokeball.png')}
                style={{width: 30, height: 30, marginRight: 20}}
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
