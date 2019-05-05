import Service from './Service'
import React from 'react'
import { Server } from 'https';

class PlaylistService extends React.Component {
    handleGetMyPlaylists(data,callback){
        const {token} = data;
        Service.get('playlist/Playlist', {headers: {'x-access-token': token}})
        .then( res =>{
            callback(res);
        })
        .catch( err =>{
            console.log(err);
        });
    }

    handleCreatePlaylist(data, callback){
        const {name, description, typeid, token} = data;
        Service.post('playlist/createPlaylist', {headers: {'x-access-token': token}, name, description, typeid})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    } 
    
    handRemovePlaylist(data, callback){
        const {playlistId, token} = data;
        Service.post('playlist/deletePlaylist', {headers: {'x-access-token': token}, playlistId})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleUpdatePlaylist(data, callback){
        const {name, description, type, idplaylist, token} = data;
        Service.post('playlist/updatePlaylist', {headers: {'x-access-token': token}, name, description, type, idplaylist})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }
}

export default (new PlaylistService());