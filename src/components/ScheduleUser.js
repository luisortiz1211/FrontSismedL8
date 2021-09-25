import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import React from "react";
import useSWR from "swr";

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
    //"-webkit-box-orient": "horizontal",
  },
}));

export default function scheduleUsers({ userID }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, error } = useSWR(`/users/${userID}/schedule_users`, fetcher);
  console.log("Horarios médico", data);
  if (error) return <div> No se puede mostrar los horarios</div>;
  if (!data) return <Loading />;
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
          <ListItemText primary="Horarios de atención" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.data.map((scheduleUser) => {
              return (
                <ListItem
                  button
                  className={classes.nested}
                  key={scheduleUser.id}
                >
                  <ListItemIcon>
                    <NavigateNextIcon />
                  </ListItemIcon>
                  <ListItemText primary={scheduleUser.userDay} />
                  <ListItemText primary={scheduleUser.startTime} />
                  <ListItemText primary={scheduleUser.finishTime} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Container>
  );
}
