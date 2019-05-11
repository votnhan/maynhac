import React from "react";
import "../assets/css/FooterPlayer.css";
import { connect } from "react-redux";
import { hideSongPlayer } from "../actions/uiActions";
import { Button, Icon } from "semantic-ui-react";
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
  autoPlay: true,
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
      console.log("LINK HERE: "+ this.props.nowPlayingLink);
      let data = {
        ...options,
        audioLists: [
          {
            name: this.props.nowPlayingName,
            singer: this.props.nowPlayingArtist,
            cover:
              "https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true",
            //musicSrc: this.props.nowPlayingLink
            musicSrc:"https://docs.google.com/uc?export=download&id=1G-LYZKweCJyfA2DC2NficqMePJmT0LA4"
          }
        ]
      };

      console.log(data);
      
      return (
        <div className="sticky-floating-footer">
          <Button className="order-front" onClick={() => this.handleStop()}>
            <Icon name="stop"/>
            
          </Button>
          <ReactJkMusicPlayer
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
    nowPlayingArtist: state.uiReducer.nowPlayingArtist

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
