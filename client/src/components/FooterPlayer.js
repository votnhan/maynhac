import React from "react";
import "../assets/css/FooterPlayer.css";
import { connect } from "react-redux";
import { hideSongPlayer } from "../actions/uiActions";
import { Button } from "semantic-ui-react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

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
  toggleMode: true,
  preload: false,
  glassBg: false,
  remember: false,
  remove: true,
  defaultPosition: {
    top: 300,
    left: 120
  },

  panelTitle: "Now playing ",
  mode: "full",
  once: true,
  autoPlay: false,
  showMiniProcessBar: false,
  drag: true,
  seeked: true,
  showProgressLoadBar: true,
  showPlay: true,
  showReload: false,
  showDownload: true
};

class FooterPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: options
    };
  }

  handleStop() {
    console.log("stop !");
    this.props.hideSongPlayer();
  }

  render() {
    if (this.props.showPlayer) {
      let data = {
        ...options,
        audioLists: [
          {
            name: this.props.nowPlayingName,
            singer: "--",
            cover:
              "https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true",
            musicSrc:
              "https://raw.githubusercontent.com/trungnhanuchiha/maynhac/master/server/public/music/Chon-Giau-Giac-Mo-Noo-Phuoc-Thinh.mp3"
          }
        ],
        
      };

      console.log(data);

      return (
        <div className="sticky-floating-footer">
          <Button className="order-front" onClick={() => this.handleStop()}>
            STOP - {this.props.nowPlayingName}
          </Button>
          <ReactJkMusicPlayer className="order-behind" {...data} />,
          {/* Now playing {this.props.nowPlayingName}....*/}{" "}
        </div>
      );
    } else return <div />;
  }
}

function mapStateToProps(state) {
  return {
    showPlayer: state.uiReducer.showPlayer,
    nowPlayingName: state.uiReducer.nowPlayingName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideSongPlayer: () => dispatch(hideSongPlayer())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterPlayer);
