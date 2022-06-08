import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as navigation from '../../config/router/rootNavigation';
import * as Yup from 'yup';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';
import {launchImageLibrary} from 'react-native-image-picker';

const Register = () => {
  const [response, setResponse] = useState(null);
  const [avatar, setavatar] = useState(null);
  const reference = storage();
  const chooseImage = React.useCallback(options => {
    launchImageLibrary(options, setResponse);
  }, []);
  const onRegisterRDB = async values => {
    if (
      values.name === '' ||
      values.password === '' ||
      values.email === '' ||
      values.bio === ''
    ) {
      Alert.alert('harap isi semua field');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: values.name,
      email: values.email,
      password: values.password,
      avatar:
        avatar === ''
          ? 'https://firebasestorage.googleapis.com/v0/b/pokemon-1809e.appspot.com/o/images?alt=media&token=3991fdfa-f75c-4dc6-860c-69226752277c'
          : avatar,
      bio: values.bio,
    };
    try {
      database()
        .ref('/users')
        .push()
        .set(data)
        .then(() => {
          Alert.alert('success, registrasi berhasil');
          navigation.navigate('Login');
        });
    } catch (error) {
      console.log('Error', error);
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
            bio: '',
          }}
          onSubmit={async values => {
            await onRegisterRDB(values);
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, 'Minimum 2 characters')
              .max(15, 'Maximum 15 characters')
              .required('Required!!'),
            bio: Yup.string()
              .min(1, 'Minimum 1 characters')
              .max(15, 'Maximum 15 characters')
              .required('Required!!'),
            email: Yup.string()
              .email('Invalid email format')
              .required('Required!!'),
            password: Yup.string()
              .min(8, 'Minimum 8 characters')
              .required('Required!!'),
          })}>
          {({handleChange, handleSubmit, values}) => (
            <>
              <TextInput
                onChangeText={handleChange('name')}
                value={values.name}
                style={styles.input}
                placeholder={'masukkan name'}
              />
              <TextInput
                onChangeText={handleChange('email')}
                value={values.email}
                style={styles.input}
                placeholder={'masukkan email'}
              />
              <TextInput
                onChangeText={handleChange('bio')}
                value={values.bio}
                style={styles.input}
                placeholder={'masukkan bio'}
              />
              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                style={styles.input}
                secureTextEntry={true}
                placeholder={'masukkan password'}
              />
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Register</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textButton}>pindah login</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  chooseImage('library', {
                    maxHeight: 200,
                    maxWidth: 200,
                    selectionLimit: 0,
                    mediaType: 'photo',
                    includeBase64: false,
                  })
                }>
                <Text style={styles.buttonText}>Choose Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (values.name === '') {
                    Alert.alert('isi field nama terlebih dahulu ');
                    return false;
                  }
                  // path to existing file on filesystem
                  const pathToFile = response['assets'][0]['uri'];
                  // uploads file
                  await reference
                    .ref(`/image/${values.name}`)
                    .putFile(pathToFile);
                  const url = await reference
                    .ref(`/image/${values.name}`)
                    .getDownloadURL();
                  console.log('url downloads', url);
                  setavatar(url);
                }}>
                <Text style={styles.buttonText}>Post image</Text>
              </TouchableOpacity>
            </>
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

export default Register;
