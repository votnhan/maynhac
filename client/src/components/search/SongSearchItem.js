import React, {Component} from 'react';
import "../../assets/css/ListSong.css";
import * as types from '../../constants/type';
import {connect} from 'react-redux';
import Popup from 'reactjs-popup';
import SongAddModal from '../user/SongAddModal';
import SongService from '../../services/SongService';
import { getSongInfo } from "../../actions/getSongInfoAction";
import { showSongPlayer, hideSongPlayer, addSongToQueue } from "../../actions/uiActions";
import history from "../../history";
import * as URI from "uri-js";
import { Carousel, message } from "antd";


class SongSearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {modalIsOpen: false, visibility: "hidden", color: "white"};
    }

    playSong = (e) => {
        SongService.handleGetSongbyId(this.props._id, res => {
            var obj = res.data;
            const newObj = {...obj , link: URI.serialize(URI.parse(this.props.link)) };
            this.props.showSongPlayer(newObj);
            message.success("Now playing \" "+ this.props.name + "\"");
          });
        
    }
    addToQueue = (e) => {
        const song = {
            name: this.props.name,
            singer: this.props.artist,
            cover: this.props.avatar,
            musicSrc: this.props.link
          };
          this.props.addSongToQueue(song);
          message.success("\"" + this.props.name + "\" is Added to now playing") 
    }

    addSong = (e) => {
        this.setState({modalIsOpen: true});
    }

    closeAddSong = () => {
        this.setState({modalIsOpen: false});
    }

    onMouseEnter = (e) => {
        this.setState({visibility: "visible", color: "#f2f7ff"});
    }

    onMouseLeave = (e) => {
        this.setState({visibility: "hidden", color: "white"});
    }

    likeSong = (e) => {
        var songId = this.props._id;
        console.log(songId);
        SongService.handleReaction({songId}, (res) => {
            console.log(res);
        })
    }

    showInfo = (e) => {
        SongService.handleGetSongbyId(this.props._id, res => {
            this.props.getSongInfo(res.data);
          });
        history.push(`/info/${this.props.name}`);
        console.log(history);
    }

    onDeleteItem = (e) => {
        this.props.onDelete();
    }
    

    render() {
        var trigger = <div style={{position: "relative", float: "right", visibility: this.state.visibility}}><i className="list alternate big icon"></i></div>
        return (
            <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className="item" style={{maxHeight: "5%", verticalAlign: "middle", backgroundColor: this.state.color}}>
                <div className="ui mini image list-song">
    
                    <img src={this.props.avatar} alt=""/>
                </div>
                <div className="content">
                    <div className="header list-song"  onClick={this.showInfo}>{this.props.name}</div>
                    <div className="description" style={{paddingTop: "0px", marginTop: "0px"}}>
                        <p>{this.props.artist}</p>
                    </div>
                </div>
                <Popup closeOnDocumentClick  trigger={trigger} position="right center">
                    <div>
                        <div onClick={this.playSong}><i className="play circle icon"></i>Play this song</div>
                        <div onClick={this.addSong}><i className="plus square icon"></i>Add</div>
                        <div onClick={this.addToQueue}><i className="podcast icon"></i>Add to current playlist</div>
                        <div onClick={this.likeSong}><i className="heart icon"></i>Like</div>
                    </div>
                </Popup>
                {this.props.onDelete != null ? 
                    <div onClick={this.onDeleteItem} style={{position: "relative", float: "right", visibility: this.state.visibility}}><i className="window close big icon"></i></div> 
                    : null}
                <SongAddModal closeModal={this.closeAddSong} isOpen={this.state.modalIsOpen} songItem={this.props._id}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      play: (avatar, name, artist, link) => dispatch({type: types.PLAY_SONG, payload: {avatar, name, artist, link}}),
        getSongInfo: obj => dispatch(getSongInfo(obj)),
        showSongPlayer: obj => dispatch(showSongPlayer(obj)),
        addSongToQueue: obj => dispatch(addSongToQueue(obj))
    };
  }
  

  export default connect(mapStateToProps, mapDispatchToProps)(SongSearchItem);