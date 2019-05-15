import React from "react";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import "../assets/css/Recommend.css";
import "../assets/css/MusicCard.css";
import HomePageService from "../services/HomePageService";
import { Card, Icon, Image, Button, CardGroup } from "semantic-ui-react";
import { showSongPlayer, hideSongPlayer, addSongToQueue } from "../actions/uiActions";
import { connect } from "react-redux";
import Slider from "react-slick";
import history from "../history";
import { getSongInfo } from "../actions/getSongInfoAction";
import * as URI from "uri-js";
import SongService from "../services/SongService";
import { message } from 'antd';

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

class RecommendPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSong: 30,
      listSongTypePop: [],
      listSongTypeDance: [],
      listSongTypeFolk: [],
      listSongTypeRock: [],
      listSongNew: []
    };
    HomePageService.handleGetKSongByTypeID(12, 3, res => {
      this.setState({ listSongTypePop: res.songs });
    });
  }

  handlePlaySong(obj) {
    const newObj = { ...obj, link: URI.serialize(URI.parse(obj.link)) };
    this.props.showSongPlayer(newObj);
  }

  handleSongInfo(obj) {
    SongService.handleGetSongbyId(obj._id, res => {
      console.log("newObj_id ", res.data);

      this.props.getSongInfo(res.data);
    });

    history.push(`/info/${obj.name}`);
    console.log(history);
  }

  handleAddSongToQueue(obj){
    console.log("obj", obj)
    const song = {
      name: obj.name,
      singer: obj.artist,
      cover: obj.avatar,
      musicSrc: obj.link

    };
    this.props.addSongToQueue(song)
    message.success("\"" + song.name +  "\" is Added to now playing");
  }

  render() {
    const CardExampleImageCard = (obj, i) => (
      <div key={i} className="music-card-div">
        <Card className="music-card-wrapper">
          <Image
            className="music-card-img"
            src={obj.avatar}
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
      slidesToShow: 3,
      slidesToScroll: 2,
      initialSlide: 0,
      nextArrow: <SamplePrevArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div className="home-page-carousel">
        <div className="recommend-slider">
          <h1 className="home-page-h1-left">Related tracks </h1>
          <CardGroup>
            {this.state.listSongTypePop.map((object, idx) =>
              CardExampleImageCard(object, idx)
            )}
          </CardGroup>
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
)(RecommendPart);
