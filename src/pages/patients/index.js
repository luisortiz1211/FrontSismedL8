import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { fetcher } from "@/lib/utils";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import AnnounTitle from "@/components/AnnounTitle";
import { fontSize } from "@mui/system";

const columns = [
  {
    id: "patient_id",
    label: "N°",
    minWidth: 5,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "name",
    label: "Nombres",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "lastName",
    label: "Apellidos",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "sex",
    label: "Sexo",
    minWidth: 60,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "civilStatus",
    label: "Estado",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 80,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "movil",
    label: "Movil",
    minWidth: 80,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },

  {
    id: "address",
    label: "Dirección",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "botonSelect",
    label: "",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
];
const useStyles = makeStyles({
  root: {
    height: "auto",
  },
  container: {
    maxHeight: 440,
  },

  button: {
    fontSize: "10px",
  },
});

const index = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/patients`, fetcher);
  console.log("lista de pacientes", data);
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
      <Container maxWidth="lg">
        <Title>
          <PeopleOutlineIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />{" "}
          {"  "} Historial de pacientes
        </Title>
        <Paper
          elevation={6}
          style={{ margin: "20px" }}
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <AnnounTitle>
            Buscar si el paciente existe en la base y agendar
          </AnnounTitle>

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
                        fontSize: column.fontSize,
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
                            href={`/patients/patientsnew/`}
                            as={`/patients/patientsnew/`}
                            passHref
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              style={{
                                background: "#ffff",
                                color: "#092435",
                              }}
                            >
                              <AddIcon
                                style={{ color: "#092435", border: "3px" }}
                              />
                              Nuevo paciente
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
                    const colorLine = row.patient_id;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-2}
                        key={row.patient_id}
                        style={
                          colorLine % 2 == 0
                            ? { backgroundColor: "#BBF0E8" }
                            : { backgroundColor: "#fff" }
                        }
                      >
                        {" "}
                        <>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id && typeof value === "number"
                                  ? column.id === "sex"
                                    ? row.sex === 1
                                      ? "Masculino"
                                      : "Femenino"
                                    : value
                                  : value && column.id === "civilStatus"
                                  ? row.civilStatus === "1"
                                    ? "Soltero"
                                    : row.civilStatus === "2"
                                    ? "Casado"
                                    : row.civilStatus === "3"
                                    ? "Divordiado"
                                    : row.civilStatus === "4"
                                    ? "Unión libre"
                                    : "Montepio"
                                  : value}

                                {column.id === "botonSelect" &&
                                column.label == "" ? (
                                  <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Grid item>
                                      <Link
                                        href={`/patients/${row.patient_id}`}
                                        as={`/patients/${row.patient_id}`}
                                        key={row.patient_id}
                                        passHref
                                      >
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          style={{
                                            background: "#60CCD9",
                                          }}
                                          endIcon={<SendIcon />}
                                        >
                                          Agendar
                                        </Button>
                                      </Link>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            );
                          })}
                        </>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={data.meta.total}
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
