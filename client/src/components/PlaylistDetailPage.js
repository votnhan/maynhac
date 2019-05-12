import React, {Component} from 'react';
import cover from '../assets/imgs/playlist_cover.png';
import "../assets/css/UserPage.css";
import "../assets/css/PlaylistDetail.css";

class PlaylistDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.location.state.data};
        console.log(this.state.data)
    }

    createSongItem = (song) => {
        return (
            <div className="item">
                <i class="playlist play circle icon big "></i>
                <img className="ui avatar image" src="/images/avatar2/small/lindsay.png"/>
                <div className="content">
                Lindsay
                </div>
                <div className="right floated content">
                <i class="playlist plus square icon big "></i>
                <i class="playlist minus square icon big "></i>
                </div>
                
            </div>
        );
    }

    render() {
        var songs = [];
        for (var i = 0 ; i < this.state.data.songs.length; ++i) {
            songs.push(this.createSongItem(this.state.data.songs[i]));
        }
        return (
            <div className="container">
                <div>
                    <div className="playlist ui placeholder segment" >
                        <img src={cover} className="playlist"/>
                        <h3>{this.state.data.name}</h3>
                    </div>
                </div>

                <div className="ui segment">
                    <button className="ui primary button">
                    Play all
                    </button>
                </div>
                <div>
                    <div className="ui middle aligned divided list">
                        {/* Items */}
                        {songs}
                    </div>
                </div>
                


            </div>
        );
    }
}

export default PlaylistDetailPage;