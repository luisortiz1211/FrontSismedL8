import { Link as Multilink } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import React from "react";

export default function NavbarSecondary() {
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
        Opciones del paciente
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/">
            <Multilink>
              <MenuItem>Inicio</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/personalHistory">
            <Multilink>
              <MenuItem>Antecedentes medicos</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/emergencyContact">
            <Multilink>
              <MenuItem>Contacos de emergencia</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/drugAllergies">
            <Multilink>
              <MenuItem>Alergias del paciente</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/physicalExam">
            <Multilink>
              <MenuItem>Examen fisico del paciente</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/explorationPatient">
            <Multilink>
              <MenuItem>Exploración del paciente</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/drugsRecipie">
            <Multilink>
              <MenuItem> Receta de medicamentos</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link href="/imagesRecipie">
            <Multilink>
              <MenuItem>Pedidos de imagen</MenuItem>
            </Multilink>
          </Link>
        </MenuItem>
      </Menu>
      <style jsx>
        {`
          Link {
            padding: 0 50px;
          }
        `}
      </style>
    </>
  );
}
