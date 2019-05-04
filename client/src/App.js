import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Header from "./ui/Header";
import HomePage from "./ui/HomePage";
import { Router, Route} from "react-router-dom";
import ChartPage from "./ui/ChartPage";
import PlaylistPage from "./ui/PlaylistPage";
import TopPage from "./ui/TopPage";
import UploadPage from "./ui/UploadPage";
import history from  './ui/history';
class App extends Component {
  render() {
    return (
      <Router   history={history}>
        <div className="App">
          <Route path="/" component={Header}/>
          <Route path="/" component={HomePage} exact />
          <Route path="/home" component={HomePage} exact />
          <Route path="/charts" component={ChartPage} />
          <Route path="/playlist" component={PlaylistPage} />
          <Route path="/top10" component={TopPage} />
          <Route path="/upload" component={UploadPage} />
        </div>
      </Router>
    );
  }
}

export default App;
