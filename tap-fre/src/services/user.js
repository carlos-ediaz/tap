import { saveMediaToStorage } from "./utils";
import { fdb } from "../../db";
import { getStorage } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth(fdb);
const db = getFirestore(fdb);

export const saveUserProfileImage = (image) =>
  new Promise((resolve, reject) => {
    console.log("...uploading picture");
    saveMediaToStorage(image, `profileImage/${auth.currentUser.uid}`).then(
      async (res) => {
        userRef = doc(db, "user", auth.currentUser.uid);
        await updateDoc(userRef, {
          photoURL: res,
        })
          .then(() => resolve())
          .catch(() => reject());
      }
    );
  });

export const saveUserField = (field, value) =>
  new Promise(async (resolve, reject) => {
    console.log("...saving changes");
    let obj = {};
    obj[field] = value;
    userRef = doc(db, "user", auth.currentUser.uid);
    if (field === "displayName") {
      await updateDoc(userRef, {
        displayName: value,
      })
        .then(() => resolve())
        .catch(() => reject());
    }
    if (field === "phoneNumber") {
      await updateDoc(userRef, {
        phoneNumber: value,
      })
        .then(() => resolve())
        .catch(() => reject());
    }
  });

export const getUserByEmail = (email) =>
  new Promise(async (resolve, reject) => {
    if (email === "") {
      resolve([]);
    }
    const userRef = collection(db, "user");
    const userInfo = query(
      userRef,
      where("email", ">=", email),
      where("email", "<=", email + "\uf8ff")
    );
    const res = await getDocs(userInfo)
      .then((res) => {
        let user = res.docs.map((doc) => {
          const data = doc.data();
          const id = post.id;
          return { id, ...data };
        });
        resolve(user);
      })
      .catch(() => reject());
  });

export const getUserById = (id) =>
  new Promise(async (resolve, reject) => {
    const userRef = doc(db, "user", id);
    const userInfo = await getDoc(userRef)
      .then((res) => {
        resolve(res.exists ? res.data() : null);
      })
      .catch(() => reject());
  });
