"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, X, Clock3, Flame, Star } from "lucide-react";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

const MyPlanPage = () => {
  const { plan, saved, removeFromPlan, removeSaved } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [doneWorkouts, setDoneWorkouts] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleDone = (id: number) => {
    if (doneWorkouts.includes(id)) {
      return;
    }

    setDoneWorkouts((current) => [...current, id]);
    showToast("Workout marked as done");
  };

  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      showToast("Removed from today's plan");
    } else {
      removeSaved(id);
      showToast("Removed from saved");
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D0F] px-4 pb-16 pt-28 text-white sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D0FD38]">
            FITLOG
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-0.03em] sm:text-5xl md:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-3 max-w-xl text-xs leading-5 text-[#85878D] sm:text-sm sm:leading-6">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-3 gap-3 md:gap-5">
          <MetricCard label="Exercises" value={String(plan.length)} />
          <MetricCard label="Minutes" value={String(totalMinutes)} />
          <MetricCard label="Calories" value={String(totalCalories)} />
        </div>

        {/* Tabs */}
        <div className="mt-10 flex border-b border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 px-4 py-3 text-xs font-black uppercase transition ${
              activeTab === "plan"
                ? "border-[#D0FD38] text-[#D0FD38]"
                : "border-transparent text-[#686B72] hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-4 py-3 text-xs font-black uppercase transition ${
              activeTab === "saved"
                ? "border-[#D0FD38] text-[#D0FD38]"
                : "border-transparent text-[#686B72] hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Empty State */}
        {currentWorkouts.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <h2 className="mt-6 text-xl font-black uppercase tracking-wide">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#85878D]">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-6 rounded-xl bg-[#D0FD38] px-6 py-3 text-xs font-black uppercase text-[#0D0D0F] transition hover:bg-[#c2ed2d]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {currentWorkouts.map((workout) => {
              const isDone = doneWorkouts.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#17181B] p-4 md:flex-row md:items-center"
                >
                  {/* Image */}
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={160}
                    height={112}
                    className="h-40 w-full rounded-xl object-cover md:h-28 md:w-40"
                  />

                  {/* Workout Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-black uppercase tracking-tight text-white">
                      {workout.name}
                    </h3>

                    <p className="mt-1 text-xs text-[#85878D]">
                      {workout.equipment}
                    </p>

                    {/* Stats */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#A2A5AB]">
                        <Clock3 size={13} />
                        <span>{workout.duration} min</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#A2A5AB]">
                        <Flame size={13} />
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#D0FD38]">
                        <Star size={13} fill="currentColor" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-auto flex shrink-0 items-center gap-2">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="inline-flex h-8 items-center justify-center rounded-md border border-white/[0.14] px-3 text-[9px] font-bold uppercase tracking-wide text-[#D4D4D8] transition hover:border-[#D0FD38] hover:text-[#D0FD38]"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        type="button"
                        onClick={() => handleDone(workout.id)}
                        disabled={isDone}
                        className={`inline-flex h-8 items-center justify-center gap-1 rounded-md px-3 text-[9px] font-black uppercase tracking-wide transition ${
                          isDone
                            ? "bg-[#D0FD38]/20 text-[#D0FD38]"
                            : "bg-[#D0FD38] text-[#0D0D0F] hover:bg-[#B8E62B]"
                        }`}
                      >
                        {isDone && <Check size={13} strokeWidth={3} />}
                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemove(workout.id)}
                      aria-label={`Remove ${workout.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.14] text-[#85878D] transition hover:border-red-400 hover:text-red-400"
                    >
                      <X size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed right-5 top-20 z-[100] rounded-xl border border-[#D0FD38]/20 bg-[#17181B] px-5 py-3 text-sm font-semibold text-[#D0FD38] shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
};

const MetricCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#17181B] p-4 md:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#686B72] md:text-xs">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black md:text-4xl">{value}</p>
    </div>
  );
};

export default MyPlanPage;
