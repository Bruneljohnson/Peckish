import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealsItem from "./MealsItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const mealsDataGrabber = (data) => {
      const mealsData = Object.keys(data).map((key) => {
        return {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
      });

      setMeals(mealsData);
    };
    sendRequest(
      {
        url: `https://react-tester-9d1b5-default-rtdb.europe-west1.firebasedatabase.app/Meals.json`,
      },
      mealsDataGrabber
    );
  }, [sendRequest]);

  if (isLoading) {
    return (
      <section className={classes.mealsIsLoading}>
        <Card>
          <p>Loading Meals...</p>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsIsLoading}>
        <Card>
          <p>{error}</p>
        </Card>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal, i, arr) => {
            return (
              <MealsItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                desc={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
