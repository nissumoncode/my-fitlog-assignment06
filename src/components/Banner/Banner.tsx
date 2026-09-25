import Image from "next/image";

const Banner = () => {
  return (
    <section className="w-full bg-[#0D0D0F] px-4 pt-20 pb-6 sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-[#17181B] px-6 py-10 sm:px-8 md:min-h-[330px] md:px-12">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D0FD38]/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex max-w-[650px] flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D0FD38]">
              WORKOUT LIBRARY
            </p>

            <h1 className="mt-3 max-w-[620px] text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-[500px] text-xs leading-5 text-[#92969E] sm:text-sm sm:leading-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-6 flex w-fit items-center gap-2 rounded-md bg-[#D0FD38] px-5 py-3 text-[10px] font-black uppercase tracking-wide text-[#0D0D0F] transition hover:bg-[#B8E62B]"
            >
              BROWSE WORKOUTS
              <span className="text-sm">→</span>
            </a>
          </div>

          {/* Hero Image */}
          <div className="absolute bottom-0 right-2 hidden h-[280px] w-[260px] sm:block md:right-8 md:h-[310px] md:w-[300px]">
            <Image
              src="/assets/banner.png"
              alt="FitLog workout illustration"
              fill
              priority
              sizes="(max-width: 768px) 260px, 300px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
