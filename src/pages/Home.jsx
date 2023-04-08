import React, { useEffect } from "react";
import { Filterbottons, Header, Songcard } from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { filterLanguage } from "../utils/supportfunctions";
import { filters } from "../utils/supportfunctions";
import {HiRefresh} from 'react-icons/hi'
import { getAllSongs } from "../features/songs/songSlice";

const Home = () => {
 
  const { allArtists } = useSelector((store) => store.artists);
  const { allAlbums } = useSelector((store) => store.albums);
  const { allSongs } = useSelector((store) => store.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongs());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className="w-full h-auto flex flex-col bg-white items-center">
      <div className=" bg-primary w-full fixed ">
      <Header />
      </div>
     
      <main className=" mt-36 bg-primary flex items-center justify-center flex-col w-screen">
      <div className=" flex  justify-between flex-wrap items-center gap-5 mb-8  mt-11">
        <Filterbottons filterdata={allArtists} flag={"Artist"} />
        {filters && filters.map((filter)=>(
           <div className="flex flex-col" key={filter.id}>
           <p>{filter.name}</p>
         </div>
        )
        )}
        <Filterbottons filterdata={allAlbums} flag={"Album"} />
        <Filterbottons filterdata={filterLanguage} flag={"Language"} />
        <HiRefresh/>
      </div>
      <div className=" grid grid-cols-5 gap-14 items-center justify-evenly  mb-16 p-6">
      {allSongs &&
        allSongs.map((song, idx) => (
          <Songcard key={song._id} data={song} index={idx} type="song" />
        ))}
    </div>

      </main>
    </div>
  );
};

export default Home;
