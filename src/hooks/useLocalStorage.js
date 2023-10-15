export const useLocalStorage = (key) => {
  const get = () => {
    return JSON.parse(localStorage.getItem(key));
  };
  const set = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const remove = () => {
    localStorage.removeItem(key);
  };

  return { get, set, remove };
};
