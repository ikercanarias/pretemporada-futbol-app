import { DayPlan, WeekNumber, UserProgress, DayId } from '../types';
import { 
  Trophy, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  Dumbbell, 
  Activity, 
  ShieldCheck, 
  TrendingUp,
  User,
  RotateCcw
} from 'lucide-react';

interface DashboardProps {
  trainingPlan: DayPlan[];
  currentWeek: WeekNumber;
  userProgress: UserProgress;
  onSelectWeek: (week: WeekNumber) => void;
  onSelectDay: (dayId: DayId) => void;
  onToggleDayCompleted: (week: WeekNumber, dayId: DayId) => void;
  onResetAllData: () => void;
}

export default function Dashboard({
  trainingPlan,
  currentWeek,
  userProgress,
  onSelectWeek,
  onSelectDay,
  onToggleDayCompleted,
  onResetAllData
}: DashboardProps) {
  
  // Calculate completed days for the active week
  const getWeekCompletedDays = (week: WeekNumber): DayId[] => {
    const list: DayId[] = [];
    ['lunes', 'miercoles', 'viernes'].forEach((dayId) => {
      if (userProgress.completedDays.includes(`week-${week}-${dayId}`)) {
        list.push(dayId as DayId);
      }
    });
    return list;
  };

  const activeWeekCompleted = getWeekCompletedDays(currentWeek);
  const completedCount = activeWeekCompleted.length;

  // Check if a week is 100% completed
  const isWeekFullyCompleted = (week: WeekNumber): boolean => {
    return ['lunes', 'miercoles', 'viernes'].every((dayId) => 
      userProgress.completedDays.includes(`week-${week}-${dayId}`)
    );
  };

  // Get total exercises and completed series for quick stats
  const getTotalCompletedSessions = () => userProgress.completedDays.length;

  const weekLabels: Record<WeekNumber, string> = {
    1: 'S1: ACLIMATACIÓN',
    2: 'S2: SOBRECARGA',
    3: 'S3: MÁXIMA INTENSIDAD',
    4: 'S4: DESCARGA'
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-12 px-4 sm:px-0">
      {/* Athlete profile card header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full flex items-center justify-center text-xl shrink-0">
            🏃⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#39FF14] tracking-wide font-mono">FICHA DE ATLETA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-ping"></span>
            </div>
            <h2 className="text-base font-black text-slate-100 font-display">PERFIL JUVENIL • EXTREMO</h2>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              16 años • 56 kg • Gimnasio Municipal
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-mono block">RACHA GLOBAL</span>
          <span className="text-lg font-black font-mono text-[#FF5722]">{getTotalCompletedSessions()}</span>
          <span className="text-[10px] text-slate-500 font-mono block">sesiones</span>
        </div>
      </div>

      {/* Main App Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase font-mono">
          PROGRAMA DE FUERZA & EXPLOSIVIDAD
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1 font-display tracking-tight uppercase leading-none">
          PRETEMPORADA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">POTENCIA FÚTBOL</span>
        </h1>
        <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
          Guía de 4 semanas de sobrecarga progresiva para superar rivales mayores en velocidad y aguante físico.
        </p>
      </div>

      {/* Week Selector Tabs */}
      <div className="bg-slate-900/60 p-1 rounded-xl border border-slate-800/80 mb-6">
        <span className="text-[9px] font-mono font-bold text-slate-500 block px-3 pt-1 uppercase tracking-wider">
          Fase de la Programación (Sobrecarga)
        </span>
        <div className="grid grid-cols-4 gap-1 mt-1">
          {([1, 2, 3, 4] as WeekNumber[]).map((week) => {
            const isSelected = currentWeek === week;
            const isCompleted = isWeekFullyCompleted(week);
            return (
              <button
                key={week}
                onClick={() => onSelectWeek(week)}
                className={`py-2 px-1 rounded-lg text-center flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#FF5722] text-white font-bold shadow-lg shadow-[#FF5722]/15'
                    : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="text-xs font-mono font-bold">W{week}</span>
                <span className="text-[8px] mt-0.5 font-bold tracking-tighter uppercase truncate max-w-full">
                  {isCompleted ? '✓ OK' : `SEMANA ${week}`}
                </span>
              </button>
            );
          })}
        </div>
        {/* Short info about the active week's physiological focus */}
        <div className="px-3 py-2 mt-1 text-[11px] font-medium text-[#39FF14] bg-[#39FF14]/5 rounded-lg border border-[#39FF14]/10 text-center">
          Enfoque Activo: <span className="font-bold">{weekLabels[currentWeek]}</span>
        </div>
      </div>

      {/* Trophies display wall */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl">
        <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5 font-display tracking-wider">
          <Trophy className="w-4 h-4 text-[#39FF14]" />
          <span>GALARDONES DE PRETEMPORADA (4 SEMANAS)</span>
        </h3>
        
        <div className="grid grid-cols-4 gap-3">
          {([1, 2, 3, 4] as WeekNumber[]).map((week) => {
            const isCompleted = isWeekFullyCompleted(week);
            return (
              <div 
                key={`trophy-${week}`}
                className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                  isCompleted 
                    ? 'bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/30 shadow-lg shadow-amber-500/5' 
                    : 'bg-slate-950/40 border-slate-900'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                  isCompleted 
                    ? 'bg-amber-500 text-slate-950 scale-110 shadow-lg shadow-amber-500/20' 
                    : 'bg-slate-850 border border-slate-800 text-slate-600'
                }`}>
                  <Trophy className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400">SEM {week}</span>
                <span className={`text-[8px] font-bold mt-0.5 ${isCompleted ? 'text-amber-400 font-black' : 'text-slate-600'}`}>
                  {isCompleted ? 'SUPERADA' : 'BLOQUEADO'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Week Progress Bar Indicator */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300">PROGRESO SEMANAL</span>
          <span className="text-xs font-mono font-bold text-[#39FF14]">
            {completedCount}/3 DÍAS COMPLETADOS
          </span>
        </div>

        {/* Visual modern segments representing Lunes, Miercoles, Viernes */}
        <div className="grid grid-cols-3 gap-1.5">
          {['lunes', 'miercoles', 'viernes'].map((dayId, idx) => {
            const isDone = userProgress.completedDays.includes(`week-${currentWeek}-${dayId}`);
            const dayNames = ['LUN', 'MIÉ', 'VIE'];
            return (
              <div key={dayId} className="space-y-1">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isDone 
                      ? 'bg-gradient-to-r from-[#39FF14] to-emerald-400 shadow-md shadow-[#39FF14]/15' 
                      : 'bg-slate-850'
                  }`}
                ></div>
                <div className="flex justify-between items-center text-[9px] font-mono px-1">
                  <span className={isDone ? 'text-slate-300 font-bold' : 'text-slate-500'}>
                    {dayNames[idx]}
                  </span>
                  <span className={isDone ? 'text-[#39FF14]' : 'text-slate-600'}>
                    {isDone ? 'HECHO' : 'PENDIENTE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Three big tactical Day cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold tracking-wider text-slate-400 font-display mb-2 uppercase">
          Días de Entrenamiento (60 Minutos / Día)
        </h3>

        {trainingPlan.map((day) => {
          const isDone = userProgress.completedDays.includes(`week-${currentWeek}-${day.id}`);
          
          return (
            <div
              key={day.id}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                isDone
                  ? 'bg-slate-900/50 border-emerald-500/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:-translate-y-0.5'
              }`}
            >
              <div className="p-4 flex items-start gap-4">
                {/* Checkbox toggle circle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleDayCompleted(currentWeek, day.id);
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isDone
                      ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-[#FF5722] hover:text-[#FF5722]'
                  }`}
                  title={isDone ? "Marcar como pendiente" : "Marcar como completado"}
                >
                  <CheckCircle2 className={`w-5.5 h-5.5 ${isDone ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                </button>

                {/* Day information - Click to enter session detail */}
                <div 
                  onClick={() => onSelectDay(day.id)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#FF5722] tracking-wider uppercase">
                      {day.name}
                    </span>
                    <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                      60 MIN
                    </span>
                  </div>

                  <h4 className={`text-base font-bold tracking-tight mt-0.5 ${isDone ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                    {day.title}
                  </h4>
                  
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {day.focus}
                  </p>

                  <div className="flex items-center gap-1 mt-3.5 text-xs font-semibold text-[#39FF14] opacity-0 group-hover:opacity-100 transition-all">
                    <span>Ver rutina y arrancar cronómetro</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety warning disclaimer */}
      <div className="bg-amber-950/10 border border-amber-500/15 p-3 rounded-xl mt-8 text-center">
        <p className="text-[10px] text-amber-500/90 leading-relaxed font-mono">
          🛡️ Entrena seguro. Respeta los tiempos de descanso e hidrátate bien. Si sientes dolor articular o sobrecarga excesiva, detén la sesión de inmediato.
        </p>
      </div>

      {/* Reset progress button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            if (confirm("¿Estás seguro de que deseas restablecer todo tu progreso de pretemporada? Esta acción no se puede deshacer.")) {
              onResetAllData();
            }
          }}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500 hover:text-rose-500 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RECOMPILAR Y BORRAR HISTORIAL LOCAL</span>
        </button>
      </div>
    </div>
  );
}
