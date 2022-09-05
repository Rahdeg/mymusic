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

export const changeUserRole= async (userId,role)=>{
    try {
        const res = await axios.put(`${baseUrl}api/users/updateRole/${userId}`,{role})
        return res.data;
    } catch (error) {
        return null;
    }
}

export const deleteUser= async (userId)=>{
    try {
        const res = await axios.delete(`${baseUrl}api/users/delete/${userId}`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveAlbums= async ()=>{
    try {
        const res = await axios.post(`${baseUrl}api/album/save`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveArtist= async ()=>{
    try {
        const res = await axios.post(`${baseUrl}api/album/save`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveSongs= async (data)=>{
    try {
        const res = axios.post(`${baseUrl}api/song/save`,{...data})
        return (await res).data.song;
    } catch (error) {
        return null;
    }
}