import * as types from '../constants/type';

export function showSongPlayer(name, link, artist) {
  console.log("show song actions");
  return {
    type: types.SHOW_SONG_PLAYER,
    name,
    link,
    artist,
  };
}

export function hideSongPlayer() {
  return {
    type: types.HIDE_SONG_PLAYER,
  };
}
