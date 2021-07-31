export const sortData = (data) => {
  data.sort((a, b) => {
    return b.cases - a.cases;
  });

  return data;
};
