import React from "react";
import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Feeling Peckish?</h2>
      <p className={classes.text}>Delicious Food, Delivered To You!</p>
      <p className={classes.para}>
        Order your favourite meal from our growing and diverse selection.
      </p>
      <p className={classes.para}>
        All our meals are cooked with high-quality ingredients by experienced
        chefs!
      </p>
    </section>
  );
};
export default MealsSummary;
