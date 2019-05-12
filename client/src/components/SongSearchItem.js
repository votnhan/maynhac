import React, {Component} from 'react';
import "../assets/css/ListSong.css";
import * as types from '../constants/type';
import {connect} from 'react-redux';
import Popup from 'reactjs-popup';


class SongSearchItem extends Component {

    playSong = (e) => {
        this.props.play(this.props.avatar, this.props.name, this.props.artist, this.props.link)
    }

    render() {
        var trigger = <input style={{position: "relative", float: "right"}}>Info</input>
        return (
            <div className="item" style={{maxHeight: "5%"}}>
                <div className="ui mini image list-song">
    
                    <img src={this.props.avatar} alt=""/>
                </div>
                <div className="content">
                    <div className="header list-song"  onClick={this.playSong}>{this.props.name}</div>
                    <div className="description" style={{paddingTop: "0px", marginTop: "0px"}}>
                        <p>{this.props.artist}</p>
                    </div>
                </div>
                <Popup trigger={trigger} position="right center">
                    <div>Popup content here !!</div>
                </Popup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      play: (avatar, name, artist, link) => dispatch({type: types.PLAY_SONG, payload: {avatar, name, artist, link}})
    };
  }
  

  export default connect(mapStateToProps, mapDispatchToProps)(SongSearchItem);