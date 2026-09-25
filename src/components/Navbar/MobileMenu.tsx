"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import PlanSavedCount from "./PlanSavedCount";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Toggle menu"
        className="flex items-center justify-center text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-16 w-full border-t border-white/[0.08] bg-[#0D0D0D] px-4 py-4">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[#1F2E14] px-4 py-3 text-sm font-medium text-[#CCFF00]"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#9CA3AF]"
            >
              My Plan
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#18181B] px-4 py-3 text-sm"
            >
              <span>Plan</span>
              <PlanSavedCount type="plan" />
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-[#9CA3AF]"
            >
              <span>Saved</span>
              <PlanSavedCount type="saved" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
