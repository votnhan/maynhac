import Service from './Service';
import React from 'react';


class ReportService extends React.Component {

    handleGetType(callback){
    
        Service.get('report/typeReport').then(
            res => {
                callback(res.data);
            }
        )
        .catch( err => {
            console.log(err);
        })

    }

    handleSubmitReport(data, callback, error) {
        const {songId, reasonId, description, username} = data;
        const headers= {'x-access-token': localStorage.getItem('x-access-token')};
        Service.post('report/report', {songId, reasonId, description, username}, {headers: headers}).then(
            res => {
                callback(res.data);
            }
        )
        .catch( err => {
            error(err);
        })

    }

        
}

export default (new ReportService());