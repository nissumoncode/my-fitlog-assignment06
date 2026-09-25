import Image from "next/image";
import Link from "next/link";
import PlanSavedCount from "./PlanSavedCount";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 h-16 w-full border-b border-white/[0.06] bg-[#0D0D0D]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center px-4 sm:px-6 md:px-8">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain"
          />

          <span className="text-lg font-black tracking-[0.12em] text-white">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavbarLinks />

        {/* Right Actions */}
        <div className="ml-auto hidden items-center gap-4 md:flex">
          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#2A2A2D] bg-[#18181B] px-3 py-1.5 text-sm"
          >
            <span className="font-medium text-[#E4E4E7]">Plan</span>

            <PlanSavedCount type="plan" />
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-sm font-medium text-[#9CA3AF] transition hover:text-white"
          >
            <span>Saved</span>

            <PlanSavedCount type="saved" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
