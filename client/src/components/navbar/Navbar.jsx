import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logOut} from "../../redux/actionCreators";
import {logout} from "../../actions/user";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-3">
        <div className="flex items-center">
          <div className="mr-8 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
          </div>
          <div className="font-bold cursor-pointer">CLOUD MATVIK</div>
        </div>
        <div className="flex items-center">
          {!isAuth && (
            <div className="cursor-pointer mr-8">
              <Link to="/login">Login</Link>
            </div>
          )}
          {!isAuth && (
            <div className="cursor-pointer bg-blue-400 hover:bg-blue-600 rounded py-2 px-3 transition duration-300">
              <Link to="/registration">Registration</Link>
            </div>
          )}
          {isAuth && (
            <div
              className="cursor-pointer bg-blue-400 hover:bg-blue-600 rounded py-2 px-3 transition duration-300"
              onClick={() => dispatch(logout())}
            >
              LogOut
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
