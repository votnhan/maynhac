import * as types from '../constants/type';

export function showSongPlayer(obj) {
  console.log("show song actions");
  return {
    type: types.SHOW_SONG_PLAYER,
    name: obj.name,
    link: obj.link,
    artist: obj.artist,
    avatar: obj.avatar,

  };
}

export function hideSongPlayer() {
  return {
    type: types.HIDE_SONG_PLAYER,
  };
}

export function addSongToQueue(obj) {
  console.log("action obj", obj)
  return {
    type: types.ADD_SONG_TO_QUEUE,
    songToAdd: obj,
  };
}