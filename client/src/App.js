import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { Router, Route } from "react-router-dom";
import ChartPage from "./components/ChartPage";
import PlaylistPage from "./components/PlaylistPage";
import TopPage from "./components/TopPage";
import UploadPage from "./components/UploadPage";
import history from "./history";
import FooterPlayer from "./components/FooterPlayer";
import Footer from "./components/Footer";
import { connect } from "react-redux";
import UserPage from './components/UserPage';
import SongInfoPage from "./components/SongInfoPage";
import SearchPage from "./components/SearchPage";
import * as uiActions from "./actions/uiActions";
import PlaylistDetailPage from './components/user/PlaylistDetailPage';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route path="/" component={Header} />
          <Route path="/home" component={HomePage} exact />
          <Route path="/" component={FooterPlayer} />
          <Route path="/" component={HomePage} exact />
          <Route path="/charts" component={ChartPage} />
          <Route path="/playlist" component={PlaylistPage} />
          <Route path="/top10" component={TopPage} />
          <Route path="/upload" component={UploadPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/user" component={UserPage} />
          <Route path="/info/:song" component={SongInfoPage} />
          <Route path="/" component={Footer} />
          <Route path="/playlistDetail" component={PlaylistDetailPage}/>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
