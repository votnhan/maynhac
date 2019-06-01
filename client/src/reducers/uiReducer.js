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

      case types.SET_AUDIOLIST:
        console.log("Inside reducer");
        console.log(action);
        return {
          ...state, songQueue: action.songQueue
        }
    case types.PLAY_PLAYLIST:
    var queue = []
    for (var i = 0 ; i < action.listSong.length; ++i) {
      queue.push({
        name: action.listSong[i].name,
        singer: action.listSong[i].artist,
        cover: action.listSong[i].avatar,
        musicSrc: action.listSong[i].link
      })
    }
    return {
      ...state,
      songQueue: queue
    }
    case types.REMOVE_SONG_FROM_QUEUE:
      var queue = [...state.songQueue];
      var index = -1;
      console.log("Start removing");
      for (var i = 0 ; i < queue.length; ++i) {
        console.log(queue[i].name);
        console.log(action.name)
        if (queue[i].name === action.name){
          index = i;
          break;
        }
      }
      if (index !== -1) {
        queue.slice(index, 1);
        return {
          ...state, songQueue: queue
        }
      }

    default:
      return state;
  }
}
