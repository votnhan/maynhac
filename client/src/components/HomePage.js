import React from "react";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import "../assets/css/HomePage.css";
import HomePageService from "../services/HomePageService";
import { Card, Icon, Image } from "semantic-ui-react";
import { showSongPlayer, hideSongPlayer } from "../actions/uiActions";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSong: 10,
      listSong: [],
      ImagesAutoPlay: []
    };
  }

  getDivImagesAutoPlay() {
    return this.state.ImagesAutoPlay.map((object, idx) => {
      return <img src={object} key={idx} alt="null"/>;
    });
  }

  componentWillMount() {
    HomePageService.handleGetImagesAutoPlay(res => {
      this.setState({ ImagesAutoPlay: res });
    });
    HomePageService.handleGetManySong(this.state.numberOfSong, res => {
      this.setState({ listSong: res });
      console.log(this.state.listSong);
    });
  }

  handlePlaySong(name) {
    this.props.showSongPlayer(name);
  }

  render() {
    const CardExampleImageCard = (obj, i) => (
      <Card key={i} onClick={()=> this.handlePlaySong(obj.name)}>
        <Image src="https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true" />
        {/* <Image src={obj.avatar}/> */}
        <Card.Content>
          <Card.Header>{obj.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>{obj.artist}</Card.Content>
      </Card>
    );
    return (
      <div className="home-page-carousel">
        <Carousel autoplay>
        {this.getDivImagesAutoPlay()}
        </Carousel>
        <div className="home-page-song-list-card">
          <Card.Group itemsPerRow={6}>
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

  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSongPlayer: name =>  dispatch(showSongPlayer(name)),
    hideSongPlayer: () => dispatch(hideSongPlayer())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
