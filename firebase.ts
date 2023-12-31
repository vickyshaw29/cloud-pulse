import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Xsi6lzr2sBC2KEjwfA3ou1ZDT984iS0",
  authDomain: "cloud-pulse-1f2b1.firebaseapp.com",
  projectId: "cloud-pulse-1f2b1",
  storageBucket: "cloud-pulse-1f2b1.appspot.com",
  messagingSenderId: "1007503485230",
  appId: "1:1007503485230:web:497997c8758538e67db2bf"
};


const app = getApps()?.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }

