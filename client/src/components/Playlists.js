import React, { Component } from "react";
import PlaylistCard from './PlaylistCard';



class Playlists extends Component {
    render() {
        var code = [];
        for (var i = 0 ; i < this.props.data.length; ++i) 
            code.push(<PlaylistCard data={this.props.data[i]}/>);
        return (


            <div className="ui link cards">
                {code}
            </div>
        );
    }
}

export default Playlists;