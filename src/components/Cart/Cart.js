import React, { useContext, useState } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [checkoutIsVisible, setCheckoutIsVisible] = useState(false);
  const [orderProcessed, setOrderProcessed] = useState(false);
  const { sendRequest } = useHttp();

  const ctx = useContext(CartContext);
  const totalAmount = new Intl.NumberFormat(navigator.language, {
    style: `currency`,
    currency: `GBP`,
  }).format(ctx.totalAmount.toFixed(2));

  const hasItems = ctx.items.length > 0;

  const addItemHandler = (item) => {
    ctx.addItems({ ...item, amount: 1 });
  };
  const deleteItemHandler = (id) => {
    ctx.deleteItem(id);
  };

  const showCheckoutHandler = () => {
    setCheckoutIsVisible(true);
  };

  const userDataHandler = (data) => {
    const order = {
      url: `https://react-tester-9d1b5-default-rtdb.europe-west1.firebasedatabase.app/orders.json`,
      method: `POST`,
      headers: {
        "content-Type": "application/json",
      },
      body: { user: data, orderItems: ctx.items },
    };

    const orderDataReturn = () => {
      setOrderProcessed(true);
      ctx.clearCart();
    };
    sendRequest(order, orderDataReturn);
  };

  return (
    <Modal onHideCart={props.onHideCart}>
      {orderProcessed && (
        <section className={classes.order}>
          <p>Thank You! Your order has been confirmed.</p>
          <button
            onClick={props.onHideCart}
            className={classes[`button-orderSuccess`]}
          >
            Close
          </button>
        </section>
      )}
      {!orderProcessed && (
        <ul className={classes[`cart-items`]}>
          {ctx.items.map((item) => {
            return (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onDelete={deleteItemHandler.bind(null, item.id)}
                onAdd={addItemHandler.bind(null, item)}
              />
            );
          })}
        </ul>
      )}
      {!orderProcessed && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      )}
      {checkoutIsVisible && !orderProcessed && (
        <CheckoutForm onClick={props.onHideCart} onUserData={userDataHandler} />
      )}
      <div className={checkoutIsVisible ? classes.hidden : classes.actions}>
        <button onClick={props.onHideCart} className={classes[`button--alt`]}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={showCheckoutHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
