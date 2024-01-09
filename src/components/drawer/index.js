import { Drawer } from "antd";
import React from "react";

const SideDrawer = ({ open, setOpen, list, setSeletedId }) => {
  return (
    <Drawer
      title="File Names"
      placement={"left"}
      closable={true}
      onClose={() => setOpen(false)}
      open={open}
    >
      {list?.map((item) => (
        <p
          className="btn d-block btn-primary"
          onClick={() => setSeletedId(item.id)}
        >
          {item.name}
        </p>
      ))}
    </Drawer>
  );
};

export default SideDrawer;
