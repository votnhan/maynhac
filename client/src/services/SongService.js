import Service from './Service';
import React from 'react';


class SongService extends React.Component {

    handleSearch(key, callback) {
        Service.post('song/searchSong', {key})
            .then(res => {
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default (new SongService());