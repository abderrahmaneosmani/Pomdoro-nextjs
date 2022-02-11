// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDevzrAJaf563oj1Yic_N_o9Ktd28o-zhc",
  authDomain: "e-commerce-8b99c.firebaseapp.com",
  projectId: "e-commerce-8b99c",
  storageBucket: "e-commerce-8b99c.appspot.com",
  messagingSenderId: "365269067699",
  appId: "1:365269067699:web:70ea6b61d5864108a7cdc6",
  measurementId: "G-ZZ1LLQZXLM",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const musicList = async () => {
  const url = await getDownloadURL(
    ref(storage, "music/5 Minute Lo-Fi Hiphop Beats Study Timer.mp3")
  );
  return url;
};
export const auth = getAuth(app);
