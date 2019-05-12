import Service from './Service';
import React from 'react';


class SongService extends React.Component {

    handleUploadSong(song, callback){
        const headers= {'x-access-token': localStorage.getItem('x-access-token'), 'Content-Type': 'multipart/form-data'};
        Service.post('song/postSong', song, {headers: headers}).then(
            res => {
                console.log(res.data);
                callback(res.data);
            }
        )
        .catch( err => {
            console.log(err);
        })

    }
    handleSearch(key, callback) {
        Service.post('song/searchSong', {key})
            .then(res => {
                console.log(res.data);
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    handleGetTypeSong(callback){
        Service.get('song/typeSong')
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }
    handleGetSongsbyTypeid(typeid,callback){
        Service.get(`song/SongsbyTypeid/?typeid=${typeid}`)
        .then(res =>{
            callback(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
    handleGetSongbyId(Id, callback){
        Service.get(`song/SongbyId/?songId=${Id}`)
        .then( res => {
            callback(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleContributeLyrics(data, callback){
        const {songId, lyrics} = data
        Service.post('song/contributeLyrics', {songId, lyrics})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleAddSongToPlaylist(data, callback){
        const {idsong, idplaylist, token} = data
        Service.post('song/addSongtoPlaylist', {headers: {'x-access-token': token}, idsong, idplaylist})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }
    
    handleRemoveSonginPlaylist(data, callback){
        const {idsong, idplaylist, token} = data
        Service.post('song/removeSonginPlaylist', {headers: {'x-access-token': token} ,idsong, idplaylist})
        .then( res =>{
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleReaction(data, callback){
        const {songId} = data;
        const token = localStorage.getItem('x-access-token');
        Service.post('song/reaction', {songId}, {headers: {'x-access-token': token} })
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleCommentSong(data, callback){
        const {content, commentator, songId, token} = data;
        Service.post('song/comment', {headers: {'x-access-token': token} ,content, commentator, songId})
        .then( res=> {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }
}

export default (new SongService());