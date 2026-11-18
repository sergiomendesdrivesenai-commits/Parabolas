import React from 'react';
import { Lesson, FilterType } from '../types';
import * as Icons from 'lucide-react';
import { Search, Star, CheckCircle, Presentation, ArrowRight, BookOpen, Sparkles, FileDown, Library } from 'lucide-react';
import { useFirebase } from '../hooks/useFirebase';
import { downloadOrPrintLessonPdf, downloadOrPrintCompleteEbookPdf } from '../utils/lessonPdfGenerator';

interface CronogramaTabProps {
  lessons: Lesson[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  favoritos: number[];
  onToggleFavorito: (semana: number) => void;
  concluidos: number[];
  onToggleConcluido: (semana: number) => void;
  onOpenDetails: (lesson: Lesson) => void;
  onGoToSlides: (semana: number) => void;
}

export const CronogramaTab: React.FC<CronogramaTabProps> = ({
  lessons,
  searchTerm,
  onSearchChange,
  currentFilter,
  onFilterChange,
  favoritos,
  onToggleFavorito,
  concluidos,
  onToggleConcluido,
  onOpenDetails,
  onGoToSlides,
}) => {
  const { overrides } = useFirebase();

  const filteredLessons = lessons.filter(aula => {
    let matchesFilter = true;
    if (currentFilter === 'revista') matchesFilter = aula.bloco === 'revista';
    else if (currentFilter === 'consolidação') matchesFilter = aula.bloco === 'consolidação';
    else if (currentFilter === 'favoritos') matchesFilter = favoritos.includes(aula.semana);

    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesFilter;

    const matchesSearch =
      aula.titulo.toLowerCase().includes(term) ||
      aula.referencia.toLowerCase().includes(term) ||
      aula.doutrina.toLowerCase().includes(term) ||
      aula.foco.toLowerCase().includes(term) ||
      aula.verdadeCentral.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 no-print">
      
      {/* Banner de Destaque: Gerar E-book Completo (14 Lições em PDF Único) */}
      <div 
        id="banner-ebook-geral"
        className="bg-gradient-to-r from-[#00362c] via-[#004b3c] to-[#064e3b] text-white p-5 sm:p-6 rounded-2xl border border-emerald-700/60 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden"
      >
        <div className="space-y-1.5 max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Dossiê Completo EBD • 1º Semestre de 2027</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <span>E-book Geral: As Parábolas de Jesus (14 Lições)</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Gere e baixe em um <strong>único documento PDF</strong> todas as 14 lições do curso completas: inclui Capa Editorial solene, Sumário/Índice Geral, Contexto Histórico do Império Romano do Século I, Doutrina da Confissão de Fé de Westminster, esboços e perguntas de fixação.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-auto shrink-0">
          <button
            id="btn-gerar-ebook-geral-completo"
            onClick={() => downloadOrPrintCompleteEbookPdf(lessons)}
            className="w-full md:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-stone-900 font-bold text-sm shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="Gerar e Baixar Livro Completo em PDF Único (Capa, Índice e 14 Lições)"
          >
            <Library className="w-5 h-5 text-stone-900" />
            <span>Gerar E-book Completo (PDF Geral)</span>
          </button>
        </div>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
        
        {/* Campo de Busca */}
        <div className="relative w-full lg:w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </span>
          <input
            id="input-cronograma-busca"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquise parábola, passagem, palavra-chave ou doutrina..."
            className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-[#eadeca] dark:border-slate-700 focus:ring-2 focus:ring-[#059669] focus:border-[#059669] dark:border-emerald-500 outline-none text-sm transition-all bg-[#fdfcf7] dark:bg-slate-950 shadow-inner placeholder:text-slate-400"
          />
        </div>

        {/* Botões de Filtro */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
          <button
            id="filter-todos-btn"
            onClick={() => onFilterChange('todos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentFilter === 'todos'
                ? 'bg-[#004b3c] dark:bg-[#002f25] text-white border border-[#004b3c] dark:border-[#002f25] shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Todos ({lessons.length})
          </button>
          
          <button
            id="filter-revista-btn"
            onClick={() => onFilterChange('revista')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentFilter === 'revista'
                ? 'bg-[#004b3c] dark:bg-[#002f25] text-white border border-[#004b3c] dark:border-[#002f25] shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Revista Base (13)
          </button>

          <button
            id="filter-consolidacao-btn"
            onClick={() => onFilterChange('consolidação')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentFilter === 'consolidação'
                ? 'bg-[#004b3c] dark:bg-[#002f25] text-white border border-[#004b3c] dark:border-[#002f25] shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Consolidação (9)
          </button>

          <button
            id="filter-favoritos-btn"
            onClick={() => onFilterChange('favoritos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              currentFilter === 'favoritos'
                ? 'bg-[#004b3c] dark:bg-[#002f25] text-white border border-[#004b3c] dark:border-[#002f25] shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-emerald-500" />
            Favoritas ({favoritos.length})
          </button>

          <button
            id="header-download-general-ebook-btn"
            onClick={() => downloadOrPrintCompleteEbookPdf(lessons)}
            className="px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-900 shadow-xs cursor-pointer ml-auto sm:ml-0"
            title="Baixar Livro Completo com todas as 14 Lições em PDF Único"
          >
            <Library className="w-3.5 h-3.5 text-stone-900" />
            <span>E-book Geral (14 Lições)</span>
          </button>

          <button
            id="header-download-pdf-btn"
            onClick={() => {
              const target = filteredLessons[0] || lessons[0];
              const override = overrides[target.semana];
              downloadOrPrintLessonPdf(target, override?.pdfUrl, override?.pdfFileName);
            }}
            className="px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs cursor-pointer"
            title="Baixar Material / Dossiê em PDF da lição filtrada"
          >
            <FileDown className="w-3.5 h-3.5 text-white" />
            <span>Baixar Lição (PDF)</span>
          </button>
        </div>
      </div>

      {/* Listagem de Cartões das Aulas */}
      {filteredLessons.length === 0 ? (
        <div id="empty-state-lessons" className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-[#eadeca] dark:border-slate-700 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-[#059669] dark:text-emerald-500 mx-auto flex items-center justify-center mb-3">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#004b3c] dark:text-emerald-400">Nenhuma lição encontrada</h3>
          <p className="text-slate-500 dark:text-slate-400 font-serif mt-1 text-sm">
            Nenhuma lição coincide com os critérios de busca ou filtros selecionados.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              onFilterChange('todos');
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#059669] text-white text-xs font-bold rounded-lg hover:bg-[#047857] transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Limpar Filtros e Ver Todas as Lições
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="lessons-grid-container">
          {filteredLessons.map((aula) => {
            const isFav = favoritos.includes(aula.semana);
            const isConcluido = concluidos.includes(aula.semana);

            return (
              <div
                key={aula.semana}
                id={`card-lesson-semana-${aula.semana}`}
                className={`bg-white dark:bg-slate-900 rounded-2xl border ${
                  isConcluido
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/10 dark:bg-emerald-900/30'
                    : 'border-[#eadeca] dark:border-slate-700'
                } hover:border-[#059669] dark:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden`}
              >
                <div className="p-5 space-y-4">
                  {/* Topo do Card */}
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold text-[#059669] dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                      Semana {aula.semana} • {aula.data}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        id={`btn-toggle-concluido-${aula.semana}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleConcluido(aula.semana);
                        }}
                        title={isConcluido ? 'Desmarcar Concluído' : 'Marcar como Concluído'}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                          isConcluido
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-600 dark:text-slate-400 border-slate-200 hover:bg-emerald-50 dark:bg-emerald-900/30 hover:text-emerald-700 hover:border-emerald-200 dark:border-emerald-800'
                        }`}
                      >
                        <CheckCircle className={`w-3.5 h-3.5 ${isConcluido ? 'text-white' : 'text-slate-400'}`} />
                        {isConcluido ? 'Concluída' : 'Estudar'}
                      </button>

                      <button
                        id={`btn-toggle-favorito-${aula.semana}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorito(aula.semana);
                        }}
                        className="p-1.5 rounded-lg hover:bg-emerald-50 dark:bg-emerald-900/30 transition-all"
                        title={isFav ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                      >
                        <Star
                          className={`w-4 h-4 transition-transform hover:scale-110 ${
                            isFav
                              ? 'fill-amber-400 text-emerald-500'
                              : 'text-slate-300 hover:text-amber-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Título & Referência */}
                  <div className="space-y-1">
                    <h4
                      id={`title-lesson-${aula.semana}`}
                      className="font-serif font-bold text-lg text-[#004b3c] dark:text-emerald-400 hover:text-[#059669] dark:text-emerald-500 transition-all cursor-pointer leading-snug flex items-start gap-2"
                      onClick={() => onOpenDetails(aula)}
                    >
                      {aula.iconName && (() => {
                        const Icon = Icons[aula.iconName as keyof typeof Icons] as React.ElementType;
                        return Icon ? <Icon className="w-5 h-5 mt-0.5 shrink-0 text-[#059669] dark:text-emerald-500" /> : null;
                      })()}
                      <span>{aula.titulo}</span>
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-serif">
                        <BookOpen className="w-3.5 h-3.5 text-[#059669] dark:text-emerald-500" />
                        {aula.referencia}
                      </p>
                      <button
                        onClick={() => onOpenDetails(aula)}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all cursor-pointer"
                        title="Ver detalhes teológicos e pedagógicos da lição"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>

                  {/* Foco Pedagógico */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {aula.foco}
                  </p>

                  {/* Pilar Doutrinário */}
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-300">Pilar Doutrinário:</strong>{' '}
                    <span className="text-[#004b3c] dark:text-emerald-400 font-semibold">{aula.doutrina}</span>
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="bg-[#fdfcf7] dark:bg-slate-950 px-5 py-3 border-t border-slate-100 flex flex-wrap justify-between items-center gap-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-mono italic text-[11px] truncate max-w-[40%] sm:max-w-[50%]">
                    {aula.verdadeCentral}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {/* Botão de Download na Página Inicial junto com os outros */}
                    <button
                      id={`btn-download-card-${aula.semana}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const override = overrides[aula.semana];
                        downloadOrPrintLessonPdf(aula, override?.pdfUrl, override?.pdfFileName);
                      }}
                      className="text-emerald-700 dark:text-emerald-300 font-bold hover:text-emerald-800 dark:hover:text-emerald-200 transition-all flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 shadow-2xs cursor-pointer text-xs"
                      title={overrides[aula.semana]?.pdfUrl ? `Baixar arquivo PDF anexado (${overrides[aula.semana]?.pdfFileName || 'Lição'})` : 'Baixar / Imprimir Dossiê em PDF desta Lição'}
                    >
                      <FileDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Download</span>
                    </button>

                    <button
                      id={`btn-slides-card-${aula.semana}`}
                      onClick={() => onGoToSlides(aula.semana)}
                      className="text-[#004b3c] dark:text-emerald-400 font-bold hover:text-[#059669] dark:text-emerald-500 transition-all flex items-center gap-1"
                    >
                      <Presentation className="w-3.5 h-3.5" />
                      Slides
                    </button>
                    <button
                      id={`btn-detalhes-card-${aula.semana}`}
                      onClick={() => onOpenDetails(aula)}
                      className="text-[#059669] dark:text-emerald-500 font-bold hover:text-[#047857] flex items-center gap-1 transition-all"
                    >
                      Ver Detalhes
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
