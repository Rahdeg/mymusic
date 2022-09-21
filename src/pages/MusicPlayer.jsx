import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/stateProvider";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { IoClose, IoMusicalNote } from "react-icons/io5";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ allSongs, isAudioPlaying, audioIndex }, dispatch] = useStateValue();

  const closePlayer =()=>{
    dispatch({
        type: actionType.SET_ISAUDIOPLAYING,
        isAudioPlaying: false,
      });
  }

  const nextTrack = ()=>{
  if (audioIndex > allSongs.length - 1) {
    dispatch({
        type: actionType.SET_AUDIOINDEX,
        audioIndex: 0, 
      });
  }else{
    dispatch({
        type: actionType.SET_AUDIOINDEX,
        audioIndex: audioIndex + 1,
      });
  }
  }

  const previousTrack = ()=>{
  if (audioIndex===0) {
    dispatch({
        type: actionType.SET_AUDIOINDEX,
        audioIndex: 0,
      });
  }else {
    dispatch({
        type: actionType.SET_AUDIOINDEX,
        audioIndex: audioIndex -1,
      });
  }
  }
  
  return (
    <div className="w-full flex items-center gap-3">
      <div className={`w-full flex items-center gap-3 p-4 relative`}>
        <img
          src={allSongs[audioIndex].imageUrl}
          alt=""
          className="w-40 h-20 object-cover rounded-md"
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allSongs[audioIndex].name.length > 20
                ? allSongs[audioIndex].name.slice(0, 20)
                : allSongs[audioIndex].name
            }`}{" "}
            <span className=" text-base">({allSongs[audioIndex].album})</span>
          </p>
          <p className=" text-textColor">
            {allSongs[audioIndex].artist}{" "}
            <span className="text-sm text-textColor font-semibold">
              ({allSongs[audioIndex].category})
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={()=>setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className=" text-textColor hover:text-headingColor" 
            
            />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[audioIndex].songUrl}
            onPlay={() => console.log("onPlay")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        {
            isPlayList && (
                <PlayListCard/>
            )
        }
        <IoClose onClick={closePlayer}/>
      </div>
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, isAudioPlaying, audioIndex }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALLSONGS,
          allSongs: data,
        });
      });
    }
  }, []);

  const setCurrentSong = (index) => {
    if (!isAudioPlaying) {
      dispatch({
        type: actionType.SET_ISAUDIOPLAYING,
        isAudioPlaying: true,
      });
    }
    if (audioIndex !== index) {
      dispatch({
        type: actionType.SET_AUDIOINDEX,
        audioIndex: index,
      });
    }
  };

  return (
    <div className="absolute left-4 bottom-24 gap-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary z-50">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            className=" group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setCurrentSong(index)}
          >
            <IoMusicalNote className=" text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
            <div className="flex items-start flex-col">
              <p className=" text-lg text-headingColor font-semibold">
                {`${
                  music.name.length > 20 ? music.name.slice(0, 20) : music.name
                }`}{" "}
                <span className="text-base">{music.album}</span>
              </p>
              <p className=" text-textColor">
                {music.artist}{" "}
                <span className="text-sm text-textColor font-semibold">
                  {music.category}
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
