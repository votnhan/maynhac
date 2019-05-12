import React, {Component} from 'react';
import * as types from '../constants/type';
import {connect} from 'react-redux';
import "../assets/css/ListSong.css";

class ListSong extends Component {

    constructor(props) {
        super(props);
        this.state = {items: this.props.items};
    }

    playSong(avatar, name, artist, link) {
        this.props.play(avatar, name, artist, link);
    }

    createSearchItem(avatar, name, artist, link) {
        return (
        <div className="item" style={{maxHeight: "5%"}}>
            <div className="ui tiny image list-song">
                <img src={avatar} alt=""/>
            </div>
            <div className="content">
                <div className="header list-song"  onClick={(e) => this.playSong(avatar, name, artist, link)}>{name}</div>
                <div className="description">
                    <p>{artist}</p>
                </div>
            </div>
        </div>
        );
    }

    static getDerivedStateFromProps(nextProps, prevState){ 
        if (nextProps.items !== prevState.items) {
            return {items: nextProps.items};
        }
        else {
            return null;
        }
    }

    render() {
        var searchCode = [];
        for (var i = 0 ; i < this.state.items.length; ++i) {
            var {artist, avatar, link, name} = this.state.items[i];
            searchCode.push(this.createSearchItem(avatar, name, artist, link));
        }
        return searchCode;
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
  

export default connect(mapStateToProps, mapDispatchToProps)(ListSong);