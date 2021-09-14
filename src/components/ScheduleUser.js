import React from "react";
import useSWR from "swr";
import Loading from "@/components/Loading";

const fetcher = async (url) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`);
  const scheduleUser = await res.json();
  console.log("scheduleUser", scheduleUser);
  return scheduleUser;
};

export default function scheduleUser({ userId }) {
  const { data, error } = useSWR("/users", fetcher);

  if (error) return <div>No se pudo cargar los horarios</div>;
  if (!data) return <Loading />;

  return (
    <>
      {data.map((schedule) => {
        <div></div>;
      })}
    </>
  );
}
