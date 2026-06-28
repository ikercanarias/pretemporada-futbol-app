export type WeekNumber = 1 | 2 | 3 | 4;

export type DayId = 'lunes' | 'miercoles' | 'viernes';

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  series: number;
  reps: string;
  rest: number; // in seconds
  ascii: string;
  instructions: string;
  safety: string;
  weeklyProgression: {
    1: string;
    2: string;
    3: string;
    4: string;
  };
}

export interface Superserie {
  isSuperserie: true;
  name: string;
  exercises: Exercise[];
}

export interface SingleExercise {
  isSuperserie: false;
  exercise: Exercise;
}

export type BlockElement = Superserie | SingleExercise;

export interface Block {
  id: string;
  name: string; // 'Calentamiento (10 min)' | 'Bloque Principal (45 min)' | 'Vuelta a la Calma (5 min)'
  durationLabel: string;
  elements: BlockElement[];
}

export interface DayPlan {
  id: DayId;
  name: string; // 'LUNES'
  title: string; // 'Fuerza General y Estabilidad'
  focus: string; // 'Fuerza General y Estabilidad'
  blocks: Block[];
}

export interface UserProgress {
  completedDays: string[]; // e.g., ["week-1-lunes", "week-1-miercoles"]
  seriesCompleted: Record<string, number>; // e.g., {"week-1-lunes-exercise-id": 3}
  streak: number;
  unlockedTrophies: number[]; // e.g., [1, 2] indicating week 1, week 2
}
