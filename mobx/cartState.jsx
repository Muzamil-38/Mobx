import {makeAutoObservable} from 'mobx';

class CartState {
  cartItems = [];

  constructor() {
    makeAutoObservable(this);
  }

  addProductToCart(product) {
    this.cartItems.push(product);
  }

  removeProductFromCart(product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  get cartItemsLength() {
    return this.cartItems.length;
  }
}

const cartState = new CartState();

export default cartState;
