/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import store from './src/config/redux/store';
import Routing from './src/config/router';
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME};

const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);

const styles = StyleSheet.create({});
