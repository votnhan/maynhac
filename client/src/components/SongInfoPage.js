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
  Container
} from "semantic-ui-react";
import "../assets/css/songInfoPage.css";
import * as URI from "uri-js";
import { showSongPlayer, hideSongPlayer } from "../actions/uiActions";

class SongInfoPage extends React.Component {
  handlePlaySong(obj) {
    const newObj = { ...obj, link: URI.serialize(URI.parse(obj.link)) };
    this.props.showSongPlayer(newObj);
  }

  render() {
    console.log("info props", this.props);
    return (
      <div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src={this.props.avatar} />
              <Grid.Row className="info-center" centered>
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
              </Grid.Row>
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
                <Icon name="like" />
                {this.props.numLike}
              </Grid.Row>
              <Grid.Row>
                <Icon name="headphones" />
                {this.props.numListen}
              </Grid.Row>

              <Grid.Row>
                <Icon name="paragraph" />
                {this.props.lyrics}
              </Grid.Row>

              
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
    showSongPlayer: obj => dispatch(showSongPlayer(obj)),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongInfoPage);
