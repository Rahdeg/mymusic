import React, { useState } from 'react'
import {Logo} from '../assets/img'
import { NavLink, useNavigate} from 'react-router-dom'
import {isActiveStyles,isNotActiveStyles} from '../utils/styles'
import { FaCrown } from 'react-icons/fa'
import {useStateValue} from "../Context/stateProvider"
import {motion} from "framer-motion"
import { app } from '../config/firebase'
import { getAuth } from 'firebase/auth'


const Header = () => {
    // const [isActive, setisActive] = useState(true)
    const [ismenu, setismenu] = useState(false)
    const [{user},dispatch]=useStateValue();
    const navigate = useNavigate();
    

    const logout=()=>{
      const firebaseauth=getAuth(app)
      firebaseauth.signOut().then(()=>{
          window.localStorage.setItem('auth','false');
      }).catch((e)=>{console.log(e)});
      navigate('/login',{replace:true});
  }

  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
    <NavLink to={'/'}>
    <img src={Logo} alt='uu' className='w-16'/>
    </NavLink>
    <ul className='flex items-center justify-center ml-7'>
    <li className='mx-5 text-lg'><NavLink to={'/home'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Home</NavLink></li>
    <li className='mx-5 text-lg'><NavLink to={'/music'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles} >Music</NavLink></li>
    <li className='mx-5 text-lg'><NavLink to={'/premium'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Premium</NavLink></li>
    <li className='mx-5 text-lg'><NavLink to={'/contact'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Contact Us</NavLink></li>
    </ul>
    <div className='flex items-center ml-auto cursor-pointer gap-2 relative' onMouseEnter={()=>setismenu(true)} onMouseLeave={()=>setismenu(false)}>
    <img src={user?.imageUrl} alt='' className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' referrerPolicy='no referrer' />
    <div className='flex flex-col'>
   <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.name}</p>
   <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member <FaCrown className='text-sm -ml-1 text-yelow-500'/> </p>
   </div>
   {ismenu && (
    <motion.div 
   initial={{opacity: 0, y:50}}
   animate={{opacity: 1, y:0}}
   exit={{opacity: 0, y:50}}
   className='absolute z-10 top-12  p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
   <NavLink to={'/profile'}>
   <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile </p>
   </NavLink>
   <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My Favorite </p>
   <NavLink to={'/dashboard/home'}>
   <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>{user?.role ==='admin'?"Dashboard":''}</p>
   </NavLink>
   <hr/>
   <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' onClick={logout}>SignOut </p>
   </motion.div>
   )}
    </div>
    </header>
  )
}

export default Header