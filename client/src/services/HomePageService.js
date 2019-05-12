import Service from './Service';
import React from 'react';

class HomePageService extends React.Component {

    handleGetManySong(k, callback) {
        Service.get(`song/topksong/?k=${k}`)
            .then(res => {
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleGetKSongByTypeID(k, id, callback) {
        Service.get(`song/topkSongByTypeid/?typeid=${id}&&k=${k}`)
        .then(res => {
            callback(res.data);
        } )
        .catch(err => {
            console.log(err);
        });
    }

    handleGetNewKSongByTypeID(k, id, callback) {
        Service.get(`song/topNewkSongByTypeid/?typeid=${id}&&k=${k}`)
        .then(res => {
            console.log("type = "+ id + " k= "+k);
            callback(res.data);
        } )
        .catch(err => {
            console.log(err);
        });
    }

    handleGetImagesAutoPlay(callback) {
        Service.get('homepage/defaultPage')
            .then(res => {
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }


}

export default (new HomePageService());
