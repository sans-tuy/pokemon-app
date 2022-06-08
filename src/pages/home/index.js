import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const RenderItem = ({title}) => {
  return (
    <TouchableOpacity style={styles.listPoke}>
      <Image
        source={require('../../assets/icon/pokeball.png')}
        style={styles.icon}
      />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [data, setdata] = useState(null);
  const [limit, setlimit] = useState(20);
  const [offset, setoffset] = useState(0);

  const next = () => {
    if (offset <= 228) {
      setoffset(offset + limit);
      console.log('next');
      // setlimit(limit+=20)
    } else {
      setoffset(offset);
    }
  };
  const back = () => {
    if (offset >= 20) {
      setoffset(offset - limit);
      console.log('back');
      // setlimit(limit-=20)
    }
  };

  useEffect(() => {
    Axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
    )
      .then(val => setdata(val.data.results))
      .then(() => console.log(data))
      .catch(e => console.log(e));
  }, [offset]);

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
        <TouchableOpacity style={styles.button1} onPress={back}>
          <Text>Sebelumnya</Text>
        </TouchableOpacity>
        <Text>1</Text>
        <TouchableOpacity style={styles.button2} onPress={next}>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
