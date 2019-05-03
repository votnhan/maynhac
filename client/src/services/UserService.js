import Service from './Service';
import React from 'react';


class UserService extends React.Component {

    handleLogin(username, password, callback) {
        Service.post('login', {params: {query: {username, password}}})
            .then(res => {
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default (new UserService());