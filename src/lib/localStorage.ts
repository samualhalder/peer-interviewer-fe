class LocalStorage {
  static get = (key: string): string | null => {
    return localStorage.getItem(key);
  };
  static set = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
}

export default LocalStorage;
