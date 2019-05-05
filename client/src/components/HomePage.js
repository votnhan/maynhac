import React from "react";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import "../assets/css/HomePage.css";
import HomePageService from "../services/HomePageService";
import { Card, Icon, Image } from "semantic-ui-react";
import {showSongPlayer} from "../actions/uiActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSong: 10,
      listSong: []
    };
    this.handlePlaySong = this.handlePlaySong.bind(this);
  }

  componentWillMount() {
    HomePageService.handleGetManySong(this.state.numberOfSong, res => {
      this.setState({ listSong: res });
      console.log(this.state.listSong);
    });
  }

  handlePlaySong(){
    showSongPlayer();
  }

  render() {
    const CardExampleImageCard = (obj, i) => (
      <Card key={i} onClick={this.handlePlaySong}>
        <Image src="https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true" />
        {/* <Image src={obj.avatar}/> */}
        <Card.Content>
          <Card.Header>{obj.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          {obj.artist}
        </Card.Content>
      </Card>
    );
    return (
      <div className="home-page-carousel">
        <Carousel autoplay>
          <div>
            <h3>1</h3>
          </div>
        </Carousel>
        <div className="home-page-song-list-card">
          <Card.Group itemsPerRow={2}>
            {this.state.listSong.map((object, idx) =>
              CardExampleImageCard(object, idx)
            )}
          </Card.Group>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
