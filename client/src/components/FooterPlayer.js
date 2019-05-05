import React from "react";
import "../assets/css/FooterPlayer.css";
import { connect } from "react-redux";
import { hideSongPlayer } from "../actions/uiActions";

class FooterPlayer extends React.Component {
  handleStop(){
    console.log("stop !");
    this.props.hideSongPlayer();
  }
  render() {
    if (this.props.showPlayer )
      return <div className="sticky-floating-footer">Now playing {this.props.nowPlayingName}....
      <button onClick={()=> this.handleStop()}>STOP</button>
      </div>;
    else return <div></div>;
  }
}


function mapStateToProps(state) {
    return {
        showPlayer: state.uiReducer.showPlayer,
        nowPlayingName: state.uiReducer.nowPlayingName,
    };
}

function mapDispatchToProps(dispatch) {
    return {
      hideSongPlayer: () =>  dispatch(hideSongPlayer()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterPlayer);
