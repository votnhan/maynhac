import React from 'react';
import './assets/css/Header.css';
import logo from './assets/imgs/2.jpg';
import UserInfo from './models/UserInfo';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {buttonCode: <a href="#" className="logout-button">Login</a>};
    }

    componentDidMount() {
        var userName = UserInfo.getUserName();
        if (userName !== null && userName.length !== 0) {
            this.setState({
                buttonCode: 
                        <div classNameName="header-user-menu">
                            <img src={logo} alt="User"/>
                            <ul>
                                <li><a href="#">Settings</a></li>
                                <li><a href="#">Payments</a></li>
                                <li><a href="#" classNameName="highlight">Logout</a></li>
                            </ul>
                        </div>,
                playlistCode: <a href="#"><i className="fa fa-cogs"></i> Settings</a>   
                    });
        }
    }

    render() {
        return (
            <header className="header-two-bars">
                <div className="header-first-bar">
                    <div className="header-limiter">
                        <h1><a href="#">Company<span>logo</span></a></h1>
                        <form method="get" action="#">
                            <input type="search" placeholder="Search!" name="search"/>
                        </form>
                        {this.state.buttonCode}
                    
                    </div>
                </div>
                <div className="header-second-bar">
                    <div className="header-limiter">
                        <nav>
                            <a href="#"><i className="fa fa-comments-o"></i>Home</a>
                            <a href="#"><i className="fa fa-file-text"></i>Chart</a>
                            <a href="#"><i className="fa fa-group"></i>Top 10</a>
                            {this.state.playlistCode}
                        </nav>
                    </div>
                </div>

                
            </header>
        );
    }

    onSearchClicked(target) {
        console.log(document.getElementById("searchInput"));
    }
}

export default Header;