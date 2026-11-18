import React from 'react';
import { ArrowLeft, BookMarked, Sparkles, Compass } from 'lucide-react';
import { CONCEITOS_INFO } from '../data/lessons';

interface PilaresTabProps {
  onSelectPilar: (pilar: string) => void;
  onReturnToCronograma: () => void;
}

export const PilaresTab: React.FC<PilaresTabProps> = ({
  onSelectPilar,
  onReturnToCronograma,
}) => {
  return (
    <div className="space-y-8 no-print max-w-5xl mx-auto">
      
      {/* Botão de Retorno */}
      <div>
        <button
          id="btn-voltar-cronograma-pilares"
          onClick={onReturnToCronograma}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-emerald-500 hover:text-[#047857] transition-all bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Cronograma Inicial
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm space-y-6">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 dark:bg-emerald-900/30 text-[#059669] dark:text-emerald-500 rounded-2xl border border-emerald-200 dark:border-emerald-800 mb-1">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#004b3c] dark:text-emerald-400">
            Pilares Doutrinários da Fé Reformada
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            O currículo é inteiramente ancorado em conceitos teológicos sólidos de raiz bíblica e confessional histórica. Clique em qualquer pilar abaixo para encontrar instantaneamente todas as lições do semestre que expõem e defendem estas verdades.
          </p>
        </div>

        {/* Grid de Conceitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4" id="grid-pilares-doutrinarios">
          {Object.entries(CONCEITOS_INFO).map(([pilar, desc]) => (
            <div
              key={pilar}
              id={`card-pilar-${pilar.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => onSelectPilar(pilar)}
              className="p-5 rounded-xl border border-[#eadeca] dark:border-slate-700 bg-[#fdfcf7] dark:bg-slate-950 hover:border-[#059669] dark:border-emerald-500 hover:bg-white dark:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md group"
            >
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-[#004b3c] dark:text-emerald-400 group-hover:text-[#059669] dark:text-emerald-500 text-base flex flex-wrap items-center gap-2 transition-colors">
                  <span className="bg-[#059669] text-white text-[9px] font-sans font-bold px-2 py-0.5 rounded uppercase">
                    Bíblico
                  </span>
                  {pilar}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{desc}</p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <BookMarked className="w-3.5 h-3.5" />
                  Aulas relacionadas
                </span>
                <span className="text-[#059669] dark:text-emerald-500 group-hover:translate-x-1 transition-transform">
                  Ver aulas →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dica Pastoral */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-center text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 flex items-center justify-center gap-2 shadow-inner">
          <Sparkles className="w-4 h-4 text-[#059669] dark:text-emerald-500" />
          <span>
            <strong>Dica Pastoral:</strong> Ao selecionar um pilar conceitual, você será direcionado ao Cronograma já filtrado com as lições correspondentes.
          </span>
        </div>

      </div>
    </div>
  );
};
