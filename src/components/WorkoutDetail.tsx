import { useState, useEffect, useRef } from 'react';
import { DayPlan, WeekNumber, UserProgress, Exercise } from '../types';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Flame,
  Activity,
  Heart
} from 'lucide-react';
import ExerciseCard from './ExerciseCard';

interface WorkoutDetailProps {
  dayPlan: DayPlan;
  currentWeek: WeekNumber;
  userProgress: UserProgress;
  onUpdateSeriesCompleted: (exerciseId: string, count: number) => void;
  onCompleteWorkout: () => void;
  onBack: () => void;
}

export default function WorkoutDetail({
  dayPlan,
  currentWeek,
  userProgress,
  onUpdateSeriesCompleted,
  onCompleteWorkout,
  onBack
}: WorkoutDetailProps) {
  // Global Countdown Timer: 60 minutes = 3600 seconds
  const INITIAL_SECONDS = 3600;
  const [sessionSeconds, setSessionSeconds] = useState(INITIAL_SECONDS);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerActive) {
      timerIntervalRef.current = setInterval(() => {
        setSessionSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerActive]);

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setSessionSeconds(INITIAL_SECONDS);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Check if all exercises have been fully completed
  const getAllExercises = (): Exercise[] => {
    const list: Exercise[] = [];
    dayPlan.blocks.forEach(block => {
      block.elements.forEach(element => {
        if (element.isSuperserie) {
          list.push(...(element as any).exercises);
        } else {
          list.push((element as any).exercise);
        }
      });
    });
    return list;
  };

  const allExercises = getAllExercises();
  const completedExercisesCount = allExercises.filter(ex => {
    const compKey = `week-${currentWeek}-${dayPlan.id}-${ex.id}`;
    const doneSeries = userProgress.seriesCompleted[compKey] || 0;
    return doneSeries >= ex.series;
  }).length;

  const totalExercisesCount = allExercises.length;
  const progressPercent = Math.round((completedExercisesCount / totalExercisesCount) * 100);

  // Remaining percentage of time
  const timeProgressPercent = (sessionSeconds / INITIAL_SECONDS) * 100;

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-4 sm:px-0">
      {/* Upper Navigation Bar */}
      <div className="flex items-center justify-between py-4 mb-4 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#39FF14] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>PANEL PRINCIPAL</span>
        </button>

        <div className="text-right">
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
            ENTRENAMIENTO DEL DÍA
          </span>
          <h2 className="text-sm font-bold text-slate-100 font-display">
            {dayPlan.name.toUpperCase()}: {dayPlan.title}
          </h2>
        </div>
      </div>

      {/* Global 60-Minute Gym Countdown Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#FF5722]/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#FF5722]/10 rounded text-[#FF5722]">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-wider text-slate-400">CRONÓMETRO DE SESIÓN</h3>
              <p className="text-[10px] text-slate-500 font-mono">Límite recomendado: 60 mins</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTimer}
              className={`p-2 rounded-lg transition-all text-xs font-bold flex items-center gap-1 ${
                isTimerActive 
                  ? 'bg-slate-800 hover:bg-slate-700 text-[#39FF14]' 
                  : 'bg-[#FF5722] hover:bg-[#FF5722]/90 text-white'
              }`}
            >
              {isTimerActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>PAUSAR</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>REANUDAR</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              title="Reiniciar Cronómetro"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between mb-1.5">
          <span className={`text-3xl font-bold font-mono tracking-tight ${sessionSeconds < 600 ? 'text-rose-500' : 'text-slate-100'}`}>
            {formatTime(sessionSeconds)}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {completedExercisesCount}/{totalExercisesCount} ejercicios listos
          </span>
        </div>

        {/* Dynamic visual slider */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              sessionSeconds < 600 ? 'bg-rose-500' : 'bg-[#FF5722]'
            }`}
            style={{ width: `${timeProgressPercent}%` }}
          ></div>
        </div>
        {sessionSeconds === 0 && (
          <div className="mt-2 text-[11px] font-mono text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>¡Has alcanzado el límite de 60 minutos! Finaliza con estiramientos.</span>
          </div>
        )}
      </div>

      {/* Focus banner */}
      <div className="bg-slate-900/40 border border-slate-800/60 p-3.5 rounded-xl mb-6 flex items-start gap-3">
        <div className="text-xl">⚽</div>
        <div>
          <h4 className="text-xs font-bold text-slate-300">FOCO COMPETITIVO</h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{dayPlan.focus}</p>
        </div>
      </div>

      {/* Core Workflow: Group Blocks chronologically */}
      <div className="space-y-8">
        {dayPlan.blocks.map((block) => (
          <div key={block.id} className="space-y-4">
            {/* Block Header with metadata */}
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#39FF14] tracking-wider uppercase font-display">
                  {block.name}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                  {block.durationLabel}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Bloque secuencial
              </span>
            </div>

            {/* List block elements (Exercises or Superseries) */}
            <div className="space-y-4">
              {block.elements.map((element, idx) => {
                if (element.isSuperserie) {
                  return (
                    <div 
                      key={`sup-${idx}`}
                      className="border-l-4 border-l-[#FF5722] bg-slate-950/20 rounded-r-xl p-3 sm:p-4 space-y-3"
                    >
                      {/* Superserie Header Info */}
                      <div className="flex items-center justify-between bg-[#FF5722]/5 px-3 py-2 rounded border border-[#FF5722]/15">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-ping"></span>
                          <span className="text-[10px] font-bold tracking-wide text-[#FF5722] font-mono">
                            SUPERSERIE ACTIVA (SIN DESCANSO INTERMEDIO)
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono italic">
                          Alterna ejercicios
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold pl-1">
                        {element.name}
                      </p>

                      {/* Exercises in Superserie */}
                      <div className="space-y-3.5">
                        {(element as any).exercises.map((exercise: any) => {
                          const compKey = `week-${currentWeek}-${dayPlan.id}-${exercise.id}`;
                          const doneSeries = userProgress.seriesCompleted[compKey] || 0;
                          return (
                            <ExerciseCard
                              key={exercise.id}
                              exercise={exercise}
                              currentWeek={currentWeek}
                              completedSeries={doneSeries}
                              onUpdateSeries={(newCount) => onUpdateSeriesCompleted(exercise.id, newCount)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  const exercise = (element as any).exercise;
                  const compKey = `week-${currentWeek}-${dayPlan.id}-${exercise.id}`;
                  const doneSeries = userProgress.seriesCompleted[compKey] || 0;
                  return (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      currentWeek={currentWeek}
                      completedSeries={doneSeries}
                      onUpdateSeries={(newCount) => onUpdateSeriesCompleted(exercise.id, newCount)}
                    />
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom action bar for gym check-off */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 py-3.5 px-4 z-40">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {/* Progress state */}
          <div className="hidden sm:flex flex-col text-left shrink-0">
            <span className="text-[10px] text-slate-400 font-mono">PROGRESO DEL DÍA</span>
            <span className="text-sm font-bold text-slate-100 font-mono">
              {progressPercent}% Completado
            </span>
          </div>

          <button
            onClick={onCompleteWorkout}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm tracking-wide transition-all ${
              progressPercent >= 100
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-[#39FF14] hover:bg-[#39FF14]/90 text-slate-950 font-black shadow-lg shadow-[#39FF14]/15'
            }`}
          >
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            <span>
              {progressPercent >= 100 
                ? '✓ MARCAR ENTRENAMIENTO COMPLETADO' 
                : `CONCLUIR DÍA (${completedExercisesCount}/${totalExercisesCount} completados)`
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
