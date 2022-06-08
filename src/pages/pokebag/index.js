import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const longPress = () => {
  Alert.alert(
    'Warning',
    'are you sure want to delete ?',
    [
      {text: 'Yes', onPress: () => console.log('data has been deleted')},
      {text: 'No', onPress: () => console.log('cancel delete')},
    ],
    {
      cancelable: true,
      onDismiss: () =>
        console.log(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );
};

const RenderItem = ({title}) => {
  return (
    <Pressable onLongPress={longPress} style={styles.listPoke}>
      <Image
        source={require('../../assets/icon/pokeball.png')}
        style={styles.icon}
      />
      <Text>{title}</Text>
    </Pressable>
  );
};

const PokeBag = () => {
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
    </View>
  );
};

export default PokeBag;

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
