import {getApp,getApps,initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCdeICqmanulLlx3dFyDFdc1-yG56Ad62o",
  authDomain: "projectmusic-9a1ab.firebaseapp.com",
  projectId: "projectmusic-9a1ab",
  storageBucket: "projectmusic-9a1ab.appspot.com",
  messagingSenderId: "784319076282",
  appId: "1:784319076282:web:88a1466608532d7e53ef83"
  };


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app,storage};