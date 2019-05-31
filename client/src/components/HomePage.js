import React from "react";
import { Carousel, message } from "antd";
import "antd/dist/antd.css";
import "../assets/css/HomePage.css";
import "../assets/css/MusicCard.css";
import *  as types from '../constants/type.js';
import HomePageService from "../services/HomePageService";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { showSongPlayer, hideSongPlayer, addSongToQueue } from "../actions/uiActions";
import { connect } from "react-redux";
import Slider from "react-slick";
import history from "../history";
import { getSongInfo } from "../actions/getSongInfoAction";
import * as URI from "uri-js";
import SongService from "../services/SongService";

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
      numberOfSong: 30,
      listSongTypePop: [],
      listSongTypeDance: [],
      listSongTypeFolk: [],
      listSongTypeRock: [],
      listSongNew: [],
      ImagesAutoPlay: []
    };
    HomePageService.handleGetImagesAutoPlay(res => {
      this.setState({ ImagesAutoPlay: res });
    });
    // HomePageService.handleGetManySong(this.state.numberOfSong, res => {
    //   this.setState({ listSong: res });

    // });
    HomePageService.handleGetKSongByTypeID(this.state.numberOfSong, 3, res => {
      this.setState({ listSongTypePop: res.songs });
    });

    HomePageService.handleGetKSongByTypeID(this.state.numberOfSong, 2, res => {
      this.setState({ listSongTypeDance: res.songs });
    });

    HomePageService.handleGetKSongByTypeID(this.state.numberOfSong, 4, res => {
      this.setState({ listSongTypeFolk: res.songs });
    });

    HomePageService.handleGetKSongByTypeID(this.state.numberOfSong, 1, res => {
      this.setState({ listSongTypeRock: res.songs });
    });

    //get random type, 'cause folk is empty so remove it
    let k = Math.floor(Math.random() * Math.floor(4)) + 1;
    k === 4 ? k-- : (k = k);

    HomePageService.handleGetNewKSongByTypeID(
      this.state.numberOfSong,
      k,
      res => {
        this.setState({ listSongNew: res.songs });
      }
    );
  }

  getDivImagesAutoPlay() {
    return this.state.ImagesAutoPlay.map((object, idx) => {
      return <img src={object} key={idx} alt="null" />;
    });
  }

  handlePlaySong(obj) {
    const newObj = { ...obj, link: URI.serialize(URI.parse(obj.link)) };
    this.props.showSongPlayer(newObj);
    message.success("Now playing \" "+ obj.name + "\"");
  }

  handleSongInfo(obj) {
    SongService.handleGetSongbyId(obj._id, res => {
      console.log("newObj_id ", res.data);
      this.props.getSongInfo(res.data);
    });

    history.push(`/info/${obj.name}`);
    console.log(history);
  }

  handleAddSongToQueue(obj) {
    console.log("obj", obj);
    const song = {
      name: obj.name,
      singer: obj.artist,
      cover: obj.avatar,
      musicSrc: obj.link
    };
    this.props.addSongToQueue(song);
    message.success("\"" + obj.name + "\" is Added to now playing") 
  }

  render() {
    const CardExampleImageCard = (obj, i) => (
      <div key={i} className="music-card-div">
        <Card className="music-card-wrapper">
          <Image
            className="music-card-img"
            src={obj.avatar?obj.avatar:types.LOGO_LINK}
            alt="https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true"
          />

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

            <Button
              animated="vertical"
              color="yellow"
              onClick={() => this.handleAddSongToQueue(obj)}
            >
              <Button.Content hidden>Queue</Button.Content>
              <Button.Content visible>
                <Icon name="add" />
              </Button.Content>
            </Button>
          </Button.Group>

          <Card.Content
            onClick={() => this.handleSongInfo(obj)}
            className="music-card-content"
          >
            <Card.Header className="music-card-name">{obj.name}</Card.Header>
          </Card.Content>
          <Card.Content className="music-card-artist" extra>
            {obj.artist}
          </Card.Content>
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
          <h1 className="home-page-h1-left">CHILL </h1>
          <Slider {...settings}>
            {this.state.listSongTypePop.map((object, idx) =>
              CardExampleImageCard(object, idx)
            )}
          </Slider>
        </div>

        <div className="home-page-slider">
          <h1 className="home-page-h1-left">DANCE - PARTY </h1>
          <Slider {...settings}>
            {this.state.listSongTypeDance.map((object, idx) =>
              CardExampleImageCard(object, idx)
            )}
          </Slider>
        </div>

        <div className="home-page-slider">
          <h1 className="home-page-h1-left">ROCK </h1>
          <Slider {...settings}>
            {this.state.listSongTypeRock.map((object, idx) =>
              CardExampleImageCard(object, idx)
            )}
          </Slider>
        </div>

        <div className="home-page-slider">
          <h1 className="home-page-h1-left">NEW & HOT </h1>
          <Slider {...settings}>
            {this.state.listSongNew.map((object, idx) =>
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
    hideSongPlayer: () => dispatch(hideSongPlayer()),
    getSongInfo: obj => dispatch(getSongInfo(obj)),
    addSongToQueue: obj => dispatch(addSongToQueue(obj))

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
