import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyBOhYYKHwwJZbQyYrG1g4ttRvGFwtQaitY",
  authDomain: "quizbuzz-thepywizard.firebaseapp.com",
  projectId: "quizbuzz-thepywizard",
  storageBucket: "quizbuzz-thepywizard.appspot.com",
  messagingSenderId: "852936180798",
  appId: "1:852936180798:web:0d31af825ad23f39cdfd6f",
  measurementId: "G-5H147JE0WE"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Use getFirestore function to get the Firestore instance