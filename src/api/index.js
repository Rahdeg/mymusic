import axios from 'axios';

const baseUrl ='http://localhost:5000/'

export const validateUser= async (token)=>{
    try {
        const res = await axios.get(`${baseUrl}api/users/login`,{
            headers:{
                Authorization:'Bearer ' + token,
            }
        })
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllUsers= async ()=>{
    try {
        const res = await axios.get(`${baseUrl}api/users/get`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllAlbums= async ()=>{
    try {
        const res = await axios.get(`${baseUrl}api/album/get`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllArtist= async ()=>{
    try {
        const res = await axios.get(`${baseUrl}api/artist/get`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllSongs= async ()=>{
    try {
        const res = await axios.get(`${baseUrl}api/song/get`)
        return res.data;
    } catch (error) {
        return null;
    }
}