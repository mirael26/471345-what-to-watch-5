import {extend} from "../../../utils";
import {ActionType} from "../../../store/action";

const DEFAULT_GENRE = `All genres`;

const initialState = {
  genre: DEFAULT_GENRE,
  playerTime: 0,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      const newGenre = action.payload;
      if (newGenre === state.genre) {
        return state;
      }
      return extend(state, {
        genre: newGenre
      });
    case ActionType.SET_PLAYER_TIME:
      return extend(state, {
        playerTime: action.payload,
      });
    default:
      return state;
  }
};

export {stateReducer};
