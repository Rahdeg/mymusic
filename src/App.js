import './App.css';
import {Route,Routes, useNavigate} from 'react-router-dom'
import {Dashboard, Home, Login, MusicPlayer} from './pages'
import { useEffect, useState } from 'react';
import { app } from './config/firebase';
import { getAuth } from 'firebase/auth';
import {AnimatePresence,motion} from 'framer-motion'
import {useStateValue} from "./Context/stateProvider"
import { actionType } from './Context/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { userValidator } from './features/users/userSlices';


function App() {
  const [auth, setauth] = useState(false||window.localStorage.getItem('auth')==='true')
  const firebase= getAuth(app);
  const [{user},dispatch] = useStateValue();
  const { isAudioPlaying } = useSelector((store) => store.user);
  const dispat = useDispatch(); 
  

const Navigate= useNavigate();
  useEffect(() => {
    firebase.onAuthStateChanged((userCred)=>{
      if (userCred) {
        userCred.getIdToken().then((token)=>{
         dispat(userValidator(token));
        })
      }else{
        setauth(false);
        window.localStorage.setItem('auth','false');
        dispatch({
          type: actionType.SET_USER,
          user:null
        })
        Navigate('/login');
      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <AnimatePresence exitBeforeEnter>
    <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
    
    <Routes>
      <Route path='/login' element={<Login setauth={setauth} />}/>
      <Route path='/*' element={<Home/>}/>
      <Route path='/dashboard/*' element={<Dashboard/>}/>
    </Routes>
      {isAudioPlaying && (
        <motion.div 
        initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
        >
        <MusicPlayer/>
        </motion.div>
      )}
    </div>
    </AnimatePresence>
  );
}

export default App;
