import * as types from '../constants/type';

export function getSongInfo(obj) {
  console.log("show song detail", obj);
  return {
    type: types.SONG_INFO,
    _id: obj._id,
    name: obj.name,
    link: obj.link,
    artist: obj.artist,
    avatar: obj.avatar,
    songType: obj.type,
    numLike: obj.numlike,
    numListen: obj.numlisten,
    lyrics: obj.lyrics,
    datePosted: obj.dateposted,
    listCmt: obj.comments
  };
}
