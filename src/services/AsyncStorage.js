import AsyncStorage from '@react-native-async-storage/async-storage';

const globalAsyncStorage = {
  async getItem(key) {
    return AsyncStorage.getItem(key);
  },
  async setItem(key, value) {
    return AsyncStorage.setItem(key, value);
  },
  async removeItem(key) {
    return AsyncStorage.removeItem(key);
  },
  async clear() {
    return AsyncStorage.clear();
  },
};

export default globalAsyncStorage;
