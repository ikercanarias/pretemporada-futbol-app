import { useState, useEffect } from 'react';
import { WeekNumber, DayId, UserProgress } from './types';
import { trainingPlan } from './data/trainingPlan';
import Dashboard from './components/Dashboard';
import WorkoutDetail from './components/WorkoutDetail';
import { 
  Trophy, 
  X, 
  Flame, 
  UserCheck, 
  Dumbbell, 
  CalendarDays,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Confetti {
  id: number;
  x: number; // horizontal percentage
  color: string;
  size: number;
  delay: number;
  duration: number;
}

// Soccer expert motivational coaching quotes
const COACH_MESSAGES: Record<DayId, string[]> = {
  lunes: [
    "¡Espectacular! Ese primer paso explosivo en la banda se construye hoy. ¡Has ganado masa y estabilidad para ganar el choque contra defensas mayores, crack!",
    "¡Brutal sesión de fuerza general! El hombro a hombro contra laterales de pretemporada ya no te dará miedo. ¡Sigue así, extremo rápido!",
    "¡Trabajo asimilado, crack! Estás construyendo la armadura que un extremo de 56kg necesita para resistir las cargas lumbares en carrera."
  ],
  miercoles: [
    "¡Brutal sesión de pliometría, extremo! Estás enseñando a tus tendones a acumular y liberar energía elástica como muelles de alta competición.",
    "¡Reactividad asimilada! Ese salto al cajón y despegue del drop jump es el secreto de tu arrancada explosiva en los primeros 5 metros. ¡Vuela, crack!",
    "¡Espectacular! Tu stiffness y fuerza plantar han mejorado hoy. Los cambios de dirección van a dejar sentados a los centrales veteranos."
  ],
  viernes: [
    "¡Isquiotibiales blindados! El peso muerto rumano y la sentadilla búlgara son tu mejor seguro de vida contra roturas fibrilares en sprint de alta velocidad.",
    "¡Qué fuerza y prevención hoy! Fuerza descomunal en las búlgaras para tus arrancadas por banda. El míster lo va a notar de inmediato en el campo.",
    "¡Gran final de semana! Con el abdomen estable y la cadena posterior reforzada, eres imparable en las transiciones rápidas de ataque. ¡A descansar bien!"
  ]
};

const WEEK_SUPER_MESSAGES: Record<WeekNumber, string> = {
  1: "🏆 ¡SEMANA 1 SUPERADA! Has completado el ciclo de aclimatación técnica. Tus músculos están asimilando los patrones de movimiento. ¡Constancia es tu mejor regate!",
  2: "🏆 ¡SEMANA 2 SUPERADA! La fase de sobrecarga progresiva se nota en tus piernas. Estás cargando más peso con la misma velocidad explosiva. ¡Sigue forjando al extremo del futuro!",
  3: "🏆 ¡SEMANA 3 SUPERADA! Has resistido la máxima intensidad de la pretemporada. Tus tendones son reactivos y tu core aguanta choques pesados. ¡Estás a un paso de la gloria!",
  4: "🏆 ¡SEMANA 4 COMPLETA! Ciclo de descarga y súper-compensación terminado. Tu cuerpo está fresco, regenerado y con la máxima potencia de despegue lista para competir. ¡A comerse el campo!"
};

export default function App() {
  // --- Persistent State ---
  const [currentWeek, setCurrentWeek] = useState<WeekNumber>(() => {
    try {
      const saved = localStorage.getItem('futbol_current_week');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= 4) return parsed as WeekNumber;
      }
    } catch (e) {
      console.warn("Could not read currentWeek from localStorage:", e);
    }
    return 1;
  });

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('futbol_progress_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read userProgress from localStorage:", e);
    }
    return {
      completedDays: [],
      seriesCompleted: {},
      streak: 0,
      unlockedTrophies: []
    };
  });

  // --- UI Navigation State ---
  const [selectedDayId, setSelectedDayId] = useState<DayId | null>(null);

  // --- Gamification/Animation State ---
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [coachModal, setCoachModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isWeekUnlock: boolean;
    weekCompletedNum?: WeekNumber;
  }>({
    isOpen: false,
    title: "",
    message: "",
    isWeekUnlock: false
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('futbol_current_week', currentWeek.toString());
    } catch (e) {
      console.error("Saving currentWeek failed:", e);
    }
  }, [currentWeek]);

  useEffect(() => {
    try {
      localStorage.setItem('futbol_progress_v2', JSON.stringify(userProgress));
    } catch (e) {
      console.error("Saving userProgress failed:", e);
    }
  }, [userProgress]);

  // --- Confetti Launcher ---
  const launchConfettiShower = () => {
    const colors = ['#39FF14', '#FF5722', '#FFD700', '#00E5FF', '#FF007F'];
    const particles: Confetti[] = Array.from({ length: 55 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100, // random starting x percentage
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6, // 6px to 14px size
      delay: Math.random() * 1.5, // staggered starts
      duration: Math.random() * 2 + 2 // 2s to 4s falls
    }));
    setConfetti(particles);

    // Auto-clean particles after animation is finished to release memory
    setTimeout(() => {
      setConfetti([]);
    }, 5500);
  };

  // --- Core Handlers ---
  const handleSelectWeek = (week: WeekNumber) => {
    setCurrentWeek(week);
  };

  const handleSelectDay = (dayId: DayId) => {
    setSelectedDayId(dayId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleDayCompleted = (week: WeekNumber, dayId: DayId) => {
    const dayKey = `week-${week}-${dayId}`;
    const isCompleted = userProgress.completedDays.includes(dayKey);

    let updatedCompletedDays = [...userProgress.completedDays];
    if (isCompleted) {
      // Remove day
      updatedCompletedDays = updatedCompletedDays.filter((k) => k !== dayKey);
    } else {
      // Add day
      updatedCompletedDays.push(dayKey);
    }

    // Check if the week became 100% completed right now
    const weekDays = ['lunes', 'miercoles', 'viernes'].map(d => `week-${week}-${d}`);
    const isWeekNowDone = weekDays.every(k => updatedCompletedDays.includes(k));
    const wasAlreadyDone = weekDays.every(k => userProgress.completedDays.includes(k));

    let updatedTrophies = [...userProgress.unlockedTrophies];
    let showWeekUnlock = false;
    let customMsg = "";

    if (isWeekNowDone && !wasAlreadyDone) {
      if (!updatedTrophies.includes(week)) {
        updatedTrophies.push(week);
      }
      showWeekUnlock = true;
      customMsg = WEEK_SUPER_MESSAGES[week];
    }

    setUserProgress((prev) => ({
      ...prev,
      completedDays: updatedCompletedDays,
      unlockedTrophies: updatedTrophies,
      streak: updatedCompletedDays.length
    }));

    if (!isCompleted) {
      // Completed! Trigger confetti & motivator
      launchConfettiShower();
      
      const dayMessages = COACH_MESSAGES[dayId];
      const randomQuote = dayMessages[Math.floor(Math.random() * dayMessages.length)];

      setCoachModal({
        isOpen: true,
        title: showWeekUnlock ? "¡SEMANA CONCLUIDA CON ÉXITO!" : "¡ENTRENAMIENTO COMPLETADO!",
        message: showWeekUnlock ? `${customMsg}\n\n💬 Míster: "${randomQuote}"` : `💬 Míster: "${randomQuote}"`,
        isWeekUnlock: showWeekUnlock,
        weekCompletedNum: week
      });
    }
  };

  const handleUpdateSeriesCompleted = (exerciseId: string, count: number) => {
    if (!selectedDayId) return;
    const seriesKey = `week-${currentWeek}-${selectedDayId}-${exerciseId}`;
    
    setUserProgress((prev) => ({
      ...prev,
      seriesCompleted: {
        ...prev.seriesCompleted,
        [seriesKey]: count
      }
    }));
  };

  const handleCompleteActiveWorkout = () => {
    if (!selectedDayId) return;
    
    const dayKey = `week-${currentWeek}-${selectedDayId}`;
    const alreadyDone = userProgress.completedDays.includes(dayKey);

    let updatedCompletedDays = [...userProgress.completedDays];
    if (!alreadyDone) {
      updatedCompletedDays.push(dayKey);
    }

    // Check if week is completed
    const weekDays = ['lunes', 'miercoles', 'viernes'].map(d => `week-${currentWeek}-${d}`);
    const isWeekNowDone = weekDays.every(k => updatedCompletedDays.includes(k));
    const wasAlreadyDone = weekDays.every(k => userProgress.completedDays.includes(k));

    let updatedTrophies = [...userProgress.unlockedTrophies];
    let showWeekUnlock = false;
    let customMsg = "";

    if (isWeekNowDone && !wasAlreadyDone) {
      if (!updatedTrophies.includes(currentWeek)) {
        updatedTrophies.push(currentWeek);
      }
      showWeekUnlock = true;
      customMsg = WEEK_SUPER_MESSAGES[currentWeek];
    }

    setUserProgress((prev) => ({
      ...prev,
      completedDays: updatedCompletedDays,
      unlockedTrophies: updatedTrophies,
      streak: updatedCompletedDays.length
    }));

    launchConfettiShower();

    const dayMessages = COACH_MESSAGES[selectedDayId];
    const randomQuote = dayMessages[Math.floor(Math.random() * dayMessages.length)];

    setCoachModal({
      isOpen: true,
      title: showWeekUnlock ? "¡SEMANA CONCLUIDA CON ÉXITO!" : "¡SESIÓN TERMINADA CON ÉXITO!",
      message: showWeekUnlock ? `${customMsg}\n\n💬 Míster: "${randomQuote}"` : `💬 Míster: "${randomQuote}"`,
      isWeekUnlock: showWeekUnlock,
      weekCompletedNum: currentWeek
    });
  };

  const handleResetAllData = () => {
    setUserProgress({
      completedDays: [],
      seriesCompleted: {},
      streak: 0,
      unlockedTrophies: []
    });
    setCurrentWeek(1);
    setSelectedDayId(null);
    localStorage.removeItem('futbol_progress_v2');
    localStorage.removeItem('futbol_current_week');
  };

  const activeDayPlan = trainingPlan.find((d) => d.id === selectedDayId);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-[#39FF14] selection:text-slate-950 relative overflow-x-hidden pb-12">
      {/* Upper Brand Decorative Bar */}
      <header className="sticky top-0 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-900 py-3 px-4 z-30">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">⚡</span>
            <span className="text-xs font-black font-display tracking-widest text-[#39FF14]">
              POTENCIA FÚTBOL • W{currentWeek}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>MÓDULO DE GIMNASIO</span>
          </div>
        </div>
      </header>

      {/* Main Container Stage */}
      <main className="pt-6">
        {activeDayPlan ? (
          <WorkoutDetail
            dayPlan={activeDayPlan}
            currentWeek={currentWeek}
            userProgress={userProgress}
            onUpdateSeriesCompleted={handleUpdateSeriesCompleted}
            onCompleteWorkout={handleCompleteActiveWorkout}
            onBack={() => setSelectedDayId(null)}
          />
        ) : (
          <Dashboard
            trainingPlan={trainingPlan}
            currentWeek={currentWeek}
            userProgress={userProgress}
            onSelectWeek={handleSelectWeek}
            onSelectDay={handleSelectDay}
            onToggleDayCompleted={handleToggleDayCompleted}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* --- Gamification Renderers --- */}

      {/* 1. Confetti Rain Portal */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute animate-confetti rounded-sm"
            style={{
              left: `${c.x}%`,
              top: `-20px`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`
            }}
          />
        ))}
      </div>

      {/* 2. Coaching Motivational Modal Popup */}
      <AnimatePresence>
        {coachModal.isOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className={`w-full max-w-sm rounded-2xl border p-6 relative overflow-hidden shadow-2xl ${
                coachModal.isWeekUnlock
                  ? 'bg-gradient-to-b from-slate-900 to-amber-950/20 border-amber-500/30'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Highlight background shine */}
              {coachModal.isWeekUnlock ? (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              ) : (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#39FF14]/5  rounded-full blur-3xl pointer-events-none"></div>
              )}

              {/* Close Button */}
              <button
                onClick={() => {
                  setCoachModal((prev) => ({ ...prev, isOpen: false }));
                  // Smoothly return to dashboard so they see their stats upgrade
                  setSelectedDayId(null);
                }}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4 relative">
                {/* Visual Avatar decoration */}
                <div className="flex justify-center">
                  {coachModal.isWeekUnlock ? (
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 text-amber-500 flex items-center justify-center text-2xl animate-bounce">
                      🏆
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] flex items-center justify-center">
                      <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className={`text-[10px] font-bold font-mono tracking-wider uppercase ${
                    coachModal.isWeekUnlock ? 'text-amber-400' : 'text-[#39FF14]'
                  }`}>
                    {coachModal.isWeekUnlock ? '¡MILSTONE DESBLOQUEADO!' : 'ENTRENAMIENTO DEL DÍA ASIMILADO'}
                  </span>
                  <h3 className="text-lg font-black text-slate-100 font-display uppercase tracking-tight">
                    {coachModal.title}
                  </h3>
                </div>

                {/* Main feedback body */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 text-left">
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                    {coachModal.message}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCoachModal((prev) => ({ ...prev, isOpen: false }));
                      // Smoothly return to dashboard to see trophies
                      setSelectedDayId(null);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${
                      coachModal.isWeekUnlock
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                        : 'bg-[#39FF14] hover:bg-[#39FF14]/90 text-slate-950'
                    }`}
                  >
                    {coachModal.isWeekUnlock ? 'SÍ, ¡VAMOS A POR MÁS!' : 'ENTENDIDO, VOLVER AL MENÚ'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
