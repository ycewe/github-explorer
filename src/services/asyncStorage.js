import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
  delete: async (key = "") => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  },

  get: async (key = "") => {
    try {
      const data = await AsyncStorage.getItem(key);

      return data ? JSON.parse(data) : data;
    } catch (e) {
      console.error(e);
    }
  },

  getMulti: async (keyArray = []) => {
    try {
      const data = await AsyncStorage.multiGet(keyArray);

      // expected output: [ [key1, val1], [key2, val2] ]
      return (data ?? []).map((d) => JSON.parse(d[1]));
    } catch (e) {
      console.error(e);
    }
  },

  listKeys: async () => {
    let keys = [];

    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error(e);
    }

    return keys;
  },

  set: async (key = "", value = "") => {
    try {
      const serializedValue = JSON.stringify(value);

      await AsyncStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error(e);
    }
  },
};

export default Storage;
