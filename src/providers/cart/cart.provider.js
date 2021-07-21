import React,{useEffect,useState,createContext} from 'react';

import {addItemToCart,removeItemFromCart,filterItemFromCart, getCartItemsCount} from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems:[],
  addItems: ()=>{},
  removeItem: ()=>{},
  clearItems:()=>{},
  cartItemsCount:0,
  cartTotal:0
});

const CartProvider = ({children})=>{
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addItem = item => setCartItems(addItemToCart(cartItems,item));
  const removeItem = item => setCartItems(removeItemFromCart(cartItems,item));
  const clearItem = item => setCartItems(filterItemFromCart(cartItems,item))

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  const toggleHidden = () => setHidden(!hidden);
  return(
    <CartContext.Provider value={
      {
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItem,
        cartItemsCount
      }
    }
    >
    {children}
    </CartContext.Provider>
  )
}

export default CartProvider;