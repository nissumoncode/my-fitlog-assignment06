"use client";

import { Bookmark, Plus } from "lucide-react";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

type Workout = {
  id: number;
  name: string;
  image: string;
  description: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  instructions: string[];
};

const WorkoutActions = ({ workout }: { workout: Workout }) => {
  const { plan, addToPlan, saveWorkout, isInPlan, isSaved } = usePlan();
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleAddToPlan = () => {
    if (plan.length >= 5) {
      showToast("Today's plan is full");
      return;
    }

    if (isInPlan(workout.id)) {
      showToast("Already in today's plan");
      return;
    }

    addToPlan(workout);
    showToast("Added to today's plan");
  };

  const handleSave = () => {
    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }

    saveWorkout(workout);
    showToast("Saved for later");
  };

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Add to Today's Plan */}
        <button
          type="button"
          onClick={handleAddToPlan}
          disabled={plan.length >= 5 || isInPlan(workout.id)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#D0FD38] px-5 text-xs font-black uppercase tracking-wide text-[#0D0D0F] transition hover:bg-[#B8E62B] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={17} strokeWidth={3} />
          <span>
            {isInPlan(workout.id)
              ? "Added to today's plan"
              : "Add to today's plan"}
          </span>
        </button>

        {/* Save for Later */}
        <button
          type="button"
          onClick={handleSave}
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-md px-5 text-xs font-black uppercase tracking-wide transition ${
            isSaved(workout.id)
              ? "border border-[#D0FD38] bg-[#D0FD38] text-[#0D0D0F]"
              : "border border-white/[0.16] bg-transparent text-white hover:border-[#D0FD38] hover:text-[#D0FD38]"
          }`}
        >
          <Bookmark
            size={17}
            strokeWidth={2.5}
            fill={isSaved(workout.id) ? "currentColor" : "none"}
          />

          <span>{isSaved(workout.id) ? "Saved" : "Save for later"}</span>
        </button>
      </div>

      {toast && (
        <div className="fixed right-5 top-20 z-[9999] rounded-md border border-[#D0FD38]/20 bg-[#17181B] px-5 py-3 text-sm font-semibold text-[#D0FD38] shadow-2xl">
          {toast}
        </div>
      )}
    </>
  );
};

export default WorkoutActions;
