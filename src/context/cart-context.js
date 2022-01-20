import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItems: (item) => {},
  deleteItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
