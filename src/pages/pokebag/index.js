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
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

const PokeBag = () => {
  const [data, setdata] = useState(null);
  const [key, setkey] = useState('');
  const user = useSelector(state => state.poke.dataUser);

  useEffect(() => {
    database()
      .ref(`pokebag/${user['name']}`)
      .once('value')
      .then(snapshot => {
        setdata(Object.values(snapshot.val()));
      });
  }, []);

  const renderItem = ({item}) => <RenderItem title={item.name} />;

  const RenderItem = ({title}) => {
    const shortPress = () => {
      database()
        .ref(`pokebag/${user['name']}`)
        .orderByChild('name')
        .equalTo(title)
        .once('value')
        .then(snapshot => setkey(Object.keys(snapshot.val())));
    };
    const longPress = () => {
      Alert.alert(
        'Warning',
        'are you sure want to delete ?',
        [
          {
            text: 'Yes',
            onPress: () => {
              database().ref(`pokebag/${user['name']}/${key[0]}`).remove();
            },
          },
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
    return (
      <Pressable
        onLongPress={longPress}
        onPress={shortPress}
        style={styles.listPoke}>
        <Image
          source={require('../../assets/icon/pokeball.png')}
          style={styles.icon}
        />
        <Text>{title}</Text>
      </Pressable>
    );
  };

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
