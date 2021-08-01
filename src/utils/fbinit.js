import firebase from "firebase";
import fbconfig from "./fbconfig";

firebase.initializeApp(fbconfig);

const db = firebase.firestore();

export default db;
