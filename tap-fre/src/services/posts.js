import { collection, getFirestore, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fdb } from "../../db";

const auth = getAuth(fdb);

export const getFeed = () =>
  new Promise(async (resolve, reject) => {
    const db = getFirestore(fdb);
    const postRef = collection(db, "post");
    const res = await getDocs(postRef).then((res) => {
      let posts = res.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return { id, ...data };
      });
      resolve(posts);
    });
  });
