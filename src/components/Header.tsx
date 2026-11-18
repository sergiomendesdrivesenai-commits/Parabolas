import React from 'react';
import { TabType } from '../types';
import { BookOpen, Calendar, Landmark, UserCheck, Presentation, Moon, Sun, Newspaper, History, HelpCircle, ShieldCheck, Video, BookText } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onResetToHome: () => void;
  onOpenTutorial: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  headerImageUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onResetToHome,
  onOpenTutorial,
  theme,
  toggleTheme,
  headerImageUrl
}) => {
  return (
    <header className="bg-[#004b3c] dark:bg-[#002f25] text-white border-b-4 border-[#059669] dark:border-emerald-500 shadow-liturgic no-print">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 sm:px-6 lg:px-8 flex flex-col gap-4">
        
        {/* Barra Superior: Logo e Título (Esquerda) e Imagem da Igreja + Controles (Direita) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          
          {/* Esquerda: Livro aberto e Título */}
          <div
            id="btn-header-logo-reset"
            onClick={onResetToHome}
            className="flex items-center gap-3 sm:gap-4 cursor-pointer group select-none transition-all duration-200"
            title="Ir para a Página Inicial (Limpar Filtros)"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-[#059669] dark:bg-emerald-900/30 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:bg-[#047857] transition-transform duration-200">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-white flex flex-wrap items-center justify-center sm:justify-start gap-2">
                Escola Bíblica Dominical
                <span className="text-[10px] sm:text-xs bg-[#059669] dark:bg-emerald-900/30 text-white font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-inner">
                  1º Sem/2027
                </span>
              </h1>
              <p className="text-[11px] sm:text-sm text-stone-300 dark:text-stone-400 font-serif italic mt-0.5">
                Igreja Presbiteriana de Anápolis
              </p>
            </div>
          </div>

          {/* Direita: Imagem Personalizada inserida pelo Professor + Guia e Tema */}
          <div className="flex items-center gap-3 sm:gap-4">
            {headerImageUrl && (
              <div 
                id="header-custom-image-box"
                className="h-12 sm:h-14 max-w-[150px] sm:max-w-[200px] px-2 py-1 flex items-center justify-center bg-white/10 dark:bg-black/20 rounded-xl border border-white/20 backdrop-blur-xs shadow-sm overflow-hidden"
                title="Imagem ou Logo da Igreja"
              >
                <img
                  src={headerImageUrl}
                  alt="Logo da Igreja"
                  className="max-h-full max-w-full object-contain rounded"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-2 bg-[#00362b] dark:bg-slate-900/50 p-1.5 rounded-full border border-[#059669]/30 dark:border-slate-700/50">
              <button
                onClick={onOpenTutorial}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-slate-200 hover:text-white"
                title="Como usar o aplicativo (Tutorial)"
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs font-semibold sm:hidden">Guia de Uso</span>
              </button>
              <div className="w-px h-5 bg-white/20"></div>
              <button 
                onClick={toggleTheme} 
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                title={theme === 'dark' ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />}
              </button>
            </div>
          </div>
        </div>

        {/* Abas de Navegação */}
        <nav className="flex flex-wrap justify-center gap-1.5 bg-[#00362b] dark:bg-slate-950 p-1.5 rounded-xl border border-slate-700/60 w-full">
          <button
            id="tab-cronograma-btn"
            onClick={() => onSelectTab('cronograma')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'cronograma'
                ? 'bg-[#059669] text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-white hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Cronograma
          </button>

          <button
            id="tab-timeline-btn"
            onClick={() => onSelectTab('timeline')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'bg-[#059669] text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-white hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <History className="w-4 h-4" />
            Timeline/Mapa
          </button>
          
          <button
            id="tab-conceitos-btn"
            onClick={() => onSelectTab('conceitos')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'conceitos'
                ? 'bg-[#059669] text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-white hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <Landmark className="w-4 h-4" />
            Pilares Doutrinários
          </button>

          <button
            id="tab-roteiro-btn"
            onClick={() => onSelectTab('roteiro')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'roteiro'
                ? 'bg-[#059669] text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-white hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Gerador de Roteiros
          </button>

          <button
            id="tab-pitch-btn"
            onClick={() => onSelectTab('pitch')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'pitch'
                ? 'bg-[#059669] text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-white hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <Presentation className="w-4 h-4" />
            Slides Sugeridos
          </button>
          <button
            id="tab-jornal-btn"
            onClick={() => onSelectTab('jornal')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'jornal'
                ? 'bg-[#059669] text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-white hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            O Publicano (Jornal)
          </button>
          
          <button
            id="tab-ebook-btn"
            onClick={() => onSelectTab('ebook')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'ebook'
                ? 'bg-[#059669] text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-white hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <BookText className="w-4 h-4" />
            E-book
          </button>

          <button
            id="tab-midia-btn"
            onClick={() => onSelectTab('midia')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'midia'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-blue-400 hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <Video className="w-4 h-4" />
            Mídia & Recados
          </button>

          <button
            id="tab-professor-btn"
            onClick={() => onSelectTab('professor')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'professor'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-300 dark:text-stone-400 hover:text-amber-400 hover:bg-[#004b3c] dark:bg-[#002f25]/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Área do Professor
          </button>
        </nav>
      </div>
    </header>
  );
};
