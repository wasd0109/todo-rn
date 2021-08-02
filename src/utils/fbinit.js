import firebase from "firebase";
import fbconfig from "./fbconfig";
import * as Device from "expo-device";

firebase.initializeApp(fbconfig);

const db = firebase.firestore();

console.log();

if (__DEV__ && Device.osName === "Windows") {
  db.useEmulator("localhost", 8080);
}

export default db;
