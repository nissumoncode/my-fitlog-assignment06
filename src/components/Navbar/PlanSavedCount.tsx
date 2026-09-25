"use client";

import { usePlan } from "@/context/PlanContext";

type PlanSavedCountProps = {
  type: "plan" | "saved";
};

const PlanSavedCount = ({ type }: PlanSavedCountProps) => {
  const { plan, saved } = usePlan();

  if (type === "plan") {
    return (
      <span className="rounded-full bg-[#27272A] px-2 py-0.5 text-xs font-semibold text-[#CCFF00]">
        {plan.length}
      </span>
    );
  }

  return <span>{saved.length}</span>;
};

export default PlanSavedCount;