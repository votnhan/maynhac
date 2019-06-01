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

export function setAudioList(audioList) {
  return {
    type: types.SET_AUDIOLIST,
    songQueue: audioList
  }
}

export function removeSong(songName) {
  return {
    type: types.REMOVE_SONG_FROM_QUEUE,
    name: songName
  }
}

export function addSongToQueue(obj) {
  console.log("action obj", obj)
  return {
    type: types.ADD_SONG_TO_QUEUE,
    songToAdd: obj,
  };
}

export function playPlaylist(obj) {
  return {
    type: types.PLAY_PLAYLIST,
    listSong: obj
  }
}