import React, { useState } from 'react';
import { ExternalLink, Printer, Maximize2, Minimize2, X } from 'lucide-react';

export const JornalTab: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-stone-100 dark:bg-slate-950">
        <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-serif font-bold text-[#004b3c] dark:text-emerald-400 ml-2">O Publicano</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-2 py-1 rounded font-bold">Modo Tela Cheia</span>
          </div>
          <div className="flex gap-2 pr-2">
            <button
              onClick={() => { 
                window.open('/jornal.html', '_blank')?.print();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#f5f3e9] dark:bg-slate-800 hover:bg-[#eadeca] dark:hover:bg-slate-700 text-[#004b3c] dark:text-emerald-400 text-sm font-bold rounded-lg border border-[#eadeca] dark:border-slate-700 transition-all shadow-sm"
              title="Imprimir"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              onClick={toggleExpand}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg transition-all shadow-sm"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Retornar</span>
            </button>
          </div>
        </div>
        <div className="flex-1 w-full h-full overflow-hidden">
          <iframe 
            src="/jornal.html" 
            title="O Publicano - Jornal de Apoio"
            className="w-full h-full border-none bg-white dark:bg-slate-900"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#004b3c] dark:text-emerald-400">O Publicano - Edição Histórica</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-serif">Visualizando o jornal de apoio para ilustrações e ambientação (Ano 30 d.C.).</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={toggleExpand}
            className="flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-800/50 text-sky-800 dark:text-sky-300 text-sm font-bold rounded-lg border border-sky-200 dark:border-sky-800/50 transition-all shadow-sm"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Expandir</span>
          </button>
          <a
            href="/jornal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#f5f3e9] dark:bg-slate-800 hover:bg-[#eadeca] dark:hover:bg-slate-700 text-[#004b3c] dark:text-emerald-400 text-sm font-bold rounded-lg border border-[#eadeca] dark:border-slate-700 transition-all shadow-sm"
            title="Abrir em Nova Aba"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => { 
               window.open('/jornal.html', '_blank')?.print();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-lg transition-all shadow-sm"
            title="Modo Impressão"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-[#eadeca] dark:border-slate-700 overflow-hidden shadow-sm min-h-[80vh]">
        <iframe 
          src="/jornal.html" 
          title="O Publicano - Jornal de Apoio"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};
