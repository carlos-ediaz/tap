import {
  collection,
  serverTimestamp,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fdb } from "../../../db";
import { saveMediaToStorage } from "./utils";
import uuid from "uuid-random";

const auth = getAuth(fdb);

export const createPost = (description, video) => async (dispatch) =>
  new Promise((resolve, reject) => {
    console.log("info:", description, "video:", video);
    console.log(`path: post/${auth.currentUser.uid}/${uuid()}`);

    saveMediaToStorage(video, `post/${auth.currentUser.uid}/${uuid()}`)
      .then(async (downloadURL) => {
        console.log("url is:", downloadURL);
        const db = getFirestore(fdb);
        const docRef = await addDoc(collection(db, "post"), {
          creator: auth.currentUser.uid,
          downloadURL,
          description,
          likes: 0,
          comments: 0,
          creation: serverTimestamp(),
        })
          .then(() => resolve())
          .catch((error) => reject(console.log("29", error)));
      })
      .catch((error) => {
        reject(console.log("31", error));
      });
  });
