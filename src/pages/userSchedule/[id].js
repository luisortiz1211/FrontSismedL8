import { useRouter } from "next/router";

export default function userSchedule() {
  const router = useRouter();

  return (
    <>
      <h1>User schedule Details </h1>
      <p>User id : {router.query.id}</p>
    </>
  );
}
