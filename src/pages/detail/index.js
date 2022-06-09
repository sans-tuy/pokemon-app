import {
  Alert,
  Animated,
  Button,
  Easing,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';

const Detail = () => {
  const [uriImage, seturiImage] = useState();
  const [profile, setprofile] = useState([]);
  const [types, settypes] = useState([]);
  const [Ability, setAbility] = useState([]);
  const [Moves, setMoves] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalVisible1, setmodalVisible1] = useState(false);
  const url = useSelector(state => state.poke.urlPoke);
  const animasi = useState(new Animated.Value(0))[0];
  const user = useSelector(state => state.poke.dataUser);

  const catchPoke = () => {
    let probability = Math.floor(Math.random() * 10);
    if (probability >= 5) {
      setmodalVisible(!modalVisible);
    } else {
      setmodalVisible1(!modalVisible1);
      database()
        .ref(`pokebag/${user['name']}`)
        .push(profile)
        .then(() => console.log('data updated'));
    }
  };

  useEffect(async () => {
    await axios.get(url).then(res => {
      seturiImage(res.data.sprites['other']['home']['front_default']);
      setprofile(res.data);
      settypes(res.data.types);
      setAbility(res.data.abilities);
      setMoves(res.data.moves);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
        <LottieView
          source={require('../../assets/animations/35271-try-again.json')}
          autoPlay
          loop
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setmodalVisible1(!modalVisible1);
        }}>
        <LottieView
          source={require('../../assets/animations/86023-earn-rewards.json')}
          autoPlay
          loop
        />
      </Modal>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image source={{uri: uriImage}} style={{width: 300, height: 300}} />
          <Text style={styles.centerText1}>{profile.name}</Text>
          <Text style={styles.centerText2}>Profile</Text>
        </View>
        <View>
          <Text>Height: {profile.height}</Text>
          <Text>Weight: {profile.weight}</Text>
          {/* <Text>Species: {profile['species']['name']}</Text> */}
        </View>
        <View>
          <Text style={styles.strongText}>Type</Text>
          {types.map((item, index) => {
            return (
              <View key={index} style={styles.buble}>
                <Text>{item['type']['name']}</Text>
              </View>
            );
          })}
          <Text style={styles.strongText}>Ability</Text>
          {Ability.map((item, index) => {
            return (
              <View key={index} style={styles.buble}>
                <Text>{item['ability']['name']}</Text>
              </View>
            );
          })}
          <Text style={styles.strongText}>Moves</Text>
          {Moves.map((item, index) => {
            return (
              <View key={index} style={styles.buble}>
                <Text>{item['move']['name']}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.catch}>
          <Button title="Catch" color={'orange'} onPress={catchPoke} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  strongText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  centerText1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerText2: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 16,
  },
  catch: {
    marginTop: 10,
    marginBottom: 20,
  },
  buble: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 3,
  },
});
