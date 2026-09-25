"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock3, Flame, Star } from "lucide-react";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

type SortOption = "duration" | "calories" | "rating";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data.slice(0, 12));
      } catch (error) {
        console.error("Failed to load workouts:", error);
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    const matchesName = workout.name.toLowerCase().includes(searchText);

    const matchesTag = workout.muscleGroups.some((muscle) =>
      muscle.toLowerCase().includes(searchText),
    );

    return matchesName || matchesTag;
  });

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <section
      id="library"
      className="bg-[#0D0D0F] px-4 py-14 text-white sm:px-6 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D0FD38]">
              WORKOUT LIBRARY
            </p>

            <h2 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-0.03em] sm:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-3 text-xs text-[#85878D] sm:text-sm">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search workouts..."
              className="h-10 w-full rounded-md border border-white/[0.1] bg-[#17181B] px-4 text-xs text-white outline-none placeholder:text-[#9A9CA2] focus:border-[#D0FD38] sm:w-56"
            />

            <div className="flex h-10 items-center gap-2 rounded-md border border-white/[0.1] bg-[#17181B] px-3">
              <label
                htmlFor="sort"
                className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-[#9A9CA2]"
              >
                Sort By
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="bg-transparent text-xs font-semibold text-white outline-none"
              >
                <option className="bg-black text-white" value="duration">
                  Duration
                </option>
                <option className="bg-black text-white" value="calories">
                  Calories
                </option>
                <option className="bg-black text-white" value="rating">
                  Rating
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-[#D0FD38]" />

              <p className="text-sm font-semibold text-[#85878D]">
                Loading workouts...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-[350px] items-center justify-center text-center">
            <p className="text-sm font-semibold text-red-400">{error}</p>
          </div>
        ) : sortedWorkouts.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center text-center">
            <p className="text-sm font-semibold text-[#85878D]">
              No workouts found.
            </p>
          </div>
        ) : (
          /* Workout Grid */
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group overflow-hidden rounded-xl border border-white/[0.07] bg-[#17181B] transition duration-300 hover:-translate-y-1 hover:border-[#D0FD38]/40"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Rating */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0D0D0F]/85 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    <Star
                      size={11}
                      fill="currentColor"
                      className="text-[#D0FD38]"
                    />
                    {workout.rating}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Tags */}
                  <div className="flex min-h-[24px] flex-wrap gap-1.5">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full border border-[#D0FD38]/20 bg-[#D0FD38]/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#D0FD38]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 line-clamp-1 text-base font-black uppercase tracking-tight">
                    {workout.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#85878D]">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-3 border-t border-white/[0.07] pt-3 text-[10px] text-[#A2A5AB]">
                    <span className="flex items-center gap-1">
                      <Clock3 size={12} />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1">
                      <Flame size={12} />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutLibrary;
