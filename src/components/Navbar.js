import { Link as Multilink } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/">
            <Multilink>
              <MenuItem>Volver al inicio</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/userSchedule">
            <Multilink>
              <MenuItem>Horarios de medico/asistente</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/scheduleDay">
            <Multilink>
              <MenuItem>Citas</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/patients">
            <Multilink>
              <MenuItem>Pacientes</MenuItem>{" "}
            </Multilink>
          </Link>
        </MenuItem>
      </Menu>
      <style jsx>
        {`
          Link {
            padding: 0 50px;
          }
          @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap");
        `}
      </style>
    </>
  );
}
