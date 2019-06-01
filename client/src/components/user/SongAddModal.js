import React, { Component } from "react";
import Modal from 'react-modal';
import PlaylistService from '../../services/PlaylistService';
import SongService from '../../services/SongService';
import {connect} from 'react-redux';
import {message} from "antd";

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
        this.state = {isOpen: false, loadPlaylist: false, newPlaylistName: "", newPlaylistDesc: ""};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isOpen !== prevState.isOpen) {
          return ({isOpen: nextProps.isOpen, loadPlaylist: false});
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
            if (item.songs[i] === this.props.songItem) {
                className = "item active";
                click = (e) => {e.preventDefault()};
            }
        }
        return (
            <a key={item._id} href="true" onClick={click} className={className}>
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
    onAddPlaylistInputChanged = (e) => {
        this.setState({newPlaylistName: e.target.value});
    }

    onCreateNew = () => {
        if (this.state.newPlaylistName !== '') {
            // TODO: Check for duplicate playlist name

            var token = this.props.user.jwt;
            var duplicate = false;
            PlaylistService.handleGetMyPlaylists({token}, (res) => {
                for (var i = 0 ; i < res.data.length ; ++i) {
                    if (res.data[i].name === this.state.newPlaylistName) {
                        duplicate = true;
                    }

                    if (i >= res.data.length - 1) {
                        if (duplicate !== true) {
                            // Can add
                            var name = this.state.newPlaylistName;
                            var description = this.state.newPlaylistDesc;
                            var typeid = 2;
                            var token = localStorage.getItem('x-access-token');
                            var data = {name, description, typeid, token}
                            
                            
                            PlaylistService.handleCreatePlaylist(data, (res) => {
                                message.info("Create new playlist successfully");
                                this.setState({loadPlaylist: false});
                            });

                        }
                        else {
                            message.error("Duplicated playlist name");
                        }
                    }
                }

                if (res.data.length === 0) {
                    var name = this.state.newPlaylistName;
                    var description = this.state.newPlaylistDesc;
                    var typeid = 2;
                    var token = localStorage.getItem('x-access-token');
                    var data = {name, description, typeid, token}
                    
                    
                    PlaylistService.handleCreatePlaylist(data, (res) => {
                        message.info("Create new playlist successfully");
                        this.setState({loadPlaylist: false});
                    });
                }
            });
        }
    }

    newPlaylist = (e) => {
        this.setState({newPlaylist: true});
    }

    getAddToPlaylistCode = () => {
        return (
            <div>
                <div className="ui vertical menu">
                    {this.getPlaylist()}
                </div>
                {/* Add playlist */}
                <div className="item" onClick={this.newPlaylist}>
                    <div className="ui transparent icon input">
                    <button class="ui button">
                    New playlist
                    </button>
                    </div>
                </div>
            </div>
        );
    }

    getNewPlaylistCode() {
        return (
            <div class="ui form" >
                <div class="field">
                    <label>Name</label>
                    <input type="text" name="name" onChange={(e) => this.setState({newPlaylistName: e.target.value})} placeholder="Name"/>
                </div>
                <div class="field">
                    <label>Description</label>
                    <input type="text" name="description" onChange={(e) => this.setState({newPlaylistDesc: e.target.value})}  placeholder="Description"/>
                </div>
                <button onClick={(e) => this.onCreateNew()} class="ui secondary button">
                Okay
                </button>
                <button onClick={(e) => this.setState({newPlaylist: false})} class="ui button">
                Cancel
                </button>
            </div>
        )
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
                {this.state.newPlaylist ? this.getNewPlaylistCode() : this.getAddToPlaylistCode()}
                
                
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