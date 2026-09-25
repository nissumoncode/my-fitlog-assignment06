"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
export type Workout = {
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
type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};
const PlanContext = createContext<PlanContextType | undefined>(undefined);
export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }
    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);
  const addToPlan = (workout: Workout) => {
    setPlan((current) => {
      if (current.length >= 5) {
        return current;
      }
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }
      return [...current, workout];
    });
  };
  const removeFromPlan = (id: number) => {
    setPlan((current) => current.filter((workout) => workout.id !== id));
  };
  const saveWorkout = (workout: Workout) => {
    setSaved((current) => {
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }
      return [...current, workout];
    });
  };
  const removeSaved = (id: number) => {
    setSaved((current) => current.filter((workout) => workout.id !== id));
  };
  const isInPlan = (id: number) => {
    return plan.some((workout) => workout.id === id);
  };
  const isSaved = (id: number) => {
    return saved.some((workout) => workout.id === id);
  };
  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        isInPlan,
        isSaved,
      }}
    >
      {" "}
      {children}{" "}
    </PlanContext.Provider>
  );
};
export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }
  return context;
};
