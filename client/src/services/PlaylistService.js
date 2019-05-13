import Service from './Service'
import React from 'react'
import { Server } from 'https';

class PlaylistService extends React.Component {
    handleGetMyPlaylists(data, callback){
        const token = localStorage.getItem('x-access-token');
        Service.get('playlist/Playlist', {headers: {'x-access-token': token}})
        .then( res =>{
            callback(res.data);
        })
        .catch( err =>{
            console.log(err);
        });
    }

    handleCreatePlaylist(data, callback){
        const {name, description, typeid} = data;
        const token = localStorage.getItem('x-access-token');
        Service.post('playlist/createPlaylist', data, {headers: {'x-access-token': token}})
        .then( res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    } 
    
    handRemovePlaylist(data, callback){
        const {playlistId} = data;
        const token = localStorage.getItem('x-access-token');
        Service.post('playlist/deletePlaylist', data,{headers: {'x-access-token': token}})
        .then( res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleUpdatePlaylist(data, callback){
        const {name, description, type, idplaylist} = data;
        const token = localStorage.getItem('x-access-token');
        Service.post('playlist/updatePlaylist', data,{headers: {'x-access-token': token}})
        .then( res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }
}

export default (new PlaylistService());