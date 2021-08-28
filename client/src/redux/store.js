import {applyMiddleware, createStore} from "redux";
import { rootReducers } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
