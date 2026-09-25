"use client";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D0D0F] px-6 text-center text-white">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D0FD38]">
          FITLOG
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-[#85878D]">
          We couldn&apos;t load this page right now.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-[#D0FD38] px-6 py-3 text-xs font-black uppercase text-[#0D0D0F]"
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

export default Error;
