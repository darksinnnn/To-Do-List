import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnwPD-_qz-CrTVwVFPuiPHc15DQIemgto",
  authDomain: "todolist-38612.firebaseapp.com",
  projectId: "todolist-38612",
  storageBucket: "todolist-38612.firebasestorage.app",
  messagingSenderId: "819241324551",
  appId: "1:819241324551:web:7247a155b3c9fa4c7d1aa2",
  measurementId: "G-1X0D3TDHCY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };