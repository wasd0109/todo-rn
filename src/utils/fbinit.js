import firebase from "firebase";
import fbconfig from "./fbconfig";

firebase.initializeApp(fbconfig);

const db = firebase.firestore();

db.useEmulator("localhost", 8080);

export default db;
