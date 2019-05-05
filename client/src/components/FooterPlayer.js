import React from "react";
import "../assets/css/FooterPlayer.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions';

class FooterPlayer extends React.Component {
  
  render() {
      console.log(this.props);
    if (this.props.showPlayer )
      return <div className="sticky-floating-footer">MUSIC PLAYING HERE</div>;
    else return <div>a</div>;
  }
}


function mapStateToProps(state) {
    return {
        state: state.uiReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(uiActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterPlayer);
