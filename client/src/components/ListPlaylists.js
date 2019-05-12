import React, { Component } from "react";



class ListPlaylists extends Component {
    render() {
        return (
            <div className="ui four column grid">
                <div className="column">
                    <div className="ui fluid card">
                    <div className="image">
                        <img alt="" src="/images/avatar/large/daniel.jpg"/>
                    </div>
                    <div className="content">
                        <a className="header">Daniel Louise</a>
                    </div>
                    </div>
                </div>
                <div className="column">
                    <div className="ui fluid card">
                    <div className="image">
                        <img alt="" src="/images/avatar/large/helen.jpg"/>
                    </div>
                    <div className="content">
                        <a className="header">Helen Troy</a>
                    </div>
                    </div>
                </div>
                <div className="column">
                    <div className="ui fluid card">
                    <div className="image">
                        <img alt="" src="/images/avatar/large/elliot.jpg"/>
                    </div>
                    <div className="content">
                        <a className="header">Elliot Fu</a>
                    </div>
                    </div>
                </div>

                <div className="column">
                    <div className="ui fluid card">
                    <div className="image">
                        <img alt="" src="/images/avatar/large/elliot.jpg"/>
                    </div>
                    <div className="content">
                        <a className="header">Elliot Fu</a>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListPlaylists;