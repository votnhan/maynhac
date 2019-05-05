import * as types from '../constants/type';

export function showSongPlayer() {
  console.log("show song actions");
  return {
    type: types.SHOW_SONG_PLAYER,
  };
}

export function hideSongPlayer() {
  return {
    type: types.HIDE_SONG_PLAYER,
  };
}
