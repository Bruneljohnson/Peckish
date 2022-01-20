import { useState, useEffect } from "react";
import classes from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-Input";

const CheckoutForm = (props) => {
  const {
    value: enteredFullName,
    hasError: enteredFullNameHasError,
    isValid: enteredFullNameIsValid,
    inputValueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: fullNameReset,
  } = useInput((value) => value.trim() !== `` && value.trim().includes(` `));
  const {
    value: enteredEmail,
    hasError: enteredEmailHasError,
    isValid: enteredEmailIsValid,
    inputValueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.trim().includes(`@`));
  const {
    value: enteredMobile,
    hasError: enteredMobileHasError,
    isValid: enteredMobileIsValid,
    inputValueChangeHandler: mobileChangeHandler,
    inputBlurHandler: mobileBlurHandler,
    reset: mobileReset,
  } = useInput((value) => value.trim().length === 11);
  const {
    value: enteredAddress,
    hasError: enteredAddressHasError,
    isValid: enteredAddressIsValid,
    inputValueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput((value) => value.trim() !== `` && value.trim().includes(` `));

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (
      enteredAddressIsValid &&
      enteredFullNameIsValid &&
      enteredMobileIsValid &&
      enteredEmailIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    enteredAddressIsValid,
    enteredFullNameIsValid,
    enteredMobileIsValid,
    enteredEmailIsValid,
  ]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    const userData = {
      fullName: enteredFullName,
      email: enteredEmail,
      mobile: enteredMobile,
      address: enteredAddress,
    };

    props.onUserData(userData);

    fullNameReset();
    emailReset();
    mobileReset();
    addressReset();
  };

  const nameClasses = enteredFullNameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const emailClasses = enteredEmailHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const addressClasses = enteredAddressHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const mobileClasses = enteredMobileHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={nameClasses}>
        <label htmlFor="fullName">Full Name</label>
        <input
          value={enteredFullName}
          type="text"
          id="fullName"
          onChange={fullNameChangeHandler}
          onBlur={fullNameBlurHandler}
          required
        />
        {enteredFullNameHasError && <p>Please enter your full name.</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor="emailAddress">E-mail Address</label>
        <input
          value={enteredEmail}
          type="email"
          id="emailAddress"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          required
        />
        {enteredEmailHasError && <p>Please enter your e-mail</p>}
      </div>
      <div className={mobileClasses}>
        <label htmlFor="telephone">Mobile Number</label>
        <input
          value={enteredMobile}
          type="number"
          id="telephone"
          onChange={mobileChangeHandler}
          onBlur={mobileBlurHandler}
        />
        {enteredMobileHasError && <p>Please enter your mobile number</p>}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input
          value={enteredAddress}
          type="address"
          id="address"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          required
        />
        {enteredAddressHasError && <p>Please enter your current address</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClick} className={classes[`button--alt`]}>
          Cancel
        </button>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};
export default CheckoutForm;
