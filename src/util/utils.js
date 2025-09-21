export const addThousandSeparator = (num) => {
  if (num === null || num === undefined) {
    return "";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
