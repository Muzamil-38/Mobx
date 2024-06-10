import React, {useState, useEffect} from 'react';
import {StyleSheet, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import HomeScreen from './src/screens/HomeScreens';
import CartScreen from './src/screens/CartScreen';
import cartState from './mobx/cartState';
import {autorun} from 'mobx';

const Stack = createNativeStackNavigator();

const App = observer(() => {
  const [cartCount, setCartCount] = useState(cartState.cartItemsLength);

  useEffect(() => {
    const disposer = autorun(() => {
      setCartCount(cartState.cartItemsLength);
    });

    return () => {
      disposer();
    };
  }, []);

  const rightSide = (navigation) => (
    <Button
      title={`Cart Count: ${cartCount}`}
      onPress={() => navigation.navigate('CartScreen')}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({navigation}) => ({
              headerRight: () => rightSide(navigation),
            })}
          />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});