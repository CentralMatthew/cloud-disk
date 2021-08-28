import {combineReducers} from "redux";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";

export const rootReducers = combineReducers({
    user: userReducer,
    files: fileReducer
})
