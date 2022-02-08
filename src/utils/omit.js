/* eslint-disable no-param-reassign */
const omitIsNil = (obj) => {
  if (typeof obj !== 'object' || !obj) return {};

  Object.keys(obj).forEach((key) => {
    if (!obj[key]) delete obj[key];
  });

  return obj;
};

export { omitIsNil };
