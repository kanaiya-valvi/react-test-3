import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  APIKEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAJE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASURMENT_ID,
} from "../utils/requre";

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAJE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASURMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
// const analytics = getAnalytics(app);
