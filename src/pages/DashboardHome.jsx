import React, { useEffect } from 'react'
import { useStateValue } from '../Context/stateProvider';
import { actionType } from '../Context/reducer';
import {  FaUsers } from 'react-icons/fa'
import {GiLoveSong,GiMusicalNotes} from 'react-icons/gi'
import {RiUserStarFill} from 'react-icons/ri'
import {DashboardCard} from '../cards/cards'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/users/userSlices';
import { getAllSongs } from '../features/songs/songSlice';
import { getAllArtists } from '../features/artists/artistSlice';
import { getAllAlbums } from '../features/album/albumSlice';


const DashboardHome = () => {
  const { allUsers} = useSelector((store) => store.user);
  const { allSongs} = useSelector((store) => store.songs);
  const { allArtists} = useSelector((store) => store.artists);
  const { allAlbums} = useSelector((store) => store.albums);
  

  const dispat = useDispatch();

  useEffect(() => {
    if (!allUsers.length) {
      dispat(getAllUsers());
    }

    if (!allArtists.length) {
      dispat(getAllArtists());
    }
    if (!allAlbums.length) {
      dispat(getAllAlbums());
    }
    if (!allSongs.length) {
      dispat(getAllSongs());
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