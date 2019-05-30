import { Component } from "react";
import React from 'react';
import "semantic-ui-css/semantic.min.css";
import SongService from '../../services/SongService';

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
            this.setState({loadCode: true, imgSrc: res.data.avatar, reportId: this.props.data.reportId, songName: res.data.name + " - " + res.data.artist});
        })
    }


    render () {
        return (
            <div className="item">
                <div className="ui tiny image">
                    <img src={this.state.imgSrc}/>
                </div>
                <div className="middle aligned content">
                    <a className="header">{this.state.songName}</a>
                </div>
            </div>
        );
    }
}

export default ReportCard;