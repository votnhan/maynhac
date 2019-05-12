import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Image,
  Grid,
  Segment,
  Icon,
  Label,
  Button,
  Header,
  Item,
  Container,
  Divider
} from "semantic-ui-react";
import "../assets/css/songInfoPage.css";
import "../assets/css/MusicCard.css";
import * as URI from "uri-js";
import { showSongPlayer } from "../actions/uiActions";
import CommentPart from "./Comment";
import RecommendPart from "./Recommend";
class SongInfoPage extends React.Component {
  handlePlaySong(obj) {
    const newObj = { ...obj, link: URI.serialize(URI.parse(obj.link)) };
    this.props.showSongPlayer(newObj);
  }

  handleLikeSong(obj) {
    console.log("like this", obj._id);
  }

  render() {
    console.log("info props", this.props);
    return (
      <div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4} className="music-card-div">
              <div className="music-card-wrapper info-cover">
                <Image src={this.props.avatar} className="music-card-img" />
                {/* <Grid.Row className="info-center" centered> */}
                <Button.Group className="music-card-button" size="large">
                  <Button
                    animated="vertical"
                    color="orange"
                    onClick={() => this.handlePlaySong(this.props)}
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
              </div>
            </Grid.Column>

            <Grid.Column width={12} className="info-right-col">
              <Grid.Row>
                <Header
                  content={this.props.name}
                  textAlign="left"
                  size="huge"
                />
              </Grid.Row>
              <Grid.Row>
                <h3 className="info-h3">{this.props.artist}</h3>
              </Grid.Row>

              <Grid.Row>
                <Icon name="align center" />
                {this.props.lyrics}
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={10}>
              <div className="info-like-share-report">
                <div>
                  <Button
                    animated="vertical"
                    color="red"
                    onClick={() => this.handleLikeSong(this.props)}
                  >
                    <Button.Content hidden>Like </Button.Content>
                    <Button.Content visible>
                      <Icon name="like" />
                    </Button.Content>
                  </Button>

                  <Button animated="vertical" color="green">
                    <Button.Content hidden>Share</Button.Content>
                    <Button.Content visible>
                      <Icon name="share" />
                    </Button.Content>
                  </Button>

                  <Button animated="vertical" color="olive">
                    <Button.Content hidden>Lyrics</Button.Content>
                    <Button.Content visible>
                      <Icon name="edit outline" />
                    </Button.Content>
                  </Button>
                </div>
                <div>
                  <span className="info-like-listen">
                    <Icon name="like" />
                    {this.props.numLike}
                  </span>
                  <span className="info-like-listen">
                    <Icon name="headphones" />
                    {this.props.numListen}
                  </span>

                  <Button animated="vertical" color="black">
                    <Button.Content hidden>Report!</Button.Content>
                    <Button.Content visible>
                      <Icon name="flag" />
                    </Button.Content>
                  </Button>
                </div>
              </div>
              <CommentPart />
            </Grid.Column>

            <Grid.Column width={6}>
              <RecommendPart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.songInfo.songName,
    link: state.songInfo.songLink,
    artist: state.songInfo.songArtist,
    avatar: state.songInfo.songAvatar,
    numLike: state.songInfo.numLike,
    numListen: state.songInfo.numListen,
    songType: state.songInfo.songType,
    lyrics: state.songInfo.lyrics,
    datePosted: state.songInfo.datePosted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSongPlayer: obj => dispatch(showSongPlayer(obj))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongInfoPage);