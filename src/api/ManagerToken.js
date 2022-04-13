import { AsyncStorageContstants } from "../constants/AsyncStorageContstants"
import AsyncStorage from "@react-native-community/async-storage"

export async function getTokenUser() {
  try {
    return await AsyncStorage.getItem(AsyncStorageContstants.AUTH_USER_TOKEN)
  } catch (e) {
    // saving error
    console.log("getTokenUser -> e", e)
  }
}

export async function getInfoUser() {
  try {
    return await AsyncStorage.getItem(AsyncStorageContstants.AUTH_USER_INFO)
  } catch (e) {
    // saving error
    console.log("getInfoUser -> e", e)
  }
}
