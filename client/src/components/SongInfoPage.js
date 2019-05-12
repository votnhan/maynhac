import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Grid, Icon, Button, Header, Form } from "semantic-ui-react";
import "../assets/css/songInfoPage.css";
import "../assets/css/MusicCard.css";
import * as URI from "uri-js";
import { showSongPlayer } from "../actions/uiActions";
import CommentPart from "./Comment";
import RecommendPart from "./Recommend";
import SongService from "../services/SongService";

class SongInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      numLike: this.props.numLike,
      listCmt: []
    };
  }
  handlePlaySong(obj) {
    const newObj = {
      ...obj,
      link: URI.serialize(URI.parse(obj.link))
    };
    this.props.showSongPlayer(newObj);
  }

  handleLikeSong(obj) {
    if (this.state.like) {
      this.setState({
        like: !this.state.like,
        numLike: this.state.numLike - 1
      });
    } else {
      this.setState({
        like: !this.state.like,
        numLike: this.state.numLike + 1
      });
    }

    console.log("obj-id", this.props._id);
    const data = {
      songId: this.props._id
    };
    SongService.handleReaction(data, res => {
      console.log("like this", res);
    });
  }

  render() {
    console.log("info props", this.props);
    return (
      <div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4} className="music-card-div">
              <Image src={this.props.avatar} className="music-card-img" />
            </Grid.Column>
            <Grid.Column width={12} className="info-right-col">
              <Grid.Row>
                <Grid.Column width={1}>
                  <Button
                    circular
                    size="huge"
                    color="orange"
                    icon="play"
                    onClick={() => this.handlePlaySong(this.props)}
                  />
                </Grid.Column>
                <Grid.Column width={15}>
                  <Header
                    content={this.props.name}
                    textAlign="left"
                    size="huge"
                    className="info-name"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <h3 className="info-h3"> {this.props.artist} </h3>
              </Grid.Row>
              <Grid.Row>
                <div className="info-null-div" />
              </Grid.Row>
              <Grid.Row>
                <h4> Lyric: </h4> <div> {this.props.lyrics} </div>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <div className="info-like-share-report">
                <div>
                  <Button
                    animated="vertical"
                    color={this.state.like ? "red" : "grey"}
                    onClick={() => this.handleLikeSong(this.props)}
                  >
                    <Button.Content hidden>
                      {this.state.like ? "Unlike" : "Like"}
                    </Button.Content>
                    <Button.Content visible>
                      <Icon name="like" />
                    </Button.Content>
                  </Button>
                  <Button animated="vertical" color="green">
                    <Button.Content hidden> Share </Button.Content>
                    <Button.Content visible>
                      <Icon name="share" />
                    </Button.Content>
                  </Button>
                  <Button animated="vertical" color="olive">
                    <Button.Content hidden> Lyrics </Button.Content>
                    <Button.Content visible>
                      <Icon name="edit outline" />
                    </Button.Content>
                  </Button>
                  <Button animated="vertical" color="yellow">
                    <Button.Content hidden> Queue </Button.Content>
                    <Button.Content visible>
                      <Icon name="add" />
                    </Button.Content>
                  </Button>
                </div>
                <div>
                  <span className="info-like-listen">
                    <Icon name="like" /> {this.state.numLike}
                  </span>
                  <span className="info-like-listen">
                    <Icon name="headphones" /> {this.props.numListen}
                  </span>
                  <Button animated="vertical" color="black">
                    <Button.Content hidden> Report! </Button.Content>
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
    _id: state.songInfo._id,
    name: state.songInfo.songName,
    link: state.songInfo.songLink,
    artist: state.songInfo.songArtist,
    avatar: state.songInfo.songAvatar,
    numLike: state.songInfo.numLike,
    numListen: state.songInfo.numListen,
    songType: state.songInfo.songType,
    lyrics: state.songInfo.lyrics,
    datePosted: state.songInfo.datePosted,
    listCmt: state.songInfo.listCmt
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
