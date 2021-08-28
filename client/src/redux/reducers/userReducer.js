import { LOGOUT, SET_USERS } from "../actionTypes";

const defaultState = {
  currentUser: {},
  isAuth: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        currentUser: action.payload.user,
        isAuth: true,
      };
    case LOGOUT:
        localStorage.removeItem('access_token')
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };
    default:
      return state;
  }
}
