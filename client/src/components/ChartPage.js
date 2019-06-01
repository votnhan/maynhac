import React from "react";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend
} from "recharts";
import HomePageService from "../services/HomePageService";
import "../assets/css/ChartPage.css";
import { Button, Card, Image, Icon, Grid, CardGroup } from "semantic-ui-react";
import * as types from "../constants/type.js";
import history from "../history";
import * as URI from "uri-js";
import { message, Badge } from "antd";
import SongService from "../services/SongService";
import {
  showSongPlayer,
  hideSongPlayer,
  addSongToQueue
} from "../actions/uiActions";
import { connect } from "react-redux";
import { getSongInfo } from "../actions/getSongInfoAction";
import ListChart100song from "./ListChart100song";
import "../assets/css/ListSong.css";
import "../assets/css/Recommend.css";

class ChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      dataforchart: []
    };
    this.timetogetData = 3600000;
    this.hours = 24;
    this.getData();
    setInterval(this.getData, this.timetogetData);
  }
  getIteminChart(i, songs) {
    var item = {};
    songs.forEach(element => {
      item[element.name] = element.listentimein24h[i];
    });
    // console.log("item", item)
    item.name = i.toString();
    return item;
  }
  getData() {
    HomePageService.handleGetManySong(100, songs => {
      var result = [];
      for (let i = 0; i < this.hours; ++i) {
        result.push(this.getIteminChart(i, songs));
      }
      this.setState({ songs, dataforchart: result });
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

  handleAddSongToQueue(obj) {
    console.log("obj", obj);
    const song = {
      name: obj.name,
      singer: obj.artist,
      cover: obj.avatar,
      musicSrc: obj.link
    };
    this.props.addSongToQueue(song);
    message.success('"' + song.name + '" is Added to now playing');
  }
  render() {
    console.log(this.state);
    let top3Song = this.state.songs.slice(0, 3);
    var top100 = [];
    console.log("top3", top3Song);
    if (this.state.songs) {
      for (var i = 0; i < this.state.songs.length; ++i) {
        var { artist, avatar, link, name, _id, numlisten } = this.state.songs[i];
        var item = (
          
            <ListChart100song
              key={_id}
              name={name}
              _id={_id}
              avatar={avatar}
              artist={artist}
              link={link}
              rank={i+1}
              numlisten={numlisten}
            />
          
        );
        top100.push(item);
      }
    }

    let styleBadge = [
      { backgroundColor: "#f50" },
      { backgroundColor: "#52c41a" },
      { backgroundColor: "#108ee9" }
    ];
    const CardExampleImageCard = (obj, i) => (
      <div key={i} className="music-card-div margin-custom">
        <Badge count={"TOP " + (i + 1).toString()} style={styleBadge[i]}>
          <span className="head-example" />
        </Badge>
        <Card className="music-card-wrapper">
          <Image
            size="tiny"
            className="music-card-img"
            src={obj.avatar}
            alt="."
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

    return (
      <div className="chart-page-chart-wrapper">
        <Grid>
          <Grid.Column width={8}>
            <Grid.Row>
              <div>
                <h1>Bảng xếp hạng lượt nghe nhiều nhất</h1>
              </div>
            </Grid.Row>
            <Grid.Row>
              <LineChart
                width={800}
                height={300}
                data={this.state.dataforchart}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey={top3Song[0] ? top3Song[0].name : ""}
                  stroke="#f50"
                />
                <Line
                  type="monotone"
                  dataKey={top3Song[1] ? top3Song[1].name : ""}
                  stroke="#52c41a"
                />
                <Line
                  type="monotone"
                  dataKey={top3Song[2] ? top3Song[2].name : ""}
                  stroke="#108ee9"
                />
              </LineChart>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width={8}>
            <Grid.Row>
              <CardGroup itemsPerRow={3}>
                {top3Song.map((top3Song, idx) =>
                  CardExampleImageCard(top3Song, idx)
                )}
              </CardGroup>
            </Grid.Row>
          </Grid.Column>

          <Grid.Row />

          <Grid.Row>
              <Grid.Column>
                  {top100}
              </Grid.Column>
          
          </Grid.Row>
        </Grid>
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
)(ChartPage);
