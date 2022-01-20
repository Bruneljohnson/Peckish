import classes from "./Card.module.css";

const Card = (props) => {
  const classSet = `${classes.card} ${props.className}`;

  return <div className={classSet}>{props.children}</div>;
};
export default Card;
