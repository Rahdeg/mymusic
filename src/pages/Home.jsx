import React, { useEffect, useState } from "react";
import { Filterbottons, Header, SearchBar, Songcard } from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { filterLanguage } from "../utils/supportfunctions";
import { filters } from "../utils/supportfunctions";
import {HiRefresh} from 'react-icons/hi'
import { getAllSongs, nullArtistFilter, } from "../features/songs/songSlice";
import { getAllAlbums } from "../features/album/albumSlice";
import { getAllArtists } from "../features/artists/artistSlice";

const Home = () => {
 
  const { allArtists } = useSelector((store) => store.artists);
  const { allAlbums } = useSelector((store) => store.albums);
  const { allSongs,artistFilter,languageFilter,albumFilter } = useSelector((store) => store.songs);
  const [searchfield, setsearchfield] = useState('');
  const dispatch = useDispatch();

  const onSearch=(event)=>{
    setsearchfield(event.target.value);
    }

  // const songSearch=()=>{
  //   filterSongs= allSongs.filter(song =>{
  //     return song.artist.toLowerCase().includes('Davido'.toLowerCase());
  //   })
  // }

  useEffect(() => {
    dispatch(getAllSongs());
    dispatch(getAllAlbums());
    dispatch(getAllArtists());
    setsearchfield(artistFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistFilter])

 
// const refresh=()=>{
  
//    dispatch(nullArtistFilter());
// }
   
 

 const filterSongs= allSongs.filter(song =>{
    return song.name.toLowerCase().includes(searchfield.toLowerCase())|song.artist?.toLowerCase().includes(searchfield.toLowerCase());
  })

  return (
    <div className="relative w-full h-auto flex flex-col bg-white items-center">
      
      <Header />
   
     
      <main className=" mt-36 bg-primary flex items-center justify-center flex-col w-screen">
      <div className=" flex  justify-between flex-wrap items-center gap-5 mb-8  mt-11">
        <Filterbottons filterdata={allArtists} flag={"Artist"} />
        {filters && filters.map((filter)=>(
           <div className="flex flex-col" key={filter.id}  >
           <p>{filter.name}</p>
         </div>
        )
        )}
        <Filterbottons filterdata={allAlbums} flag={"Album"} />
        <Filterbottons filterdata={filterLanguage} flag={"Language"} />
        <HiRefresh onClick={()=>setsearchfield('')} className=" cursor-pointer"/>
      </div>
      <div className=" grid grid-cols-5 gap-14 items-center justify-evenly  mb-16 p-6">
     {
        filterSongs && filterSongs.map((song, idx) => (
          <Songcard key={song._id} data={song} index={idx} type="song" />
        ))
     }
    </div>

      </main>
      <div className=" absolute top-28 items-center justify-center w-2/4  rounded-lg shadow-md ">
          <SearchBar onSearch={onSearch}/>
      </div>
    </div>
  );
};

export default Home;
