import { initializeApp } from "firebase/app";
import { Database, get as get, getDatabase, ref, type DatabaseReference } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAN2LMaWnYgr_vLO1-_3gKhKSCGjaiiUbo",
  authDomain: "spectrumgame-c8131.firebaseapp.com",
  projectId: "spectrumgame-c8131",
  storageBucket: "spectrumgame-c8131.appspot.com",
  messagingSenderId: "669865437548",
  appId: "1:669865437548:web:70074627afee9c66b0eb49",
  databaseURL: "https://spectrumgame-c8131-default-rtdb.europe-west1.firebasedatabase.app/"
};

export type NullableDatabaseReference = DatabaseReference | null;

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb:Database = getDatabase(firebaseApp);
export const firebaseRef = ref;
export const firebaseGet = get;
export const questionsRef:DatabaseReference  = firebaseRef(firebaseDb, 'questions');