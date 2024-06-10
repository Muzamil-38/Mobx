import React from 'react';
import {FlatList, View, Text, Image, StyleSheet} from 'react-native';
import cartState from '../../mobx/cartState';
import {observer} from 'mobx-react-lite';

const CartScreen = () => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartState.cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default observer(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});
