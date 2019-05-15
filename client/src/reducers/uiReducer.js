import * as types from "../constants/type";

const initialState = {
  showPlayer: false,
  nowPlayingName: "",
  nowPlayingLink: "",
  nowPlayingArtist: "",
  nowPlayingAvatar: "",
  songQueue: [],
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SONG_PLAYER:
      return {
        ...state,
        showPlayer: true,
        nowPlayingName: action.name,
        nowPlayingLink: action.link,
        nowPlayingArtist: action.artist,
        nowPlayingAvatar: action.avatar,
        songQueue: [{
          name: action.name,
          singer: action.artist,
          cover: action.avatar,
          musicSrc: action.link
        }]
      };
    case types.HIDE_SONG_PLAYER:
      return { ...state,showPlayer: false, songQueue: [] }; 
    case types.PLAY_SONG:
      return {
        ...state,
        showPlayer: true,
        nowPlayingName: action.payload.name,
        nowPlayingLink: action.payload.link,
        nowPlayingArtist: action.payload.artist,
        nowPlayingAvatar: action.payload.avatar,
      }
    case types.ADD_SONG_TO_QUEUE:
    console.log("state.songqueue", state.songQueue);
    console.log("action in reducer", action);
      return {
        ...state, songQueue: [...state.songQueue, action.songToAdd]
      }
    default:
      return state;
  }
}
