import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  projectId: "innate-outpost-flcf1",
  appId: "1:222211094340:web:e8a69ccd760b97ca968911",
  apiKey: "AIzaSyBdxdF1-ObsW506TUCkRaDmcnLFrDY_UyY",
  authDomain: "innate-outpost-flcf1.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-ebd2026asparbola-8130d550-5745-49bd-ad67-0e9ef5306944",
  storageBucket: "innate-outpost-flcf1.firebasestorage.app",
  messagingSenderId: "222211094340",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-ebd2026asparbola-8130d550-5745-49bd-ad67-0e9ef5306944");
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
