const checkValidNumber = (string) => {
  const numberRegex = new RegExp(/^\d+(\.\d)?\d*$/);
  return numberRegex.test(string);
};

export { checkValidNumber };
