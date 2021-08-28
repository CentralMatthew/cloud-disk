import React, { useState } from "react";
import Input from "../../utils/input/Input";
import { login } from "../../actions/user";
import Label from "../../utils/label/Label";
import { useDispatch } from "react-redux";

const Authorization = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-5"
        >
          <Label value={"Email"} />
          <Input
            value={email}
            setValue={setEmail}
            type="text"
            placholder="Your login"
          />
          <Label value={"Password"} />
          <Input
            value={password}
            setValue={setPassword}
            type="password"
            placholder="Your password"
          />
          <button
            className="block w-full bg-green-400 hover:bg-green-600 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
            onClick={() => dispatch(login(email, password))}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authorization;
