import React, {Component} from 'react';
import cover from '../assets/imgs/playlist_cover.png';
import "../assets/css/UserPage.css";
import SongSearchItem from './SongSearchItem';
import SongService from '../services/SongService';

class PlaylistDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.location.state.data};
        console.log(this.state.data)
    }

    componentDidMount() {
        if (this.state.songsUpdate !== true) {
            this.loadSong();
        }
    }

    componentDidUpdate() {
        if (this.state.songsUpdate !== true) {
            this.loadSong();
        }
    }

    loadSong() {
        var code = [];
        for (var i = 0 ; i < this.state.data.songs.length; ++i) {
            SongService.handleGetSongbyId(this.state.data.songs[i], (res)=> {
                var {name, _id, avatar, link, artist} = res.data;
                code.push(<SongSearchItem name={name} _id={_id} avatar={avatar} artist={artist} link={link}/>);
                if (i >= this.state.data.songs.length - 1) {
                    this.setState({songsCode: code, songsUpdate: true});
                    return;
                }
            })
        }
        this.setState({songsCode: code, songsUpdate: true});
    }

    getSong() {
        if (this.state.songsUpdate !== true) {
            return <div>Wait a minute</div>
        }
        else {
            return this.state.songsCode;
        }
    }


    render() {
        return (
            <div className="container" style={{paddingBottom: "5%"}}>
                <div>
                    <div className="ui placeholder segment" style={{backgroundColor: "#004655"}}>
                        <img src={cover} style={{maxWidth: "25%", width: "25%"}}/>
                        <h3>{this.state.data.name}</h3>
                    </div>
                </div>

                <div className="ui segment">
                    <button className="ui primary button">
                    Play all
                    </button>
                </div>
                <div>
                    <div className="ui items">
                        {/* Items */}
                        {this.getSong()}
                    </div>
                </div>
                


            </div>
        );
    }
}

export default PlaylistDetailPage;