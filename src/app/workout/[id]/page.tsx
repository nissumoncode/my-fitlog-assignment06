import WorkoutActions from "./WorkoutActions";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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

type WorkoutDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    notFound();
  }

  const workout: Workout = await response.json();

  return (
    <main className="min-h-screen bg-[#0D0D0F] px-4 pb-16 pt-24 text-white sm:px-6 md:px-8 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-[1280px]">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#85878D] transition hover:text-[#D0FD38]"
        >
          ← Back to workouts
        </Link>

        {/* Main Layout */}
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Left — Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#17181B]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          {/* Right — Details */}
          <div className="flex flex-col">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl">
                {workout.name}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#85878D] md:text-base">
                {workout.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border border-[#D0FD38]/25 bg-[#D0FD38]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#D0FD38]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Key Specs */}
            <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-[#17181B]">
              <div className="border-b border-r border-white/[0.07] px-5 py-4">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                  KEY SPECS
                </h2>
              </div>

              <div className="grid grid-cols-2">
                <Spec label="Equipment" value={workout.equipment} />
                <Spec label="Difficulty" value={workout.difficulty} />
                <Spec label="Sets" value={String(workout.sets)} />
                <Spec label="Reps" value={workout.reps} />
                <Spec label="Duration" value={`${workout.duration} min`} />
                <Spec
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />
                <Spec label="Rating" value={`★ ${workout.rating}`} />
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                INSTRUCTIONS
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D0FD38] text-xs font-black text-[#D0FD38]">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-sm leading-6 text-[#A2A5AB]">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Actions */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
};

const Spec = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="border-b border-r border-white/[0.07] px-5 py-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#686B72]">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
