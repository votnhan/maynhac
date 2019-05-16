import "semantic-ui-css/semantic.min.css";
import React from 'react';
import SongService from '../services/SongService';
import * as types from '../constants/type';
import {connect} from 'react-redux';
import ListSong from './search/ListSong';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {searchKey: null, update: true, searchCode: null};
    }

    static getDerivedStateFromProps(nextProps, prevState){ 
        if (nextProps.location.state !== undefined && nextProps.location.state.searchKey !== prevState.searchKey) {
            return {searchKey: nextProps.location.state.searchKey, update: false};
        }
        else {
            return null;
        }
    }


    playSong(e, avatar, name, artist, link) {
        e.preventDefault();
        this.props.play(avatar, name, artist, link);
    }

    loadSearchData() {
        SongService.handleSearch(this.state.searchKey, res => {
            var searchCode = [<div key="search-numres">{"Found " + res.length + " results"}</div>];
            this.setState({searchCode: [searchCode, <ListSong key="search-res" items={res}></ListSong>], update: true}); 
        });
    }

    componentDidUpdate() {
        if (this.state.update === false) {
            this.loadSearchData();
        } 
    }

    componentDidMount() {
        if (this.state.update === false) {
            this.loadSearchData();
        } 
    }
    

    render() {
        if (this.state.update === false) {
            return (
                <div>Wait a minute</div>
            )
        }
        return (
            <div className="container">
                <div className="ui items" style={{alignContent: "left", textAlign: "left"}}>
            {this.state.searchCode}
                </div>
            </div>
            
        )
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
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);