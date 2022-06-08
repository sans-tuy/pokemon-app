import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Detail = () => {
  const [uriImage, seturiImage] = useState();
  const [profile, setprofile] = useState([]);
  const [types, settypes] = useState([]);
  useEffect(async () => {
    await axios.get('https://pokeapi.co/api/v2/pokemon/1/').then(res => {
      seturiImage(res.data.sprites['other']['home']['front_default']);
      setprofile(res.data);
      settypes(res.data.types);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: uriImage}} style={{width: 300, height: 300}} />
        <Text style={styles.centerText1}>{profile.name}</Text>
        <Text style={styles.centerText2}>Profile</Text>
      </View>
      <View>
        <Text>Height: {profile.height}</Text>
        <Text>Weight: {profile.weight}</Text>
        <Text>Species: {profile.species.name}</Text>
      </View>
      <View>
        <Text style={styles.strongText}>Type</Text>
        {types.map((item, index) => {
          return <Text key={index}>{item['type']['name']}</Text>;
        })}
        <Text style={styles.strongText}>Ability</Text>
        {types.map((item, index) => {
          return <Text key={index}>{item['type']['name']}</Text>;
        })}
        <Text style={styles.strongText}>Moves</Text>
        {types.map((item, index) => {
          return <Text key={index}>{item['type']['name']}</Text>;
        })}
      </View>
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
});
