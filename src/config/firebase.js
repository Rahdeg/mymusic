import {getApp,getApps,initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCmUeb4qdFX5PcPn4y24aix67bTw7vDhGg",
  authDomain: "music-12878.firebaseapp.com",
  projectId: "music-12878",
  storageBucket: "music-12878.appspot.com",
  messagingSenderId: "1050506703377",
  appId: "1:1050506703377:web:f9631178d70195ac89b7b0"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app,storage};