import { getAuth } from "firebase/auth";
import { fdb } from "../../../db";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth(fdb);
const storage = getStorage();

export const saveMediaToStorage = (media, path) =>
  new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, path);
    //const fileRef = firebase.stogare().ref().child(path);

    const img = await fetch(media);
    const bytes = await img.blob();
    uploadBytes(storageRef, bytes)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then(() => getDownloadURL(ref(storage, path)))
      .then((downloadUrl) => resolve(downloadUrl))
      .catch(() => reject(console.log(error)));
  });
