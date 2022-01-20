import React from "react";
import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <footer className={classes.footer}>
      <p>
        Copyright of
        <a
          className={classes.weblink}
          href="https://www.instagram.com/bruneljohnson/"
        >
          {` Brunel Johnson `}
        </a>
        2022.
      </p>
    </footer>
  );
};

export default Footer;
