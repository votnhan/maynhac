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

    handleSubmitReport(data, callback) {
        const {songId, reasonId, description} = data;
        const headers= {'x-access-token': localStorage.getItem('x-access-token')};
        Service.post('report/report', {songId, reasonId, description}, {headers: headers}).then(
            res => {
                console.log(res.data);
                callback(res.data);
            }
        )
        .catch( err => {
            console.log(err);
        })

    }

        
}

export default (new ReportService());