import axios from "axios";
import { logOut, setUsers } from "../redux/actionCreators";

export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/registration",
      {
        email,
        password,
      }
    );
    alert(response.data.message);
  } catch (e) {
    alert(e);
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      dispatch(setUsers(response.data.user));
      localStorage.setItem("access_token", response.data.access_token);
    } catch (e) {
      alert(e);
    }
  };
};

export const auth = () => {
  return async dispatch => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/auth", {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });
      dispatch(setUsers(response.data.user));
      localStorage.setItem("access_token", response.data.access_token);
    } catch (e) {
      alert(e.response.message);
      localStorage.removeItem('access_token')
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const asw = localStorage.getItem("access_token");
      console.log(asw);
      const response = await axios.post(
        `http://localhost:5000/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      dispatch(logOut());
      localStorage.removeItem("access_token");
    } catch (e) {
      alert(e);
    }
  };
};
