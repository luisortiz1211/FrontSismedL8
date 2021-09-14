import React, { useState } from "react";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import Container from "@material-ui/core/Container";
import Link from "next/link";
import { Link as Muilink } from "@material-ui/core";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Loading from "@/components/Loading";

import { makeStyles } from "@material-ui/core/styles";
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
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ChargeInformation from "@/components/ChargeInformation";

const columns = [
  { id: "patient_id", label: "N°", minWidth: 10 },
  { id: "name", label: "Nombres", minWidth: 100 },
  { id: "lastName", label: "Apellidos", minWidth: 100 },
  { id: "sex", label: "Sexo", minWidth: 60 },
  { id: "civilStatus", label: "Estado", minWidth: 60 },
  { id: "email", label: "Email", minWidth: 80 },
  { id: "movil", label: "Movil", minWidth: 80 },
  { id: "landline", label: "Fijo", minWidth: 80 },
  { id: "address", label: "Dirección", minWidth: 100 },
  { id: "nationality", label: "Nacionalidad", minWidth: 80 },
  //{ id: "", minWidth: 80 },
];
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },

  button: {
    fontSize: "15px",
  },
});

export default function index() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/patients`, fetcher);
  //console.log("pacientes de resgreso", data);
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
        <Title>Pacientes</Title>
        <Paper elevation={6} style={{ padding: "10px", margin: "20px" }}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead
                style={{ backgroundColor: "#BBF0E8", color: "#092435" }}
              >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
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
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-2}
                        key={row.patient_id}
                      >
                        {" "}
                        <>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}{" "}
                              </TableCell>
                            );
                          })}
                        </>
                        <Grid container direction="row" alignItems="center">
                          <Grid item>
                            <Button
                              variant="outlined"
                              size="medium"
                              style={{
                                background: "#60CCD9",
                              }}
                            >
                              <Link
                                href={`/patients/${row.patient_id}`}
                                as={`/patients/${row.patient_id}`}
                                key={row.patient_id}
                                passHref
                              >
                                <BorderColorIcon />
                              </Link>
                            </Button>
                          </Grid>
                        </Grid>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.meta.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/*<div className="">
          {data.data.map((patient) => {
            console.log("desde", patient);
            return (
              <Link
                href={`/patients/${patient.patient_id}`}
                as={`/patients/${patient.patient_id}`}
                key={patient.patient_id}
                passHref
              >
                <Muilink className="">
                  <h3>{patient.patient_id}</h3>
                  <p>{patient.name}</p>
                  <p>{patient.lastName}</p>
                </Muilink>
              </Link>
            );
          })}
        </div>*/}
      </Container>
    </LayoutSecondary>
  );
}
