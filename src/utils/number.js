const formatCommasThousand = (number) =>
  Number(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const delimitNumber = (number) => {
  const delimiter = '.';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

export { formatCommasThousand, delimitNumber };
