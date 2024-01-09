import React from "react";
import image from "../../photos/pic.png";
import Logo from "../../photos/logos.png"
import "./style.css";
import { useNavigate } from "react-router-dom";

const NewHeader = ({ setActiveMenu, activeMenu, setOpen }) => {
  const navigate = useNavigate();
  const onLogOut = () => {
    navigate("/login");
  };
  return (
    <div className="d-flex justify-content-between mb-3 p-2 headers">
      <div
        className="d-flex"
        style={{
          cursor: "pointer",
        }}
      >
       <img src={Logo} width={125}></img>
      </div>
      <div className="d-flex header-list">
        <li onClick={() => setActiveMenu('patient')} className={activeMenu == "patient" ? 'active' : ''}>Patient Details</li>
        <li onClick={() => {setActiveMenu('file'); setOpen(true)}} className={activeMenu == "file" ? 'active' : ''}>File List</li>
      </div>
      <div className="d-flex p-1 logout" onClick={onLogOut}>
        <img src={image} alt="Avatar" className="img1" />
        <div className="px-2" >
            <p className="p-0 m-0">Welcome Jack!</p>
            <p className="p-0 m-0">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default NewHeader;
