import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

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

import React, { useState } from "react";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import { CssBaseline, Link as Muilink } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import withAuth from "@/hocs/withAuth";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ChargeInformation from "@/components/ChargeInformation";
import ScheduleUser from "@/components/ScheduleUser";

const columns = [
  {
    id: "id",
    label: "N°",
    minWidth: 10,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
  {
    id: "userDay",
    label: "Día",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
  {
    id: "startTime",
    label: "Hora inicio",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
  {
    id: "finishTime",
    label: "Hora fin",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
  },

  {
    id: "botonSelect",
    label: "",
    minWidth: 200,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  container: {
    minHeight: 440,
  },

  button: {
    fontSize: "10px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const index = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, error } = useSWR(`/users/${id}/schedule_users`, fetcher);
  console.log("Horarios médico", data);
  if (error)
    return (
      <div>
        <ChargeInformation />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    /*<Container>
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
    </Container>*/

    <LayoutSecondary>
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
        <Title>Horario de médico</Title>
        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: column.backgroundColor,
                        fontWeight: 400,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const colorLine = row.id;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        style={
                          colorLine % 2 == 0
                            ? { backgroundColor: "#BBF0E8" }
                            : { backgroundColor: "" }
                        }
                      >
                        {columns.map((array) => {
                          const value = row[array.id];

                          <TableCell key={array.id} align={array.align}>
                            {array.id}
                            {array.label == "" ? (
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Button
                                    variant="outlined"
                                    size="medium"
                                    style={{
                                      background: "#60CCD9",
                                    }}
                                  >
                                    <Link
                                      href={`/userSchedule/${row.id}`}
                                      as={`/userSchedule/${row.id}`}
                                      key={row.id}
                                      passHref
                                    >
                                      <BorderColorIcon />
                                    </Link>
                                  </Button>
                                </Grid>
                              </Grid>
                            ) : (
                              ""
                            )}
                          </TableCell>;
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Usuarios:"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={columns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default index;
