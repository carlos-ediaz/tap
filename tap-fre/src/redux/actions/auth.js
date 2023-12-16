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
} from "firebase/auth";
import { fdb } from "../../../db";
import { USER_STATE_CHANGE } from "../constants";

const auth = getAuth(fdb);

export const userAuthStateListener = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getCurrentUserInfo());
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

  /*
  onSnapshot(doc(userRef, auth.currentUser.uid), (doc) => {
    if (doc.exists) {
      console.log(doc.data());
      return dispatch({
        type: USER_STATE_CHANGE,
        currentUser: doc.data(),
        loaded: truth,
      });
    }
  });*/
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
