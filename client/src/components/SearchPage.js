import "semantic-ui-css/semantic.min.css";
import React from 'react';
import SongService from '../services/SongService';
import * as types from '../constants/type';
import {connect} from 'react-redux';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {code: null};
    }

    getSearchContent() {

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

    

    componentDidMount() {
        const searchKey = this.props.location.state.searchKey;
        console.log("From search page:")
        console.log(searchKey);
        var searchCode = [];
        SongService.handleSearch(searchKey, res => {
            for (var i = 0 ; i < res.length; ++i) {
              var {artist, avatar, comment, dateposted, link, lyrics, name,
              numlike, numlisten, type, unsignedname, __v, _id} = res[i];
              searchCode.push(this.createSearchItem(avatar, name, artist, link));
            }
        });
        this.setState({code: searchCode});
    }

    render() {
        return (
            <div className="ui items" style={{alignContent: "left", textAlign: "left"}}>
                {this.state.code}
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
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);