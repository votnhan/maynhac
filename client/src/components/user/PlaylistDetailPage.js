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

    deleteSongFromPlaylist = (_id) => {
        var playlistId = this.state.data._id;
        var songsCode = [...this.state.songsCode];
        var index = -1;
        for (var i = 0 ; i < this.state.songsCode.length ; ++i) {
            if (this.state.songsCode[i].key === _id) {
                index = i;
                break;
            }
        }
        if (index !== - 1) {
            songsCode.splice(index, 1);
            this.setState({songsCode: songsCode});
            var songId = _id;
            PlaylistService.handleRemoveSongFromPlaylist({playlistId, songId}, (res) => {
                this.setState({songsCode: songsCode});
                var songs = [...this.state.data.songs];
                for (var i = 0 ; i < songs.length ; ++i) {
                    if (songs[i]._id === _id) {
                        index = i;
                        break;
                    }
                }
                songs.splice(index, 1);
                this.setState({data: {...this.state.data, songs: songs}});
                
            })
        }

    }

    loadSong() {
        if (this.state.songsUpdate !== true) {
            var response = (code, res, i, length) => {
                var {name, _id, avatar, link, artist} = res;
                code.push(<SongSearchItem key={_id} name={name}  avatar={avatar} artist={artist} link={link} onDelete={() => this.deleteSongFromPlaylist(_id)}/>);
                if (i >= length - 1) {
                    this.setState({songsCode: code, songsUpdate: true});
                    return;
                }
            }
            var playlistId = this.state.data._id;
            PlaylistService.handleGetSongsOfPlaylist({playlistId}, res => {
                console.log(res);
                var code = [];
                for (var i = 0 ; i < res.length; ++i) {
                    response(code, res[i], i, res.length);
                }
                
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
                        <h5 style={{color:'white'}}>{this.state.data.description}</h5>
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
  