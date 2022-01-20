import React from "react";
import classes from "./Header.module.css";
import peckishLogo from "../../Imgs/peckishLogo.png";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>
          <figure className={classes[`main-image`]}>
            <img src={peckishLogo} alt="Peckish knife and fork logo!" />
          </figure>
          <h1>PECKISH</h1>
        </div>
        <HeaderCartButton label="Your Cart" onShowCart={props.onShowCart} />
      </header>
    </React.Fragment>
  );
};
export default Header;
