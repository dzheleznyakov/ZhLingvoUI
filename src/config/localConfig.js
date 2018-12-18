const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const get = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};

const remove = (key) => {
  localStorage.removeItem(key);
};

export const config = { set, get, remove };

export const keys = {
  SELECTED_LANGUAGE: 'SELECTED_LANGUAGE',
};
