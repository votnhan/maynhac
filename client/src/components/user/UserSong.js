import React, {Component} from 'react';
import SongService from '../../services/SongService';
import {connect} from 'react-redux';
import ListSong from '../search/ListSong';
import '../../assets/css/common.css';


class UserSong extends Component {

    constructor(props) {
        super(props);
        this.state = {songCode: null, update: false};
    }

    componentDidMount() {
        if (this.state.update !== true) {
            this.loadData();
        }
    }

    componentDidUpdate() {
        if (this.state.update !== true) {
            this.loadData();
        }
    }

    loadData() {
        var token = this.props.user.jwt;
        SongService.handleGetSongsReacted({token}, (res) => {
            this.setState({update: true, songCode: <ListSong key="like-res" items={res}></ListSong>});
        });
    }

    getData() {
        if (this.state.update !== true) {
            return <div>Wait a minute</div>
        }
        else {
            return this.state.songCode;
        }
    }

    render() {
        return (
            <div className="user-full-container">
                <div className="ui items" style={{alignContent: "left", textAlign: "left"}}>
                    {this.getData()}
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
      onUserLogin: (username, jwt, name) => dispatch({type: 'LOGIN', payload: {username, jwt, name}}) 
    }; 
  
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(UserSong);