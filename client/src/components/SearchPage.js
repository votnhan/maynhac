import "semantic-ui-css/semantic.min.css";
import React from 'react';
import SongService from '../services/SongService';
import * as types from '../constants/type';
import {connect} from 'react-redux';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {searchKey: null, update: true, searchCode: null};
    }

    static getDerivedStateFromProps(nextProps, prevState){ 
        if (nextProps.location.state.searchKey !== prevState.searchKey) {
            return {searchKey: nextProps.location.state.searchKey, update: false};
        }
        else {
            return null;
        }
    }


    playSong(avatar, name, artist, link) {
        this.props.play(avatar, name, artist, link);
    }

    createSearchItem(avatar, name, artist, link) {
        return (
        <div className="item">
            <a className="ui tiny image">
                <img src={avatar}/>
            </a>
            <div className="content">
                <a className="header" onClick={(e) => this.playSong(avatar, name, artist, link)}>{name}</a>
                <div className="description">
                    <p>{artist}</p>
                </div>
            </div>
        </div>
        );
    }

    loadSearchData() {
        SongService.handleSearch(this.state.searchKey, res => {
            console.log("Derived find " + res.length);
            var searchCode = [<div>{"Find " + res.length + " results"}</div>];
            for (var i = 0 ; i < res.length; ++i) {
                var {artist, avatar, comment, dateposted, link, lyrics, name,
                numlike, numlisten, type, unsignedname, __v, _id} = res[i];
                searchCode.push(this.createSearchItem(avatar, name, artist, link));
            }
            this.setState({searchCode: searchCode, update: true}); 
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
            <div className="ui items" style={{alignContent: "left", textAlign: "left"}}>
            {this.state.searchCode}
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