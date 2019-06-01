import React from "react";
import "../assets/css/Header.css";
import logo from "../assets/imgs/logo.jpg";
import LoginModal from "./LoginModal";
import "semantic-ui-css/semantic.min.css";
import { Icon, Menu } from "semantic-ui-react";
import history from "../history";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import SearchPage from "./SearchPage";
import { message } from "antd";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCode: this.createUserDropDownButton(""),
      playlistCode: null,
      popup: null,
      searchKey: "",
      openModal: false,
      activeItem: "home",
      username: "",
      isUpdated: false
    };
  }

  createUserDropDownButton = (username) => {
      this.setState({isUpdated: true});
      if (username !== undefined && username !== '') {
        return (
            <div className="header-user-menu">
                    <img src={logo} alt="User" />
                    <ul>
                      <li>
                        <a href="true" onClick={this.onUsernameClicked}>{username}</a>
                      </li>
                      <li>
                        <a href="true" onClick={this.onLogoutClicked} className="highlight">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
          );
      }
      else {
          return <a href="true" className="logout-button" onClick={this.onLoginClicked}>
          Login
        </a>
      
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.username !== prevState.username) {
      return ({username: nextProps.user.username, name: nextProps.user.name, isUpdated: false});
    }
    else {
      return null;
    }
  }

  componentDidUpdate() {
    if (this.state.isUpdated === false) {
      this.setState({buttonCode: this.createUserDropDownButton(this.state.name)});
    }
  }

  componentDidMount() {
    if (this.state.isUpdated === false) {
      this.setState({buttonCode: this.createUserDropDownButton(this.state.name)});
    }
  }

  onUsernameClicked = (e) => {
    e.preventDefault();
    history.push('/user');
  }

  onInputChanged = e => {
    this.setState({ searchKey: e.target.value });
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    history.push(`/${name}`);
  };

  render() {
    const { activeItem } = this.state;
    const menuBar = (
      <Menu borderless size="huge" icon="labeled">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
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
          name="upload"
          active={activeItem === "upload"}
          onClick={this.handleItemClick}
        >
          <Icon name="cloud upload" size="large" />
          Upload
        </Menu.Item>
      </Menu>
    );
    return (
      <header className="header-two-bars">
        <div className="header-first-bar">
          <div className="header-limiter">
            <h1>
              <a href="/">
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

        <div className="header-line">
          <div className="header-limiter ">
            <nav>
              {menuBar}

              {this.state.playlistCode}
            </nav>
          </div>
        </div>
        <div>
          <LoginModal onCloseModal={() => this.setState({openModal: false})} isOpen={this.state.openModal} />
        </div>
      </header>
    );
  }

  onSearchClicked = e => {
  };

  onLoginClicked = e => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onSearch = e => {
    console.log('ahihi');
    e.preventDefault();
    this.setState({ activeItem: 'search' });
    history.push({pathname:`/search`, state: {searchKey: this.state.searchKey}});
  };

  onLogoutClicked = e => {
    e.preventDefault();
    this.props.onUserLogout();
    message.info("Logout Successfully")
  };
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLogout: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
