import Service from './Service';
import React from 'react';


class UserService extends React.Component {

    handleLogin(username, password, callback) {
        Service.post('user/login', {username: username, password: password})
            .then(res => {
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSignup(name, mail, username, password, callback) {
        Service.post('user/signup', {username: username, password: password, name: name, email: mail})
            .then(res => {
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleMe(username, callback) {
        Service.get('user/me', {username: username})
            .then(res => {
                callback(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default (new UserService());