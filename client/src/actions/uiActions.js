import * as types from '../constants/type';

export function showSongPlayer(obj) {
  console.log("show song actions");
  return {
    type: types.SHOW_SONG_PLAYER,
    name: obj.name,
    src: obj.link
  };
}

export function hideSongPlayer() {
  return {
    type: types.HIDE_SONG_PLAYER,
  };
}
