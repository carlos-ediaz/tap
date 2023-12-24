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
