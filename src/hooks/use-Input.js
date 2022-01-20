import { useReducer } from "react";

const defaultInputState = {
  value: ``,
  inputTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === `INPUT`) {
    return { value: action.value, inputTouched: state.inputTouched };
  }

  if (action.type === `BLUR`) {
    return { value: state.value, inputTouched: true };
  }

  if (action.type === `RESET`) {
    return { value: ``, inputTouched: false };
  }

  return defaultInputState;
};

const useInput = (validateInputValue) => {
  const [inputState, dispatchInputStateAction] = useReducer(
    inputStateReducer,
    defaultInputState
  );

  const inputValueIsValid = validateInputValue(inputState.value);
  const hasError = !inputValueIsValid && inputState.inputTouched;

  const inputValueChangeHandler = (event) => {
    dispatchInputStateAction({ type: `INPUT`, value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInputStateAction({ type: `BLUR` });
  };

  const reset = () => {
    dispatchInputStateAction({ type: `RESET` });
  };

  return {
    value: inputState.value,
    reset,
    hasError,
    isValid: inputValueIsValid,
    inputBlurHandler,
    inputValueChangeHandler,
  };
};

export default useInput;
