import React, { useEffect } from 'react'
import { useStateValue } from '../Context/stateProvider';
import {getAllUsers,getAllArtist,getAllAlbums,getAllSongs} from '../api/index'
import { actionType } from '../Context/reducer';
import {  FaUsers } from 'react-icons/fa'
import {GiLoveSong,GiMusicalNotes} from 'react-icons/gi'
import {RiUserStarFill} from 'react-icons/ri'
import {DashboardCard} from '../cards/cards'


const DashboardHome = () => {
  const [{allUsers,allArtists,allAlbums,allSongs},dispatch]=useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then(data=>{
        dispatch({
          type: actionType.SET_ALLUSERS,
          allUsers: data,
         })
       }) 
    }

    if (!allArtists) {
      getAllArtist().then(data=>{
        dispatch({
          type: actionType.SET_ALLARTIST,
          allArtists: data,
         })
       }) 
    }
    if (!allAlbums) {
      getAllAlbums().then(data=>{
        dispatch({
          type: actionType.SET_ALLALBUMS,
          allAlbums: data,
         })
       }) 
    }
    if (!allSongs) {
      getAllSongs().then(data=>{
        dispatch({
          type: actionType.SET_ALLSONGS,
          allSongs: data,
         })
       }) 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
    <DashboardCard icon={<FaUsers className=' text-xl text-textColor'/>} name="Users" count={allUsers?.length > 0 ?allUsers.length :0 }/>
    <DashboardCard icon={<GiLoveSong className=' text-xl text-textColor'/>} name="Songs" count={allSongs?.length > 0 ?allSongs.length :0 }/>
    <DashboardCard icon={<RiUserStarFill className=' text-xl text-textColor'/>} name="Artists" count={allArtists?.length > 0 ?allArtists.length :0 }/>
    <DashboardCard icon={<GiMusicalNotes className=' text-xl text-textColor'/>} name="Albums" count={allAlbums?.length > 0 ?allAlbums.length :0 }/>
    </div>
  )
}

export default DashboardHome