import React, { Component } from "react";
import "../assets/css/ListChart100song.css";
import * as types from "../constants/type";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import SongAddModal from "./user/SongAddModal";
import SongService from "../services/SongService";
import { getSongInfo } from "../actions/getSongInfoAction";
import {
  showSongPlayer,
  hideSongPlayer,
  addSongToQueue
} from "../actions/uiActions";
import history from "../history";
import * as URI from "uri-js";
import { Carousel, message } from "antd";
import { Grid } from "semantic-ui-react";

class ListChart100song extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, visibility: "hidden", color: "white" };
  }

  playSong = e => {
    SongService.handleGetSongbyId(this.props._id, res => {
      var obj = res.data;
      const newObj = {
        ...obj,
        link: URI.serialize(URI.parse(this.props.link))
      };
      this.props.showSongPlayer(newObj);
      message.success('Now playing " ' + this.props.name + '"');
    });
  };
  addToQueue = e => {
    const song = {
      name: this.props.name,
      singer: this.props.artist,
      cover: this.props.avatar,
      musicSrc: this.props.link
    };
    this.props.addSongToQueue(song);
    message.success('"' + this.props.name + '" is Added to now playing');
  };

  addSong = e => {
    this.setState({ modalIsOpen: true });
  };

  closeAddSong = () => {
    this.setState({ modalIsOpen: false });
  };

  onMouseEnter = e => {
    this.setState({ visibility: "visible", color: "#f2f7ff" });
  };

  onMouseLeave = e => {
    this.setState({ visibility: "hidden", color: "white" });
  };

  likeSong = e => {
    var songId = this.props._id;
    console.log(songId);
    SongService.handleReaction({ songId }, res => {
      console.log(res);
    });
  };

  showInfo = e => {
    SongService.handleGetSongbyId(this.props._id, res => {
      this.props.getSongInfo(res.data);
    });
    history.push(`/info/${this.props.name}`);
    console.log(history);
  };

  render() {
    var trigger = (
      <div
        style={{
          position: "relative",
          float: "right",
          visibility: this.state.visibility
        }}
      >
        <i className="list alternate big icon" />
      </div>
    );
    return (
      <Grid.Row
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className="list-chart-item"
        columns={5}
        style={{
          maxHeight: "5%",
          verticalAlign: "middle",
          backgroundColor: this.state.color
        }}
      >
        <Grid.Column width={1}>
          <div className="list-chart-rank" />
          <h1>{this.props.rank} - </h1>
        </Grid.Column>

        <Grid.Column width={2}>
          <div className="ui tiny image list-song custom-margin-img-listchart">
            <img src={this.props.avatar} alt="" />
          </div>
        </Grid.Column>
        <Grid.Column width={7}>
          <div className="content list-chart-content">
            <div className="header list-song" onClick={this.showInfo}>
              {this.props.name}
            </div>
            <div
              className="description"
              style={{ paddingTop: "0px", marginTop: "0px" }}
            >
              <p>{this.props.artist}</p>
            </div>
          </div>
        </Grid.Column>

        <Grid.Column width={3} className="custom-list-chart-numlisten">
          <div>
            <h2>{this.props.numlisten}</h2>
          </div>
        </Grid.Column>

        <Grid.Column width={3} >
          <Popup closeOnDocumentClick trigger={trigger} position="right center">
            <div>
              <div onClick={this.playSong}>
                <i className="play circle icon" />
                Play this song
              </div>
              <div onClick={this.addSong}>
                <i className="plus square icon" />
                Add
              </div>
              <div onClick={this.addToQueue}>
                <i className="podcast icon" />
                Add to current playlist
              </div>
              <div onClick={this.likeSong}>
                <i className="heart icon" />
                Like
              </div>
            </div>
          </Popup>
          <SongAddModal
            closeModal={this.closeAddSong}
            isOpen={this.state.modalIsOpen}
            songItem={this.props._id}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    play: (avatar, name, artist, link) =>
      dispatch({
        type: types.PLAY_SONG,
        payload: { avatar, name, artist, link }
      }),
    getSongInfo: obj => dispatch(getSongInfo(obj)),
    showSongPlayer: obj => dispatch(showSongPlayer(obj)),
    addSongToQueue: obj => dispatch(addSongToQueue(obj))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListChart100song);
