import * as types from "../constants/type";

const initialState = {
  songName: "",
  songLink: "",
  songArtist: "",
  songAvatar: "",
  numLike: 0,
  numListen: 0,
  songType: "",
  lyrics: "",
  datePosted: "",
};

export default function songInfo(state = initialState, action) {
  switch (action.type) {
    case types.SONG_INFO:
    console.log("obj in reducer ", action)
      return {
        songName: action.name,
        songLink: action.link,
        songArtist: action.artist,
        songAvatar: action.avatar,
        numLike: action.numLike,
        numListen: action.numListen,
        songType: action.songType,
        lyrics: action.lyrics,
        datePosted: action.datePosted
      };

    default:
      return state;
  }
}
