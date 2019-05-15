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
        Service.post('song/contributeLyrics', data)
        .then( res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleAddSongToPlaylist(data, callback){
        const {idsong, idplaylist} = data
        const token = localStorage.getItem('x-access-token');
        Service.post('song/addSongtoPlaylist', data, {headers: {'x-access-token': token}})
        .then( res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }
    
    handleRemoveSonginPlaylist(data, callback){
        const {idsong, idplaylist} = data
        const token = localStorage.getItem('x-access-token');
        Service.post('song/removeSonginPlaylist', data, {headers: {'x-access-token': token}})
        .then( res =>{
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleReaction(data, callback){
        const {songId} = data;
        const token = localStorage.getItem('x-access-token');
        Service.post('song/reaction', data, {headers: {'x-access-token': token}})
        .then( res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleCommentSong(data, callback){
        const {content, commentator, songId} = data;
        const token = localStorage.getItem('x-access-token');
        Service.post('song/comment', data, {headers: {'x-access-token': token}})
        .then( res=> {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleGetStatusOfSongForUser(data, callback){
        const {songId} = data;
        const token = localStorage.getItem('x-access-token');
        Service.get(`song/StatusOfSongsForUser/?songId=${songId}`, {headers: {'x-access-token': token}})
        .then( res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleGetSongsReacted(data, callback){
        const {token} = data ;
        Service.get('song/ReactionsOfUser', {headers: {'x-access-token': token}})
        .then(res => {
            callback(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleNoteHistory(data, callback){
        const token = localStorage.getItem('x-access-token');
        const {songid} = data;
        Service.get(`song/noteHistory/?songid=${songid}`, {headers: {'x-access-token': token}})
        .then(res => {
            callback(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }
}

export default (new SongService());