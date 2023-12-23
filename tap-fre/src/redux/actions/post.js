import {
  collection,
  serverTimestamp,
  getFirestore,
  addDoc,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fdb } from "../../../db";
import { saveMediaToStorage } from "./utils";
import uuid from "uuid-random";
import { CURRENT_USER_POSTS_UPDATE } from "../constants";

const auth = getAuth(fdb);

export const createPost = (description, file, type) => async (dispatch) =>
  new Promise((resolve, reject) => {
    saveMediaToStorage(file, `post/${auth.currentUser.uid}/${uuid()}`)
      .then(async (media) => {
        console.log("url is:", media);
        const db = getFirestore(fdb);
        const docRef = await addDoc(collection(db, "post"), {
          creator: auth.currentUser.uid,
          media,
          description,
          type,
          likes: 0,
          comments: 0,
          creation: serverTimestamp(),
        })
          .then(() => resolve())
          .catch((error) => reject(console.log(error)));
      })
      .catch((error) => {
        reject(console.log(error));
      });
  });
export const getPostsByUser =
  (uid = auth.currentUser.uid) =>
  async (dispatch) =>
    new Promise(async (resolve, reject) => {
      const db = getFirestore(fdb);
      const postRef = collection(db, "post");
      const postsList = query(
        postRef,
        where("creator", "==", uid),
        orderBy("creation", "desc")
      );
      const res = await getDocs(postsList);
      let posts = [];
      res.forEach((post) => {
        const data = post.data();
        const id = post.id;
        posts.push({ id, ...data });
      });

      dispatch({ type: CURRENT_USER_POSTS_UPDATE, currentUserPosts: posts });
    });
