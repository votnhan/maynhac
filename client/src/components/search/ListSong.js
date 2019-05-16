import React, {Component} from 'react';
import * as types from '../../constants/type';
import {connect} from 'react-redux';
import "../../assets/css/ListSong.css";
import SongSearchItem from './SongSearchItem';

class ListSong extends Component {

    constructor(props) {
        super(props);
        this.state = {items: this.props.items};
    }

    playSong(avatar, name, artist, link) {
        this.props.play(avatar, name, artist, link);
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
            var {artist, avatar, link, name, _id} = this.state.items[i];
            var item = <SongSearchItem key={_id} name={name} _id={_id} avatar={avatar} artist={artist} link={link}/>
            searchCode.push(item);
        }
        return (
            searchCode
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
  

export default connect(mapStateToProps, mapDispatchToProps)(ListSong);