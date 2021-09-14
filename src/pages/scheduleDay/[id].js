import { useRouter } from "next/router";

export default function scheduleDay() {
  const router = useRouter();

  return (
    <>
      <h1>Detalles de horario </h1>
      <p>User id : {router.query.id}</p>
    </>
  );
}
