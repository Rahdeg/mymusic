import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { deleteAlbum, deleteArtist, deleteSong } from "../api/index";
import { ref, deleteObject } from "firebase/storage";
import {
  negativeAlert,
  nullAlert,
  openPlayer,
  positiveAlert,
  setIndex,
} from "../features/users/userSlices";
import { storage } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../features/songs/songSlice";
import { getAllArtists } from "../features/artists/artistSlice";
import { getAllAlbums } from "../features/album/albumSlice";
import { AiFillPlayCircle } from "react-icons/ai";

const Songcard = ({ data, index, type,env }) => {
  const [isdelete, setisdelete] = useState(false);
  const { isAudioPlaying, audioIndex } = useSelector((store) => store.user);
  const dispat = useDispatch();

  

  const deleteCard = (data) => {
    if (type === "album") {
      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {});
      setisdelete(false);
      deleteAlbum(data._id).then((res) => {
        if (res.msg) {
          dispat(positiveAlert());
          setTimeout(() => {
            dispat(nullAlert());
          }, 4000);
          dispat(getAllAlbums());
        } else {
          dispat(negativeAlert());
          setTimeout(() => {
            dispat(nullAlert());
          }, 4000);
        }
      });
    }
    if (type === "artist") {
      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {});
      setisdelete(false);
      deleteArtist(data._id).then((res) => {
        if (res.msg) {
          dispat(positiveAlert());
          setTimeout(() => {
            dispat(nullAlert());
          }, 4000);
          dispat(getAllArtists());
        } else {
          dispat(negativeAlert());
          setTimeout(() => {
            dispat(nullAlert);
          }, 4000);
        }
      });
    }
    if (type === "song") {
      setisdelete(false);
      const deleteRefImg = ref(storage, data.imageUrl);
      const deleteRefAud = ref(storage, data.songUrl);
      deleteObject(deleteRefImg).then(() => {});
      deleteObject(deleteRefAud).then(() => {});
      deleteSong(data._id).then((res) => {
        if (res.msg) {
          dispat(positiveAlert());
          setTimeout(() => {
            dispat(nullAlert());
          }, 4000);
          dispat(getAllSongs());
        } else {
          dispat(negativeAlert());
          setTimeout(() => {
            dispat(nullAlert());
          }, 4000);
        }
      });
    }
  };

  const addToContext = () => {
    if (!isAudioPlaying) {
      dispat(openPlayer());
    }
    if (audioIndex !== index) {
      dispat(setIndex(index));
    }
  };

  return (
    <motion.div
      key={index}
      className="relative w-40 min-w-210 px-2 cursor-pointer py-4 hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageUrl}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className=" text-base text-headingColor my-2 font-semibold">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
        {data.artist && (
          <span className="block text-center text-sm text-gray-400 my-1">
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}...`
              : data.artist}
          </span>
        )}
        {data.twitter && (
          <span className="block text-center text-sm text-gray-400 my-1">
            {data.twitter.length > 10
              ? `${data.twitter.slice(0, 25)}...`
              : data.twitter}
          </span>
        )}
        {data.instagram && (
          <span className="block text-center text-sm text-gray-400 my-1 ">
            {data.instagram.length > 10
              ? `${data.instagram.slice(0, 25)}...`
              : data.instagram}
              
          </span>
        )}
       
      </p>
      {
        env === "home" && (
          <div className=" w-full absolute bottom-2 left-40 flex items-center justify-between px-4">
      <motion.i
        whileTap={{ scale: 0.75 }}
        className="text-base drop-shadow-md text-red-400 hover:text-red-600"
      >
         <AiFillPlayCircle onClick={type === "song" ? addToContext : undefined} className=" text-2xl font-bold drop-shadow-md text-green-400 hover:text-green-600"/>
      </motion.i>
    </div>
        )
      }
      {
         env==="dash" && (
          <div className=" w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
          <motion.i
            whileTap={{ scale: 0.75 }}
            className="text-base drop-shadow-md text-red-400 hover:text-red-600"
            onClick={() => setisdelete(true)}
          >
            <MdDelete />
          </motion.i>
        </div>
         )
      }
    {
      env==="dash" && type=== "song" && (  <div className=" w-full absolute bottom-2 left-40 flex items-center justify-between px-4">
      <motion.i
        whileTap={{ scale: 0.75 }}
        className="text-base drop-shadow-md text-red-400 hover:text-red-600"
      >
         <AiFillPlayCircle onClick={type === "song" ? addToContext : undefined} className=" text-2xl font-bold drop-shadow-md text-green-400 hover:text-green-600"/>
      </motion.i>
    </div>
    
    )
    }
      
      
      {isdelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className=" text-lg text-headingColor font-semibold text-center">
            Are you sure, do you want to Delete it?
          </p>
          <div className=" flex items-center gap-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase  rounded-full bg-red-400 hover:bg-red-600 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => deleteCard(data)}
            >
              Yes
            </motion.button>

            <motion.button
              className="px-2 py-1 text-sm uppercase rounded-full bg-green-400 hover:bg-green-600 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => setisdelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Songcard;
