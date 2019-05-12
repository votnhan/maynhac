import * as types from "../constants/type";

const initialState = {
  _id:"",
  songName: "",
  songLink: "",
  songArtist: "",
  songAvatar: "",
  numLike: 0,
  numListen: 0,
  songType: "",
  lyrics: "",
  datePosted: "",
  listCmt: []
};

export default function songInfo(state = initialState, action) {
  switch (action.type) {
    case types.SONG_INFO:
    console.log("obj in reducer ", action)
      return {
        _id: action._id,
        songName: action.name,
        songLink: action.link,
        songArtist: action.artist,
        songAvatar: action.avatar,
        numLike: action.numLike,
        numListen: action.numListen,
        songType: action.songType,
        lyrics: action.lyrics,
        datePosted: action.datePosted,
        listCmt: action.listCmt
      };

    default:
      return state;
  }
}
