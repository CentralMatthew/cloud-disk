import {LOGOUT, SET_USERS} from "../actionTypes";

export const setUsers = user => ({type: SET_USERS, payload: user});
export const logOut = () => ({type: LOGOUT});
