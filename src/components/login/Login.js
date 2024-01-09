import React, { useState } from "react";
import "./login.css";
import { Dropdown, Select, Space, notification } from "antd";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../photos/logos.png"

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const dispatch=useDispatch()
  const navigate = useNavigate();
  const onLogin = async (e) => {
    console.log(email, password);
    setIsLoading(true);
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-style">
      <div className="col-lg-8 col-md-7 d-flex col-sm-12 mx-auto border p-5 align-self-center">
      <div className="">
        <img src={Logo} />
      </div>
        <div className="login-form">
          <div className="login-head">
            <h5 className="title text-center mb-5">Login your account</h5>
          </div>
          <form onSubmit={onLogin}>
            <div className="mb-4">
              <label className="mb-1 text-dark">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </div>
            <div className="mb-4">
              <label className="mb-1 text-dark">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center mb-4">
              <button type="submit" className="btn btn-primary btn-block">
                {isLoading ? "Loading..." : "LOGIN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
