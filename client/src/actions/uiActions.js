import * as types from '../constants/type';

export function showSongPlayer(name) {
  console.log("show song actions");
  return {
    type: types.SHOW_SONG_PLAYER,
    name
  };
}

export function hideSongPlayer() {
  return {
    type: types.HIDE_SONG_PLAYER,
  };
}
