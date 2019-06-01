import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../assets/css/UserPage.css";
import PlaylistService from "../services/PlaylistService";
import Playlists from './user/Playlists';
import UserSong from './user/UserSong';
import Reports from './user/Reports';



class UserPage extends Component {

    constructor() {
      super();
      this.state = {activeItem : 'Songs', playlists: null, loadPlaylists: null};
    }

    getClass = (name) => {
      if (name === this.state.activeItem) {
        return "item active";
      }
      else {
        return "item";
      }
    }

    loadPlaylists = () => {
      // TODO: Load code for playlists here
        var token = this.props.user.jwt;
        PlaylistService.handleGetMyPlaylists({token}, (res) => {
          this.setState({loadPlaylists: true, playlists: res});
        });
    }

    componentDidMount() {
      if (this.state.activeItem === "Playlists" 
      && this.state.loadPlaylists !== true) {
        this.loadPlaylists();
      }
    }

    componentDidUpdate() {
      if (this.state.activeItem === "Playlists" 
      && this.state.loadPlaylists !== true) {
        this.loadPlaylists();
      }
    }



    onItemSelected = (e) => {
      e.preventDefault();
      this.setState({activeItem: e.target.name});
    }

    createMenuItem = (name, isActive) => {
      return (
        <a name={name} onClick={this.onItemSelected} className={this.getClass(name)}>{name}</a>
      );
    }

    loadCode = () => {
      if (this.state.activeItem === "Playlists") {
        var playlistsCode = null;
        if (this.state.loadPlaylists !== true) {
          playlistsCode = <div className="ui active inline loader"></div>;
        }
        else {
          playlistsCode = <Playlists data={this.state.playlists.data}/>;
        }
        return playlistsCode;
      }
      else if (this.state.activeItem === "Songs") {
        return <UserSong/>
      }
      else if (this.state.activeItem === "Reports") {
        return <Reports/>
      }
      return (
        <div>Choose another option</div>
      );
    }


    render() {
        var code = this.loadCode();
        return (
            <div className="user container" style={{paddingTop: "10px"}}>
                    <div className="user left">
                    <div className="ui secondary vertical pointing menu">
                      {this.createMenuItem("Songs", false)}
                      {this.createMenuItem("Playlists", false)}
                      {this.createMenuItem("Uploads", false)}
                      {this.createMenuItem("Reports", false)}
                    </div>

                    </div>

                    <div className="user right">
                    {code}
                    </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);