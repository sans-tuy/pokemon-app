import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
import * as navigation from '../../config/router/rootNavigation';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {saveUser} from '../../config/redux/reducer';

// KURANG DISPATCH DATA USER KEDALAM APLIKASI
// KETIKA BERHASIL LOGIN

const Login = () => {
  const dispacth = useDispatch();
  const onLoginRDB = values => {
    try {
      database()
        .ref('users/')
        .orderByChild('email')
        .equalTo(values.email)
        .once('value')
        .then(async snapshot => {
          if (snapshot.val() == null) {
            Alert.alert('Invalid Email Id');
            return false;
          }
          let userData = Object.values(snapshot.val())[0];
          if (userData?.password != values.password) {
            Alert.alert('Error', 'Invalid Password!');
            return false;
          }
          dispacth(saveUser(userData));
          navigation.navigate('Home');
        });
    } catch (error) {
      Alert.alert('Error', 'Not Found User');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            name: '',
          }}
          onSubmit={async values => {
            onLoginRDB(values);
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email format')
              .required('Required!!'),
            password: Yup.string()
              .min(8, 'Minimum 8 characters')
              .required('Required!!'),
          })}>
          {({handleChange, handleSubmit, values}) => (
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                value={values.email}
                style={styles.input}
                placeholder={'masukkan email'}
              />
              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                style={styles.input}
                secureTextEntry={true}
                placeholder={'masukkan password'}
              />
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Login</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textButton}>pindah register</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: '3%',
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: 'cover',
  },
  imageWrapper: {
    width: '100%',
    height: '35%',
    marginTop: '6%',
    marginBottom: '4%',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    elevation: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Login;
