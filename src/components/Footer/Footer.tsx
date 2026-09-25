import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0D0D0F] px-4 py-6 text-white sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="text-lg font-black tracking-[0.12em] text-white">
            FITLOG
          </span>
        </div>

        <p className="text-right text-[10px] leading-4 text-[#686B72] sm:text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
