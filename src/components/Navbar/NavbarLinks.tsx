"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();

  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
      <Link
        href="/"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
          isWorkoutsActive
            ? "bg-[#1F2E14] text-[#CCFF00]"
            : "text-[#9CA3AF] hover:text-white"
        }`}
      >
        Workouts
      </Link>

      <Link
        href="/my-plan"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
          isMyPlanActive
            ? "bg-[#1F2E14] text-[#CCFF00]"
            : "text-[#9CA3AF] hover:text-white"
        }`}
      >
        My Plan
      </Link>
    </div>
  );
};

export default NavbarLinks;
