import React, {Component} from 'react';
import cover from '../../assets/imgs/playlist.jpg'
import history from "../../history";

class PlaylistCard extends Component {


    onCardClicked = (e) => {
        e.preventDefault();
        history.push({pathname: "/playlistDetail", state: {data: this.props.data}});
    }

    render() {
        return (
                <div onClick={this.onCardClicked} className="ui fluid card" style={{maxWidth: "25%", maxHeight: "25%"}}>
                    <div className="image" >
                        <img alt="" src={cover} />
                    </div>
                    <div className="content">
                        <a href="true" onClick={this.onCardClicked} className="header">{this.props.data.name}</a>
                    </div>
                </div>
                
        );
    }
}

export default PlaylistCard;