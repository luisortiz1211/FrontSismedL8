import React from "react";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import Container from "@material-ui/core/Container";
import Link from "next/link";
import { Link as Multilink } from "@material-ui/core";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Loading from "@/components/Loading";

export default function index() {
  const { data, error } = useSWR(`/schedule_users`, fetcher);
  //console.log("pacientes de resgreso", data);
  if (error) return <div>Parece que si fucniona</div>;
  if (!data) return <Loading />;

  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>Horarios de usuarios</Title>
        <div className="">
          {data.data.map((scheduleUsers) => {
            console.log("scheduleUsers", scheduleUsers);
            return (
              <Link
                href={`/patients/${patient.patient_id}`}
                as={`/patients/${patient.patient_id}`}
                key={patient.patient_id}
              >
                <Multilink className="">
                  <h3>{patient.patient_id}</h3>
                  <p>{patient.name}</p>
                  <p>{patient.lastName}</p>
                </Multilink>
              </Link>
            );
          })}
        </div>
      </Container>
    </LayoutSecondary>
  );
}
