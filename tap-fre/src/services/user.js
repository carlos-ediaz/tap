import { saveMediaToStorage } from "./utils";
import { fdb } from "../../db";
import { getStorage } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth(fdb);
const db = getFirestore(fdb);

export const saveUserProfileImage = (image) =>
  new Promise((resolve, reject) => {
    console.log("...uploading picture");
    saveMediaToStorage(image, `profileImage/${auth.currentUser.uid}`).then(
      async (res) => {
        console.log("__res__", res);
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
    console.log("value to update", field);
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
