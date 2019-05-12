import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../assets/css/UserPage.css";
import PlaylistService from "../services/PlaylistService";
import Playlists from './Playlists';


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
      console.log("Load playlist");
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
          console.log(this.state.playlists);
          playlistsCode = <Playlists data={this.state.playlists.data}/>;
        }
        return playlistsCode;
      }
      return (
        <div>Choose another option</div>
      );
    }


    render() {
        var code = this.loadCode();
        return (
            <div className="user container">
                    <div className="user left">
                    <div className="ui secondary vertical pointing menu">
                      {this.createMenuItem("Songs", false)}
                      {this.createMenuItem("Playlists", false)}
                      {this.createMenuItem("Artists", false)}
                      {this.createMenuItem("Upload", false)}
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