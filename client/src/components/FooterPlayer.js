import React from "react";
import "../assets/css/FooterPlayer.css";
import { connect } from "react-redux";
import { hideSongPlayer, setAudioList, removeSong } from "../actions/uiActions";
import { Button, Icon } from "semantic-ui-react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import {message} from "antd";

const options = {
  //audio lists model
  audioLists: [
    {
      name: "",
      singer: "--",
      cover:
        "https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true",
      musicSrc: ""
    }
  ],

  playIndex: 0,
  defaultPosition: {
    top: 300,
    left: 120
  },

  panelTitle: "Now playing ",
  mode: "full",
  once: true,
  autoPlay: true,
  showMiniProcessBar: false,
};

class FooterPlayer extends React.Component {
  handleStop() {
    console.log("stop !");
    this.props.hideSongPlayer();
  }

  onAudioListsChange = (e, newPlaylist, audioInfo) => {
    console.log("Something changed");
    console.log(newPlaylist)
    if (newPlaylist.length != this.props.songQueue.length) {
      this.props.setAudioList(newPlaylist);
    }
  }

  render() {
    let t ;
    if (this.props.showPlayer) {
      let data = {
        ...options,
        audioLists: [
          {
            name: this.props.nowPlayingName,
            singer: this.props.nowPlayingArtist,
            cover:
              "https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true",
            musicSrc: this.props.nowPlayingLink
          }
        ]
      };

      if (this.props.songQueue.length !== 0) {
        data = {...data, audioLists: this.props.songQueue}

      }
      
      return (
        <div className="sticky-floating-footer">
          {/* <Button className="order-front" onClick={() => this.handleStop()}>
            <Icon name="stop"/>
            
          </Button> */}
          <ReactJkMusicPlayer
            onAudioListsChange={this.onAudioListsChange}
            className="order-behind"
            {...data}
            key={this.props.nowPlayingName}
          />

        </div>
      );
    } else return <div />;
  }
}

function mapStateToProps(state) {
  return {
    showPlayer: state.uiReducer.showPlayer,
    nowPlayingName: state.uiReducer.nowPlayingName,
    nowPlayingLink: state.uiReducer.nowPlayingLink,
    nowPlayingArtist: state.uiReducer.nowPlayingArtist,
    songQueue: state.uiReducer.songQueue,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideSongPlayer: () => dispatch(hideSongPlayer()),
    setAudioList: (audioList) => dispatch(setAudioList(audioList)),
    removeSong: (songName) => dispatch(removeSong(songName))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterPlayer);
