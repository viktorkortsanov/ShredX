import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFNMYuQQP4AngPo3raYAMg6kwlHYUyp4Y",
  authDomain: "shredx-4d3e7.firebaseapp.com",
  projectId: "shredx-4d3e7",
  storageBucket: "shredx-4d3e7.firebasestorage.app",
  messagingSenderId: "442879276324",
  appId: "1:442879276324:web:6071720b163a452b5d2fb1",
  measurementId: "G-1SDCJYEK0E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
