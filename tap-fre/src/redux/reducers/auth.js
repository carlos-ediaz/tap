import { USER_STATE_CHANGE } from "../constants";

const initialState = {
  currenUser: null,
  loaded: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currenUser: action.currenUser,
        loaded: action.loaded,
      };
    default:
      return state;
  }
};
