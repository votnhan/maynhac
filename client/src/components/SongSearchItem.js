import React, {Component} from 'react';
import "../assets/css/ListSong.css";
import * as types from '../constants/type';
import {connect} from 'react-redux';
import Popup from 'reactjs-popup';
import SongAddModal from './SongAddModal';


class SongSearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {modalIsOpen: false, visibility: "hidden", color: "white"};
    }

    playSong = (e) => {
        this.props.play(this.props.avatar, this.props.name, this.props.artist, this.props.link)
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

    render() {
        var trigger = <div style={{position: "relative", float: "right", visibility: this.state.visibility}}><i className="list alternate big icon"></i></div>
        return (
            <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className="item" style={{maxHeight: "5%", verticalAlign: "middle", backgroundColor: this.state.color}}>
                <div className="ui mini image list-song">
    
                    <img src={this.props.avatar} alt=""/>
                </div>
                <div className="content">
                    <div className="header list-song"  onClick={this.playSong}>{this.props.name}</div>
                    <div className="description" style={{paddingTop: "0px", marginTop: "0px"}}>
                        <p>{this.props.artist}</p>
                    </div>
                </div>
                <Popup closeOnDocumentClick  trigger={trigger} position="right center">
                    <div>
                    
                        <div onClick={this.playSong}><i onClick={this.playSong} className="play circle icon"></i>Play this song</div>
                        <div onClick={this.addSong}><i className="plus square icon"></i>Add</div>
                        <div><i className="podcast icon"></i>Add to current playlist</div>
                    </div>
                </Popup>
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
      play: (avatar, name, artist, link) => dispatch({type: types.PLAY_SONG, payload: {avatar, name, artist, link}})
    };
  }
  

  export default connect(mapStateToProps, mapDispatchToProps)(SongSearchItem);