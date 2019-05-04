import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/Header.css';
import logo from '../assets/imgs/logo.jpg';
import iconSearch from "../assets/imgs/icons/icon-search.png";
import UserInfo from '../models/UserInfo';
import LoginModal from './LoginModal';
import SongService from '../services/SongService';
import UploadPage from './UploadPage';
import ChartPage from './ChartPage';
import HomePage from './HomePage';
import TopPage from './TopPage';
import 'semantic-ui-css/semantic.min.css'


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {buttonCode: <a href="true" className="logout-button" onClick={this.onLoginClicked}>Login</a>,
         playlistCode: null, 
         popup: null,
         searchKey: '',
        openModal: false};
        this.loginModal = React.createRef();
    }

    componentDidMount() {
        var userName = UserInfo.getUserName();
        if (userName !== null && userName.length !== 0) {
            this.setState({
                buttonCode: 
                        <div classNameName="header-user-menu">
                            <img src={logo} alt="User"/>
                            <ul>
                                <li><a href="true">Settings</a></li>
                                <li><a href="true">Payments</a></li>
                                <li><a href="true" classNameName="highlight">Logout</a></li>
                            </ul>
                        </div>,
                playlistCode: <a href="true"><i className="fa fa-cogs"></i> Settings</a>   
                    });
        }
    }

    onInputChanged = (e) => {
        this.setState({searchKey: e.target.value});
        this.setState({openModal: false});
    }

    render() {
        return (
            <header className="header-two-bars">
                <div className="header-first-bar">
                    <div className="header-limiter">

                        <h1><a href="true"><img className="logo" src={logo} alt="Logo" /></a></h1>
                        <form method="get" onSubmit={this.onSearch}>
                            <input type="search" placeholder="Search!" onChange={this.onInputChanged} name="search"/>
                            <button type="submit">
                                <img className="icon-search"src={iconSearch} alt="error"/>
                            </button>
                            
                        </form>
                        {this.state.buttonCode}
                    
                    </div>
                </div>
                <div className="header-second-bar">
                    <div className="header-limiter">
                        <nav>
                            <a href="true" onClick={this.toHomePage}><i className="home icon"></i>Home</a>
                            <a href="true" onClick={this.toChartPage}><i className="signal icon"></i>Chart</a>
                            <a href="true" onClick={this.toTopPage}><i className="hotjar icon"/>Top 10</a>
                            <a href="true" onClick={this.toUploadPage}><i className="cloud upload icon"></i>Upload</a>
                            {this.state.playlistCode}
                        </nav>
                    </div>
                </div>
                <div>
                    <LoginModal ref={this.loginModal} isOpen={this.state.openModal}/>
                </div>
            </header>
        );
    }

    onLoginClicked = (e) => {
        e.preventDefault();
        this.setState({openModal: true});
    }

    onSearch = (e) => {
        e.preventDefault();
        SongService.handleSearch(this.state.searchKey, (res) => {
            console.log(res);
        })
        console.log(this.state.searchKey);
    }

    toUploadPage(e) {
        e.preventDefault();
        ReactDOM.render(<UploadPage/>, document.getElementById("content"));
    }

    toChartPage(e) {
        e.preventDefault();
        ReactDOM.render(<ChartPage/>, document.getElementById("content"));

    }

    toHomePage(e) {
        e.preventDefault();
        ReactDOM.render(<HomePage/>, document.getElementById("content"));
    }

    toTopPage(e) {
        e.preventDefault();
        ReactDOM.render(<TopPage/>, document.getElementById("content"));
    }
}

export default Header;