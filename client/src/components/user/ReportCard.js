import { Component } from "react";
import React from 'react';
import "semantic-ui-css/semantic.min.css";
import SongService from '../../services/SongService';
import ReportService from "../../services/ReportService";

class ReportCard extends Component {

    constructor(props) {
        super(props);
        this.state = {code: [], loadCode: false};
    }

    componentDidMount() {
        if (this.state.loadCode !== true) {
            this.loadCode();
        }
    }

    componentDidUpdate() {
        if (this.state.loadCode !== true) {
            this.loadCode();
        }
    }

    loadCode = () => {
        SongService.handleGetSongbyId(this.props.data.song, (res) => {
            var reportId = this.props.data.reportId;
            ReportService.handleGetReportById({reportId}, (res1) => {
                var reasonId = res1.reasonId;
                ReportService.handleGetTypeFromId({reasonId}, (res2) => {
                    this.setState({loadCode: true, 
                        imgSrc: res.data.avatar, 
                        reportId: this.props.data.reportId, 
                        songName: res.data.name + " - " + res.data.artist, 
                        reportState: res1.state,
                        reason: res2.name});   
                    
                })

            })

        })
    }


    render () {
        return (

            <div className="item">
                <div className="ui tiny image">
                    <img src={this.state.imgSrc}/>
                </div>
                <div className="content">
                <a className="header">{this.state.songName}</a>
                <div className="description">Reason: {this.state.reason}</div>
                <div className="description">State: {this.state.reportState ? "Processed" : "Waiting"}</div>
                </div>
            </div>
        );
    }
}

export default ReportCard;