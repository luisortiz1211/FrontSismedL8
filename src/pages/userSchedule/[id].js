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
import { Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import withAuth from "@/hocs/withAuth";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ChargeInformation from "@/components/ChargeInformation";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Routes from "@/constants/routes";
import { ScheduleUser } from "@/lib/scheduleuser";
import { useForm, Controller } from "react-hook-form";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const columns = [
  {
    id: "id",
    label: "",
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
    id: "free1",
    label: "",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
  },

  {
    id: "botonSelect",
    label: "",
    minWidth: 50,
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.tertiary.main,
  },
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },

  formControl: {
    minWidth: 300,
    paddingBottom: "15px",
    color: "#414A4F",
    paddingRight: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  mpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(3),
  },
  rightIcon: {
    marginLeft: theme.spacing(2),
  },
}));

const index = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/users/${id}/schedule_users`, fetcher);
  //console.log("Horarios médico", data);
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
    <LayoutSecondary>
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
        <Title>
          <LibraryBooksIcon style={{ color: "#092435", fontSize: 35 }} />
          {"  "}Agenda de médico
        </Title>
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
                        //backgroundColor: column.backgroundColor,
                      }}
                    >
                      {column.label}
                      {column.id === "botonSelect" ? (
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Link
                            href={`/userSchedule/schedulenew/${id}/`}
                            as={`/userSchedule/schedulenew/${id}/`}
                            passHref
                          >
                            <Button
                              variant="outlined"
                              size="medium"
                              style={{
                                background: "#fff",
                              }}
                            >
                              <AddIcon
                                style={{ color: "#092435", border: "5px" }}
                              />
                              Añadir
                            </Button>
                          </Link>
                        </Grid>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const colorLine = row.Schedule_id;
                    //console.log("horario de cada medico", colorLine);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.Schedule_id}
                        style={
                          colorLine % 2 == 0
                            ? { backgroundColor: "#BBF0E8" }
                            : { backgroundColor: "#fff" }
                        }
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id && typeof value === "number"
                                ? column.id(value)
                                : value}{" "}
                              {column.id === "botonSelect" &&
                              column.label == "" ? (
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Grid item>
                                    <Button
                                      variant="outlined"
                                      size="medium"
                                      style={{
                                        background: "#60CCD9",
                                      }}
                                      href={`/userSchedule/scheduleupdate/${row.Schedule_id}`}
                                    >
                                      <BorderColorIcon />
                                    </Button>
                                  </Grid>
                                </Grid>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Usuarios:"
            rowsPerPageOptions={[7, 10, 25]}
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
