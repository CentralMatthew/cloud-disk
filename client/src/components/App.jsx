import Navbar from "./navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registration from "./registration/Registration";
import Authorization from "./login/Authorization";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {auth} from "../actions/user";
function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(()=> {
      dispatch(auth());
  }, [])
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {!isAuth && (
          <Switch>
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Authorization} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
