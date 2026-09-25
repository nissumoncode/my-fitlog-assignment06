import Link from "next/link";
const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D0D0F] px-6 text-center text-white">
      {" "}
      <div>
        {" "}
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D0FD38]">
          {" "}
          FITLOG{" "}
        </p>{" "}
        <h1 className="mt-4 text-7xl font-black tracking-tight"> 404 </h1>{" "}
        <h2 className="mt-3 text-2xl font-black uppercase"> Page Not Found </h2>{" "}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#85878D]">
          {" "}
          The workout or page you are looking for does not exist.{" "}
        </p>{" "}
        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-[#D0FD38] px-6 py-3 text-xs font-black uppercase text-[#0D0D0F] transition hover:bg-[#c2ed2d]"
        >
          {" "}
          Back to workouts{" "}
        </Link>{" "}
      </div>{" "}
    </main>
  );
};
export default NotFound;
