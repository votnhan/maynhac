import Service from './Service';
import React from 'react';

class HomePageService extends React.Component {

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