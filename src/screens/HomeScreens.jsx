import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import cartState from '../../mobx/cartState';
import {observer} from 'mobx-react-lite';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => cartState.addProductToCart(item)}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default observer(HomeScreen);

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
