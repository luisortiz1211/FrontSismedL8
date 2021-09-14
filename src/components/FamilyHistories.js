import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Loading from "@/components/Loading";

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
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#BBF0E8",
    overflow: "Hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
  },
}));

export default function FamilyHistories({ patientID }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, error } = useSWR(
    `/patients/${patientID}/family_histories`,
    fetcher
  );
  //console.log("emergencyContacts", data);
  if (error) return <div> No se puede mostrar los antecedentes famliares</div>;
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
          <ListItemText primary="Antecedentes familiares" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.data.map((familyHistories) => {
              return (
                <ListItem
                  button
                  className={classes.nested}
                  key={familyHistories.id}
                >
                  <ListItemIcon>
                    <NavigateNextIcon />
                  </ListItemIcon>
                  <ListItemText primary={familyHistories.nameCondition} />
                  <ListItemText primary={familyHistories.yearCondition} />
                  <ListItemText primary={familyHistories.commentCondition} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Container>
  );
}
