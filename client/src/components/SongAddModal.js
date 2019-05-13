import React, { Component } from "react";
import Modal from 'react-modal';
import PlaylistService from '../services/PlaylistService';
import SongService from '../services/SongService';
import {connect} from 'react-redux';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class SongAddModal extends Component {

    constructor(props) {
        super(props);
        this.state = {isOpen: false, loadPlaylist: false};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isOpen !== prevState.isOpen) {
          return ({isOpen: nextProps.isOpen});
        }
        else {
          return null;
        }
      }

    closeModal = () => {
        this.props.closeModal();
    }

    onItemClicked = (e, item) => {
        e.preventDefault();
        {/* Hand add song to playlist */}
        var idsong = this.props.songItem;
        var idplaylist = item._id;
        SongService.handleAddSongToPlaylist({idsong, idplaylist}, (res) => {
            console.log(res);
            this.setState({isOpen: false, loadPlaylist: false});
        });
        
    }

    createPlaylistItem = (item) => {
        var className = "item";
        var click = (e) => this.onItemClicked(e, item);
        for (var i = 0 ; i < item.songs.length ; ++i) {
            if (item.songs[i]._id === this.props.songItem) {
                className = "item active";
                click = null;
            }
        }
        return (
            <a href="true" onClick={click} className={className}>
                {item.name}
                <div className="ui label">{item.songs.length}</div>
            </a>    
        );
    }



    loadPlaylist = () => {
        if (this.props.user.username === '') {
            this.setState({playlistCode: <div>Please login</div>, loadPlaylist: true});
            return;
        }
        else {
            var token = this.props.user.jwt;
            PlaylistService.handleGetMyPlaylists({token}, (res) => {
                var code = [];
                for (var i = 0 ; i < res.data.length ; ++i) {
                    code.push(this.createPlaylistItem(res.data[i]));
                }
                this.setState({playlistCode: code, loadPlaylist: true})
            });
            return;
            
        }
    }

    componentDidMount() {
        if (this.state.loadPlaylist !== true) {
            this.loadPlaylist();
        }
    }

    componentDidUpdate() {
        if (this.state.loadPlaylist !== true) {
            this.loadPlaylist();
        }
    }

    getPlaylist = () => {
        if (this.state.loadPlaylist !== true) {
            return <div>Wait a second</div>
        }
        return this.state.playlistCode;
    }

    render() {
        return (
            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="Example Modal">
                {/* List playlists */}
                <div className="ui vertical menu">
                    {this.getPlaylist()}
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
      ...state
    };
  }

  const mapDispatchToProps = dispatch => {
    return  {
      onUserLogout: () => dispatch({type: 'LOGOUT'}) 
    }; 
  
  }

export default connect(mapStateToProps, mapDispatchToProps)(SongAddModal);