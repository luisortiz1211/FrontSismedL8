import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import Loading from "@/components/Loading";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: theme.palette.background.primary,
    color: "#092435",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function EmergencyContacts({ patientID }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, error } = useSWR(
    `/patients/${patientID}/emergency_contacts`,
    fetcher
  );
  //console.log("emergencyContacts", data);
  if (error) return <div> No se puede mostrar los contactos del paciente</div>;
  if (!data) return <Loading />;
  // render data
  return (
    <Container>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <PermContactCalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Contactos de emergencia" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.data.map((contact) => {
              return (
                <ListItem button className={classes.nested}  key={contact.id}>
                  <ListItemIcon>
                    <NavigateNextIcon />
                  </ListItemIcon>
                  <ListItemText primary={contact.nameContact} />
                  <ListItemText primary={contact.movil} />
                  <ListItemText primary={contact.landline} />
                  <ListItemText primary={contact.relationShip} />
                  <ListItemText primary={contact.bloodType} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Container>
  );
}
