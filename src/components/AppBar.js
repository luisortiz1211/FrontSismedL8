import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  MenuIcon,
  Grid,
} from "@material-ui/core";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { Link as MuiLink } from "@material-ui/core";
import Image from "next/image";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "@/components/Loading";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 30,
    height: 30,
    padding: 5,
    backgroundColor: "#60CCD9",
  },
  colorAvatar: {
    color: "#fff",
    backgroundColor: "#60CCD9",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    display: "none",
    padding: 8,

    maxHeight: 150,
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    "& a img": {
      maxHeight: 45,
      color: "#fffff",
    },
  },
}));
const Appbar = () => {
  const classes = useStyles();
  const { user, logout, login } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{
            backgroundColor: "#092435",
            padding: "5px",
          }}
        >
          <Grid item xs={2} md={6}>
            {" "}
            <Box className={classes.logo} edge="star">
              <Image
                src="/logosismed1.png"
                alt="Sismed"
                width={100}
                height={50}
                color="#fff"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            {user ? (
              <>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar className={classes.avatar}>A</Avatar>
                  </Grid>
                  <Grid item>
                    <MoreVertIcon style={{ color: "#60CCD9" }} />
                  </Grid>

                  <Grid item style={{ paddingRight: "50px" }}>
                    <Typography>{user.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Link href="/login">
                      <Button
                        onClick={handleLogout}
                        color="inherit"
                        edge="end"
                        style={{
                          display: "flex",
                          justifyAlign: "right",
                          color: "#BBF0E8",
                        }}
                      >
                        Cerrar sesión
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid></Grid>
            )}
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};
export default Appbar;
