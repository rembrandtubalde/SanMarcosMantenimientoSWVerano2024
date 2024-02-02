export const getUrl = (name) => {
  const path = name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  return path;
};
