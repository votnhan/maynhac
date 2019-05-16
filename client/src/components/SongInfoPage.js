import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Grid, Icon, Button, Header, Form } from "semantic-ui-react";
import "../assets/css/songInfoPage.css";
import "../assets/css/MusicCard.css";
import * as URI from "uri-js";
import { showSongPlayer, addSongToQueue } from "../actions/uiActions";
import CommentPart from "./Comment";
import RecommendPart from "./Recommend";
import SongService from "../services/SongService";
import { message } from 'antd';
import ReportModal from "./report/ReportModal";

class SongInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: null,
      numLike: 0,
      numListen: 0,
      listCmt: [],
      reportOpen: false
    };
    SongService.handleGetStatusOfSongForUser(
      {
        songId: this.props._id
      },
      res => {
        console.log("firstload", res);
        this.setState({
          like: res.status
        });
      }
    );
    SongService.handleGetSongbyId(this.props._id, res => {
      console.log("return res", res);
      this.setState({
        numLike: res.data.numlike,
        numListen: res.data.numlisten + 1
      });
    });
    console.log("construct state", this.state);
    message.info(this.props.name);
    console.log(this.props);
    this.closeReport = this.closeReport.bind(this);
  }

  handlePlaySong(obj) {
    const newObj = {
      ...obj,
      link: URI.serialize(URI.parse(obj.link))
    };
    this.props.showSongPlayer(newObj);
    message.success("Now playing \" "+ obj.name + "\"");
  }

  handleLikeSong(obj) {
    if (this.state.like) {
      this.setState({
        like: false,
        numLike: this.state.numLike - 1
      });
    } else {
      this.setState({
        like: true,
        numLike: this.state.numLike + 1
      });
    }

    const data = {
      songId: this.props._id
    };
    SongService.handleReaction(data, res => {
      console.log("like this", res);
    });
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

  closeReport(e) {
    this.setState({reportOpen: false}, () => {console.log(this.state.reportOpen)});
  }

  render() {
    return (
      <div>
        <ReportModal isOpen={this.state.reportOpen} onClose={this.closeReport}/>
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
                      
                      {this.state.like ? "Liked" : "Like"}
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
                  <Button
                    animated="vertical"
                    color="yellow"
                    onClick={() => this.handleAddSongToQueue(this.props)}

                  >
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
                    <Icon name="headphones" /> {this.state.numListen}
                  </span>
                  <Button onClick={e => this.setState({reportOpen: true})} animated="vertical" color="black">
                    <Button.Content hidden> Report! </Button.Content>
                    
                    <Button.Content visible>
                      <Icon name="flag" />
                    </Button.Content>
                  </Button>
                </div>
              </div>
              <CommentPart comments={this.props.listCmt}/>
            </Grid.Column>
            <Grid.Column width={6}>
              <RecommendPart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {window.scrollTo({ top: 0, behavior: 'smooth' })}
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
    showSongPlayer: obj => dispatch(showSongPlayer(obj)),
    addSongToQueue: obj => dispatch(addSongToQueue(obj))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongInfoPage);
