import { useState, useEffect, useRef } from 'react';
import { Exercise, WeekNumber } from '../types';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Shield, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Clock, 
  Flame 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExerciseCardProps {
  key?: any;
  exercise: Exercise;
  currentWeek: WeekNumber;
  completedSeries: number;
  onUpdateSeries: (newCount: number) => void;
}

export default function ExerciseCard({ 
  exercise, 
  currentWeek, 
  completedSeries, 
  onUpdateSeries 
}: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Play a dual chord beep for a premium athletic buzzer feel
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.start(start);
        osc.stop(start + duration);
      };

      const now = ctx.currentTime;
      playTone(880, now, 0.15); // A5
      playTone(1109, now + 0.1, 0.2); // C#6 (Major third higher)
    } catch (e) {
      console.warn("AudioContext beep failed:", e);
    }
  };

  const startRestTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerSeconds(exercise.rest);
    setIsTimerRunning(true);

    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev === null || prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimerRunning(false);
          playBeep();
          
          // Increment completed series when rest timer completes successfully
          if (completedSeries < exercise.series) {
            onUpdateSeries(completedSeries + 1);
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRestTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setTimerSeconds(null);
  };

  const handleManualSeriesChange = (increment: boolean) => {
    if (increment) {
      if (completedSeries < exercise.series) {
        onUpdateSeries(completedSeries + 1);
      }
    } else {
      if (completedSeries > 0) {
        onUpdateSeries(completedSeries - 1);
      }
    }
  };

  const isCompleted = completedSeries >= exercise.series;

  return (
    <div 
      id={`exercise-card-${exercise.id}`}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isCompleted 
          ? 'bg-slate-900/60 border-emerald-500/30' 
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Header Panel - Click to expand */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
            isCompleted 
              ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400' 
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            {isCompleted ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <span className="text-xs font-mono font-bold">{completedSeries}</span>
            )}
          </div>
          
          <div className="min-w-0">
            <h4 className={`font-semibold text-sm sm:text-base tracking-tight truncate ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
              {exercise.name}
            </h4>
            <p className="text-xs font-mono text-slate-400 mt-0.5 truncate">
              {exercise.muscle} • <span className="text-[#FF5722] font-semibold">{exercise.series}x{exercise.reps}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-2">
          {/* Active Timer badge */}
          {isTimerRunning && timerSeconds !== null && (
            <span className="flex items-center gap-1 bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] font-mono text-xs px-2 py-0.5 rounded-full animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              {timerSeconds}s
            </span>
          )}

          {/* Quick Series completed indicator */}
          <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">
            {completedSeries}/{exercise.series} series
          </span>

          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Expanded Content Panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-800/80 bg-slate-950/40"
          >
            <div className="p-4 space-y-4">
              {/* ASCII Diagram (only when present and meaningful) */}
              {exercise.ascii.trim() && (
                <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 relative group">
                  <div className="absolute top-1 right-2 text-[9px] font-mono text-slate-600 select-none">
                    GUÍA POSTURAL
                  </div>
                  <pre className="font-mono text-[11px] leading-4 text-emerald-400/90 overflow-x-auto whitespace-pre">
                    {exercise.ascii}
                  </pre>
                </div>
              )}

              {/* Instructions and safety tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/30">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                    <Flame className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span>INSTRUCCIONES DE EJECUCIÓN</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {exercise.instructions}
                  </p>
                </div>

                <div className="bg-amber-950/10 p-3 rounded-lg border border-amber-500/15">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>SEGURIDAD Y PREVENCIÓN</span>
                  </div>
                  <p className="text-xs text-amber-500/90 leading-relaxed">
                    {exercise.safety}
                  </p>
                </div>
              </div>

              {/* Progressive overload - dynamic week info */}
              <div className="bg-slate-900 border border-slate-800/50 p-3 rounded-lg flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-[#39FF14] uppercase">
                    SOBRECARGA PROGRESIVA (SEMANA {currentWeek})
                  </span>
                  <p className="text-xs text-slate-300 font-medium">
                    {exercise.weeklyProgression[currentWeek]}
                  </p>
                </div>
              </div>

              {/* Series Counter & Rest Timer Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Manual Series Selector */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1.5 shrink-0 justify-between sm:justify-start gap-4">
                  <span className="text-xs font-semibold text-slate-400 pl-2">SERIES</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleManualSeriesChange(false)}
                      disabled={completedSeries === 0}
                      className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold disabled:opacity-30 disabled:hover:bg-slate-800"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono text-sm font-bold text-slate-100">
                      {completedSeries}/{exercise.series}
                    </span>
                    <button
                      onClick={() => handleManualSeriesChange(true)}
                      disabled={completedSeries >= exercise.series}
                      className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold disabled:opacity-30 disabled:hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Big Rest Timer Button */}
                {exercise.rest > 0 ? (
                  <button
                    onClick={isTimerRunning ? stopRestTimer : startRestTimer}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm tracking-wide transition-all ${
                      isTimerRunning
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30'
                        : 'bg-[#FF5722] hover:bg-[#FF5722]/90 text-white shadow-lg shadow-[#FF5722]/10'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>CANCELAR DESCANSO ({timerSeconds}s)</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>
                          {isCompleted 
                            ? `REPETIR DESCANSO (INICIAR ${exercise.rest}s)` 
                            : `INICIAR DESCANSO DE SERIE (${exercise.rest}s)`
                          }
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center py-2 px-4">
                    <span className="text-xs font-mono text-slate-500">Transición sin descanso pautado</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
