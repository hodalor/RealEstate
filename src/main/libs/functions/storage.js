const _saveToStorage = async ({ data, key }) => {
  const stringData = JSON.stringify(data);

  localStorage.setItem(key, stringData);

  return true;
};

const _retrieveFromStroage = async (key) => {
  const data = localStorage.getItem(key);

  const foundData = await JSON.parse(data);

  return foundData;
};

const _removeFromStorage = async (key) => {
  localStorage.removeItem(key);

  return true;
};

export { _saveToStorage, _retrieveFromStroage, _removeFromStorage };
