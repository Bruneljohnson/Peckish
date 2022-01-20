import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealsItem.module.css";
import CartContext from "../../context/cart-context";

const MealsItem = (props) => {
  const price = new Intl.NumberFormat(navigator.language, {
    style: `currency`,
    currency: `GBP`,
  }).format(props.price.toFixed(2));

  const ctx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    ctx.addItems({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.desc}</p>
        <p className={classes.price}>{price}</p>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};
export default MealsItem;
