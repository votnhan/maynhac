import * as types from "../constants/type";

const initialState = {
  showPlayer: false
};

export default function uiReducer (state = initialState, action)  {
  switch (action.type) {
    case types.SHOW_SONG_PLAYER:
      return { showPlayer: true };

    case types.HIDE_SONG_PLAYER:
      return { showPlayer: false };

    default:
      return state;
  }
};
