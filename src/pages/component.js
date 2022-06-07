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
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME};

const App = () => {
  const leftValue = useState(new Animated.Value(0))[0];
  const moveBall = () => {
    Animated.timing(leftValue, {
      toValue: 600,
      duration: 4000,
      useNativeDriver: false,
      easing: Easing.back(),
    }).start();
  };
  const moveBallSpring = () => {
    Animated.spring(leftValue, {
      toValue: -600,
      useNativeDriver: false,
    }).start();
  };
  const rotateBall = () => {
    Animated.spring(leftValue, {
      transform: [{rotate: '45deg'}],
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          marginLeft: leftValue,
          transform: [
            {scale: this.state.scale},
            {rotateY: this.state.rotateY},
            {perspective: 1000},
          ],
        }}
      />
      <TouchableOpacity onPress={moveBall}>
        <Text>Move me</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={moveBallSpring}>
        <Text>Move me spring</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={rotateBall}>
        <Text>rotate me spring</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CodePush(codePushOptions)(App);

const styles = StyleSheet.create({});
