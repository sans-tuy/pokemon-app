import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const RenderItem = ({title}) => {
  return (
    <TouchableOpacity style={styles.listPoke}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    Axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then(val => setdata(val.data.results))
      .catch(e => console.log(e));
  }, []);

  const renderItem = ({item}) => <RenderItem title={item.name} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        // keyExtractor={item => item.name}
      />
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.button1}>
          <Text>Sebelumnya</Text>
        </TouchableOpacity>
        <Text>1</Text>
        <TouchableOpacity style={styles.button2}>
          <Text>Berikutnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  listPoke: {
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    marginRight: 8,
    borderRadius: 8,
    flex: 1 / 2,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  button1: {
    padding: 18,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  button2: {
    padding: 18,
    backgroundColor: 'lightblue',
    borderRadius: 8,
  },
});
