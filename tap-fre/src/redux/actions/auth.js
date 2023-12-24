import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { fdb } from "../../../db";
import { USER_STATE_CHANGE } from "../constants";
import { getPostsByUser } from "./post";

const auth = getAuth(fdb);

export const userAuthStateListener = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getCurrentUserInfo());
      dispatch(getPostsByUser(auth.currentUser.uid));
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserInfo = () => async (dispatch) => {
  const db = getFirestore(fdb);
  const userRef = collection(db, "user");
  const docRef = doc(userRef, auth.currentUser.uid);
  const res = await getDoc(docRef);
  if (res.exists) {
    return dispatch({
      type: USER_STATE_CHANGE,
      currentUser: res.data(),
      loaded: true,
    });
  } else {
    return dispatch({
      type: USER_STATE_CHANGE,
      currentUser: "no exists doc",
      loaded: true,
    });
  }
};
export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

export const register = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

/*
export const register = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log("Error__:", error);
        reject(error);
      });
  });

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://www.example.com",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};
*/
