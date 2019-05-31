import React, {Component} from 'react';
import cover from '../../assets/imgs/playlist_cover.png';
import "../../assets/css/UserPage.css";
import SongSearchItem from '../search/SongSearchItem';
import SongService from '../../services/SongService';
import PlaylistService from '../../services/PlaylistService';
import { playPlaylist } from "../../actions/uiActions";
import { connect } from "react-redux";


class PlaylistDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.location.state.data};
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
        var response = (res, i) => {
            var {name, _id, avatar, link, artist} = res.data;
            code.push(<SongSearchItem key={_id} name={name} _id={_id} avatar={avatar} artist={artist} link={link}/>);
            if (i >= this.state.data.songs.length - 1) {
                this.setState({songsCode: code, songsUpdate: true});
                return;
            }
        }
        for (var i = 0 ; i < this.state.data.songs.length; ++i) {
            SongService.handleGetSongbyId(this.state.data.songs[i], (res)=> {
                response(res, i);
            });
        }
    }

    getSong() {
        if (this.state.songsUpdate !== true) {
            return <div>Wait a minute</div>
        }
        else {
            return this.state.songsCode;
        }
    }

    onPlayAll = (e) => {
        PlaylistService.handleGetSongsOfPlaylist({playlistId: this.state.data._id}, (Songsofplaylist) => {
            this.props.playPlaylist(Songsofplaylist);
        });
    }


    render() {
        return (
            <div className="container" style={{paddingBottom: "5%"}}>
                <div>
                    <div className="ui placeholder segment" style={{backgroundColor: "#004655"}}>
                        <img alt="" src={cover} style={{maxWidth: "25%", width: "25%"}}/>
                        <h3 style={{color:'white'}}>{this.state.data.name}</h3>
                    </div>
                </div>

                <div className="ui segment">
                    <button onClick={this.onPlayAll} className="ui primary button">
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


function mapStateToProps(state) {
    return {};
  }
  
function mapDispatchToProps(dispatch) {
    return {
      playPlaylist: obj => dispatch(playPlaylist(obj)),
    };
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlaylistDetailPage);
  