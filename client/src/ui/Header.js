import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/Header.css';
import logo from '../assets/imgs/logo.jpg';
import UserInfo from '../models/UserInfo';
import LoginModal from './LoginModal';
import SongService from '../services/SongService';
import UploadPage from './UploadPage';
import ChartPage from './ChartPage';
import HomePage from './HomePage';
import TopPage from './TopPage';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Menu } from "semantic-ui-react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCode: (
        <a href="true" className="logout-button" onClick={this.onLoginClicked}>
          Login
        </a>
      ),
      playlistCode: null,
      popup: null,
      searchKey: "",
      openModal: false,
      activeItem: "home"
    };
    this.loginModal = React.createRef();
  }

  componentDidMount() {
    var userName = UserInfo.getUserName();
    if (userName !== null && userName.length !== 0) {
      this.setState({
        buttonCode: (
          <div className="header-user-menu">
            <img src={logo} alt="User" />
            <ul>
              <li>
                <a href="true">Settings</a>
              </li>
              <li>
                <a href="true">Payments</a>
              </li>
              <li>
                <a href="true" className="highlight">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ),
        playlistCode: (
          <a href="true">
            <i className="fa fa-cogs" /> Settings
          </a>
        )
      });
    }
  }

  onInputChanged = e => {
    this.setState({ searchKey: e.target.value });
    this.setState({ openModal: false });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const menuBar = (
      <Menu borderless size="huge" icon="labeled">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.toHomePage}
        >
          <Icon name="home" size="large" />
          Home
        </Menu.Item>


        <Menu.Item
          name="charts"
          active={activeItem === "charts"}
          onClick={this.handleItemClick}
        >
          <Icon name="chart bar" size="large" />
          Charts
        </Menu.Item>

        <Menu.Item
          name="top10"
          active={activeItem === "top10"}
          onClick={this.toTopPage}
        >
          <Icon name="chart line" size="large" />
          Top 10
        </Menu.Item>

        <Menu.Item
          name="playlist"
          active={activeItem === "playlist"}
          onClick={this.handleItemClick}
        >
          <Icon name="list" size="large" />
          My Playlist
        </Menu.Item>
      </Menu>
    );
    return (
      <header className="header-two-bars">
        <div className="header-first-bar">
          <div className="header-limiter">
            <h1>
              <a href="true">
                <img className="logo" src={logo} alt="Logo" />
              </a>
            </h1>
            <form method="get" onSubmit={this.onSearch}>
              <input
                type="search"
                placeholder="Search!"
                onChange={this.onInputChanged}
                name="search"
              />
              <button type="submit">
                <Icon name="search" />
              </button>
            </form>
            {this.state.buttonCode}
          </div>
        </div>

        <div>
          <div className="header-limiter">
            <nav>
              {menuBar}

              {this.state.playlistCode}
            </nav>
          </div>
        </div>
        <div>
          <LoginModal ref={this.loginModal} isOpen={this.state.openModal} />
        </div>
      </header>
    );
  }

  onSearchClicked = e => {
    console.log(document.getElementById("searchInput"));
  };

  onLoginClicked = e => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onSearch = e => {
    e.preventDefault();
    SongService.handleSearch(this.state.searchKey, res => {
      console.log(res);
    });
    console.log(this.state.searchKey);
  };

    toUploadPage(e, { name }) {
      this.setState({ activeItem: name });
        e.preventDefault();
        ReactDOM.render(<UploadPage/>, document.getElementById("content"));
    }

    toChartPage(e, { name }) {
        e.preventDefault();
        ReactDOM.render(<ChartPage/>, document.getElementById("content"));

    }

    toHomePage(e, { name }) {
        e.preventDefault();
        ReactDOM.render(<HomePage/>, document.getElementById("content"));
    }

    toTopPage(e, { name }) {
        e.preventDefault();
        ReactDOM.render(<TopPage/>, document.getElementById("content"));
    }

   

}

export default Header;
