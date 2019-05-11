import * as types from "../constants/type";

const initialState = {
  showPlayer: false,
  nowPlayingName: "",
  nowPlayingLink: "",
  nowPlayingArtist: "",
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SONG_PLAYER:
      return {
        showPlayer: true,
        nowPlayingName: action.name,
        nowPlayingLink: action.link,
        nowPlayingArtist: action.artist,
        nowPlayingAvatar: action.avatar,
      };
    case types.HIDE_SONG_PLAYER:
      return { showPlayer: false }; 
    case types.PLAY_SONG:
      return {
        showPlayer: true,
        nowPlayingName: action.payload.name,
        nowPlayingLink: action.payload.link,
        nowPlayingArtist: action.payload.artist,
        nowPlayingAvatar: action.payload.avatar,
      }
    default:
      return state;
  }
}
