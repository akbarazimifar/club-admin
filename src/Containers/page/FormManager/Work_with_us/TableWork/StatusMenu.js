import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function StatusMenu({ handel_show_alert, item }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handelclick = (event) => {
    setAnchorEl(event.currentTarget);
};

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelsubmit = (type, data) => {
    handel_show_alert(type, data);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        style={{ marginRight: 5,fontSize:12,fontWeight:'bold' }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handelclick}
        className="btnsGreen"
      >
        تغییر وضعیت{" "}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handelsubmit("SUBMITTED", item)}>
          بررسی نشده
        </MenuItem>
        <MenuItem onClick={() => handelsubmit("FINALIZED", item)}>
          بررسی شده{" "}
        </MenuItem>
        <MenuItem onClick={() => handelsubmit("REJECTED", item)}>
          رد شده{" "}
        </MenuItem>
      </Menu>
    </>
  );
}
