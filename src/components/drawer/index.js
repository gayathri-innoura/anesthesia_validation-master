import { Drawer } from "antd";
import React from "react";

const SideDrawer = ({ open, setOpen, list,selectedId, setSeletedId, setActiveMenu, setSelectedFileName }) => {
  return (
    <Drawer
      title="File Names"
      placement={"left"}
      closable={true}
      onClose={() => {
        setOpen(false);
        setActiveMenu('patient')
    }}
      open={open}
    >
      {list?.map((item) => (
        <p
          className={`btn d-block ${selectedId == item.id ? "btn-outline-primary" : 'btn-primary'}`}
          onClick={() => {setSeletedId(item.id);  setOpen(false); setSelectedFileName(item.name); setActiveMenu('patient')}}
        >
          {item.name}
        </p>
      ))}
    </Drawer>
  );
};

export default SideDrawer;
