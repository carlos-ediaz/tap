import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { fdb } from "../../../db";
import { USER_STATE_CHANGE } from "../constants";

const auth = getAuth(fdb);

export const userAuthStateListener = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getCurrentUserInfo());
      console.log("dispatch action");
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
      console.log("dispatch action null");
    }
  });
};

export const getCurrentUserInfo = () => (dispatch) => {
  const db = getFirestore(fdb);
  console.log("id", auth.currentUser.uid);
  const user = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
    if (doc.exists) {
      console.log("dispatched");
      console.log(doc);
      return dispatch({
        type: USER_STATE_CHANGE,
        currentUser: doc.data(),
        loaded: true,
      });
    }
  });
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
