import React from 'react'
import Header from './Header'
import {IoHome} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import {isActiveStyles,isNotActiveStyles} from '../utils/styles'
import {Routes,Route} from "react-router-dom"
import {DashboardUser,DashboardAlbums,DashboardArtist,DashboardSongs,DashboardHome,Dashboardnewsong} from "../pages"

const Dashboard = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
    <Header/>
    <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
    <NavLink to={'/dashboard/home'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}><IoHome className='text-2xl text-textColor'/> </NavLink>
    <NavLink to={'/dashboard/users'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Users </NavLink>
    <NavLink to={'/dashboard/songs'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Songs </NavLink>
    <NavLink to={'/dashboard/artists'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Artists</NavLink>
    <NavLink to={'/dashboard/albums'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Albums </NavLink>
    </div>
    <div className='my-4 w-full p-4 '>
    <Routes>
    <Route path='/users' element={<DashboardUser/>}/>
    <Route path='/albums' element={<DashboardAlbums/>}/>
    <Route path='/artists' element={<DashboardArtist/>}/>
    <Route path='/songs' element={<DashboardSongs/>}/>
    <Route path='/home' element={<DashboardHome/>}/>
    <Route path='/newSong' element={<Dashboardnewsong/>}/>
    </Routes>
    </div>
    </div>
  )
}

export default Dashboard