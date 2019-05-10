import React from "react";
import "antd/dist/antd.css";
import "../assets/css/HomePage.css";
import "../assets/css/MusicCard.css";
import HomePageService from "../services/HomePageService";
import { Carousel } from "antd";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { showSongPlayer, hideSongPlayer } from "../actions/uiActions";
import { connect } from "react-redux";
import Slider from "react-slick";

import * as URI from "uri-js";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    />
  );
}

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
      return <img src={object} key={idx} alt="null" />;
    });
  }

  componentWillMount() {
    HomePageService.handleGetImagesAutoPlay(res => {
      this.setState({ ImagesAutoPlay: res });
    });
    HomePageService.handleGetManySong(this.state.numberOfSong, res => {
      this.setState({ listSong: res });
      
    });
  }

  handlePlaySong(obj) {
    console.log("obj here");
    console.log(obj);
    // console.log("LINK  " + URI.serialize(URI.parse(link)));
    const newObj = {...obj, link: URI.serialize(URI.parse(obj.link))}
    this.props.showSongPlayer(newObj);
  } 
 

  render() {
    const CardExampleImageCard = (obj, i) => (
      <div key={i} className="music-card-div">
      
      <Card  className="music-card-wrapper">
        {/* <Image
          className="music-card-img"
          src=""
        /> */}
        <Image className="music-card-img" src={obj.avatar} alt="https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true"/>

        <Button.Group className="music-card-button" size="large">
          <Button
            animated="vertical"
            color="orange"
            onClick={() => this.handlePlaySong(obj)}
          >
            <Button.Content hidden>Play</Button.Content>
            <Button.Content visible>
              <Icon name="play" />
            </Button.Content>
          </Button>

          <Button animated="vertical" color="yellow">
            <Button.Content hidden>Queue</Button.Content>
            <Button.Content visible>
              <Icon name="add" />
            </Button.Content>
          </Button>
        </Button.Group>
 
        <Card.Content>
          <Card.Header className="music-card-name">{obj.name}</Card.Header>
        </Card.Content>
        <Card.Content className="music-card-artist" extra>{obj.artist}</Card.Content>
      </Card>
      </div> 
    );
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
      initialSlide: 0,
      nextArrow: <SamplePrevArrow />,
      prevArrow: <SamplePrevArrow />
      
    };

    return (
      <div className="home-page-carousel">
        <Carousel autoplay>{this.getDivImagesAutoPlay()}</Carousel>
        {/* <div className="home-page-song-list-card">
          <Card.Group itemsPerRow={6} className="music-card-div">
          
          </Card.Group>
        </div> */}
        
        <div className="home-page-slider">
        <h1 className="home-page-h1-left">TOP Popular </h1>
          <Slider {...settings}>
            
            {this.state.listSong.map((object, idx) =>
              CardExampleImageCard(object, idx)
            )}
          
          </Slider>
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    showSongPlayer: obj => dispatch(showSongPlayer(obj)),
    hideSongPlayer: () => dispatch(hideSongPlayer())

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
