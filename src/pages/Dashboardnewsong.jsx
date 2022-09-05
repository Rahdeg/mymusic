import React, { useEffect, useState } from "react";
import Filterbottons from "./Filterbottons";
import { filterLanguage, filters } from "../utils/supportfunctions";
import {motion} from "framer-motion"
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveAlbums,
  saveArtist,
  saveSongs,
} from "../api/index";
import { useStateValue } from "../Context/stateProvider";
import { actionType } from "../Context/reducer";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Dashboardnewsong = () => {
  const [songname, setsongname] = useState("");
  const [isImageloading, setisImageloading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageprogress, setimageprogress] = useState(0);

  const [isAudioloading, setisAudioloading] = useState(false);
  const [songAudioCover, setSongAudioCover] = useState(null);
  const [audioprogress, setAudioprogress] = useState(0);


  const [{ allArtists, allAlbums,filterTerm,artistFilter,languageFilter,albumFilter }, dispatch] = useStateValue();
 

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALLARTIST,
          allArtists: data,
        });
      });
    }
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALLALBUMS,
          allAlbums: data,
        });
      });
    }
  }, []);

  const deleteFileObject = (url, isImage) => {
    const deleteRef = ref(storage, url);
    if (isImage) {
      setisImageloading(true);
      deleteObject(deleteRef).then(() => {
        setSongImageCover(null);
        setisImageloading(false);
      });
    }else{
      setisAudioloading(true);
      deleteObject(deleteRef).then(() => {
        setSongAudioCover(null);
        setisAudioloading(false);
      });
    }
    
   
  };
const saveSong = ()=>{
  if(!songImageCover || !songAudioCover){
    //alert
  } else {
    setisImageloading(true);
    setisAudioloading(true);

    const data= {
      name:songname,
      imageUrl:songImageCover,
      songUrl:songAudioCover,
      artist:artistFilter,
      language:languageFilter,
      album:albumFilter,
      category:filterTerm
    }
    saveSongs(data).then(res => {
      getAllSongs().then((song)=>{
        dispatch({
          type: actionType.SET_ALLSONGS,
          allSongs: song,
        });
      })
    })
    setsongname(null);
    setisAudioloading(false);
    setisImageloading(false); 
    setSongImageCover(null);
    setSongAudioCover(null);
    dispatch({
      type: actionType.SET_ARTISTFILTER,
      artistFilter: null,
    });
    dispatch({
      type: actionType.SET_LANGUAGEFILTER,
      languageFilter: null,
    });
    dispatch({
      type: actionType.SET_ALBUMFILTER,
      albumFilter: null,
    });
    dispatch({
      type: actionType.SET_FILTERTERM,
      filterTerm: null,
    });
  }
  
}

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md gap-4">
      <input
        type="text"
        placeholder="Type your song name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songname}
        onChange={(e) => setsongname(e.target.value)}
      />
      <div className="w-full flex  justify-between flex-wrap items-center gap-4 ">
        <Filterbottons filterdata={allArtists} flag={"Artist"} />
        <Filterbottons filterdata={allAlbums} flag={"Album"} />
        <Filterbottons filterdata={filterLanguage} flag={"Language"} />
        <Filterbottons filterdata={filters} flag={"Category"} />
      </div>
      <div className=" bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageloading && <Fileloader progress={imageprogress} />}
        {!isImageloading && (
          <i>
            {!songImageCover ? (
              <Fileupload
                updateState={setSongImageCover}
                setProgress={setimageprogress}
                isLoading={setisImageloading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md ">
                <img
                  src={songImageCover}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-600 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(songImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </i>
        )}
      </div>
            {/*audio*/}
      <div className=" bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
      {isAudioloading && <Fileloader progress={audioprogress} />}
      {!isAudioloading && (
        <i>
          {!songAudioCover ? (
            <Fileupload
              updateState={setSongAudioCover}
              setProgress={setAudioprogress}
              isLoading={setisAudioloading}
              isImage={false}
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md ">
              <audio
              src={songAudioCover}
                controls
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-600 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                onClick={() => deleteFileObject(songAudioCover, false)}
              >
                <MdDelete className="text-white" />
              </button>
            </div>
          )}
        </i>
      )}
    </div>
    <div className="flex items-center justify-center w-64 p-4">
            {isImageloading || isAudioloading ? (<DisabledButton/>):(
              <motion.button 
              whileTap={{scale:0.75}}
              className="px-6 py-2 rounded-md w-full text-white bg-red-600 hover:shadow-lg"
              onClick={saveSong}>
              Upload Song
              </motion.button>
            )}
    </div>
    </div>
  );
};

export const Fileupload = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `${isImage ? "images" : "audios"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          updateState(downloadUrl);
          isLoading(false);
        });
      }
    );
  };
  return (
    <label>
      <div className=" h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload {isImage ? "an Image" : "an Audio"}
          </p>
        </div>
      </div>
      <input
        onChange={uploadFile}
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
      />
    </label>
  );
};

export const Fileloader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className=" text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <i>{`${Math.round(progress)}%`}</i>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative">
        <div className=" absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
  );
};

export const DisabledButton = ()=>{
  return(
    <button disabled 
    type="button" 
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg role="status" 
    className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
</button>
  )
}

export default Dashboardnewsong;
