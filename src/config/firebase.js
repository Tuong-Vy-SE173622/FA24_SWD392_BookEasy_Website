import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMaVrL-1GDeBGEGueD7wRTE5ss1KbUU4U",
  authDomain: "fa24-swd392-bookeasy.firebaseapp.com",
  projectId: "fa24-swd392-bookeasy",
  storageBucket: "fa24-swd392-bookeasy.firebasestorage.app",
  messagingSenderId: "91444819578",
  appId: "1:91444819578:web:1105f5018f8554f7fdadc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
