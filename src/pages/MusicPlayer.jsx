import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAllSongs } from "../api";

import { IoClose, IoMusicalNote } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  closePlayer,
  openPlayer,
  zeroIndex,
  increaseIndex,
  decreaseIndex,
  setIndex,
} from "../features/users/userSlices";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const { allSongs } = useSelector((store) => store.songs);
  const { audioIndex } = useSelector((store) => store.user);
  const dispat = useDispatch();

  const closePlayers = () => {
    dispat(closePlayer());
  };

  const nextTrack = () => {
    if (audioIndex === allSongs.length-1 ) {
      dispat(zeroIndex());
    } else {
      dispat(increaseIndex());
    }
  };

  const previousTrack = () => {
    if (audioIndex === 0) {
      dispat(zeroIndex());
    } else {
      dispat(decreaseIndex());
    }
  };
  console.log(allSongs[audioIndex].songUrl);
  return (
    <div className="w-full flex items-center gap-3 px-3 ">
      <div className={`w-full flex items-center gap-3 p-4 relative`}>
        <img
          src={allSongs[audioIndex].imageUrl}
          alt="nn"
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
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className=" text-textColor hover:text-headingColor" />
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
        {isPlayList && <PlayListCard />}
        <IoClose onClick={closePlayers} />
      </div>
    </div>
  );
};

export const PlayListCard = () => {
  const { isAudioPlaying, audioIndex } = useSelector((store) => store.user);
  const { allSongs } = useSelector((store) => store.songs);
  const dispat = useDispatch();

  useEffect(() => {
    if (!allSongs.length) {
      dispat(getAllSongs());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrentSong = (index) => {
    if (!isAudioPlaying) {
      dispat(openPlayer());
    }
    if (audioIndex !== index) {
      dispat(setIndex(index));
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
            key={index}
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
