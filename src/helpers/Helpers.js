export const SET_TIMEOUT = (sec) => {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request Failed! Please try again.`));
    }, sec * 1000);
  });
};
