const isValidFile = (fileName, types) => {
  const fileType = fileName.split('.').pop();
  return types.includes(fileType);
};

const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
const validateEmail = (email) => {
  const re =
    /^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/;
  return re.test(String(email).toLowerCase());
};

export { isValidFile, isValidHttpUrl, validateEmail };
