import React from 'react';
import { Calendar, BookOpen, Shield, Award } from 'lucide-react';

interface StatsBarProps {
  totalLessons: number;
  revistaCount: number;
  consolidacaoCount: number;
  concluidosCount: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalLessons,
  revistaCount,
  consolidacaoCount,
  concluidosCount,
}) => {
  const percentual = totalLessons > 0 ? Math.round((concluidosCount / totalLessons) * 100) : 0;

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-[#eadeca] dark:border-slate-700 py-5 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
          
          <div id="stat-total-periodo" className="p-3.5 bg-[#fdfcf7] dark:bg-slate-950 rounded-xl border border-[#eadeca] dark:border-slate-700 flex justify-between items-center shadow-inner">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">
                Total do Período
              </span>
              <p className="text-lg font-serif font-bold text-[#004b3c] dark:text-emerald-400">{totalLessons} Domingos</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#059669] dark:text-emerald-500">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div id="stat-revista-fonte" className="p-3.5 bg-[#fdfcf7] dark:bg-slate-950 rounded-xl border border-[#eadeca] dark:border-slate-700 flex justify-between items-center shadow-inner">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">
                Revista Fonte
              </span>
              <p className="text-lg font-serif font-bold text-[#004b3c] dark:text-emerald-400">{revistaCount} Lições Adaptadas</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          <div id="stat-foco-teologico" className="p-3.5 bg-[#fdfcf7] dark:bg-slate-950 rounded-xl border border-[#eadeca] dark:border-slate-700 flex justify-between items-center shadow-inner">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">
                Foco Teológico
              </span>
              <p className="text-lg font-serif font-bold text-[#004b3c] dark:text-emerald-400">{consolidacaoCount} Consolidações</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-800">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          {/* Barra de Progresso Real de Estudos */}
          <div id="stat-progresso-estudos" className="p-3.5 bg-emerald-50/60 dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex flex-col justify-center shadow-inner">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#059669] dark:text-emerald-500" />
                <span className="text-[10px] text-emerald-900 dark:text-emerald-100 uppercase tracking-widest font-bold">
                  Progresso de Preparação
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#059669] dark:text-emerald-500">{percentual}%</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className="bg-[#059669] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${percentual}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
