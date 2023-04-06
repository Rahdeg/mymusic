import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import {IoAdd,IoPause,IoPlay,IoTrash} from 'react-icons/io5'
import {AiOutlineClear} from "react-icons/ai";
import { useStateValue } from '../Context/stateProvider';
import { actionType } from '../Context/reducer';
import Songcard from './Songcard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAlbums } from '../features/album/albumSlice';

const DashboardAlbums = () => {
  const [albumfilter, setalbumfilter] = useState('');
  const [isfocus, setisfocus] = useState(false);
  const { allAlbums} = useSelector((store) => store.albums);
  const dispat = useDispatch();

  useEffect(() => {
    if (!allAlbums.length) {
      dispat(getAllAlbums());
    }
  }, [])

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
    <div className='w-full flex items-center justify-center gap-20'>
    <NavLink to={'/dashboard/newSong'} className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
    <IoAdd/>
    </NavLink>
    <input 
    className={`w-52 px-4 py-2 border ${isfocus? " border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-transparent outline-none duration-500 transition-all ease-in-out text-base text-textColor font-semibold`}
    type='text' placeholder='search here ...' value={albumfilter} 
    onChange={(e)=>setalbumfilter(e.target.value)}
    onBlur={()=>setisfocus(false)}
    onFocus={()=>setisfocus(true)}
    />
    <AiOutlineClear className=' text-3xl text-textColor cursor-pointer'/>
    </div>
{/*Main Container*/}
    <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
    {/*count*/}
    <div className='absolute top-4 left-4 '>
    <p className='text-xl font-bold'>
    <span className='text-sm font-semibold text-textColor'>Count : {""} </span>
    {allAlbums?.length}
    </p>
    </div>
    {/*Artist container*/}   
    <Albumcontainer data={allAlbums}/> 
    </div>
  </div>
  )
}
export const Albumcontainer=({data})=>{
  return(
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
         {data && data.map((album,idx)=>(
          <Songcard key={album._id} data={album} index={idx} type="album"/>
         ))}
    </div>
  )
}

export default DashboardAlbums