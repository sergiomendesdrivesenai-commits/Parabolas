import React, { useState } from 'react';
import { Lesson } from '../types';
import { BookText, BookOpen, MapPin, Compass, Landmark, Download, FileDown, FileText, ExternalLink, Users } from 'lucide-react';
import { WESTMINSTER_MAPPING } from '../data/westminster';
import { TIMELINE_DATA } from '../data/timelineData';
import { useFirebase } from '../hooks/useFirebase';
import { downloadOrPrintLessonPdf, downloadOrPrintCompleteEbookPdf } from '../utils/lessonPdfGenerator';
import { ParableSceneCutout } from './ParableSceneCutout';
import { WorldHistoryImmersion } from './WorldHistoryImmersion';

interface EbookTabProps {
  lessons: Lesson[];
  onNavigateToMap?: () => void;
  onNavigateToProfessor?: () => void;
}

export const EbookTab: React.FC<EbookTabProps> = ({ 
  lessons,
  onNavigateToMap,
  onNavigateToProfessor
}) => {
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const { overrides, isTeacher } = useFirebase();

  const currentLesson = lessons.find(l => l.semana === selectedLesson) || lessons[0];
  const westminsterData = WESTMINSTER_MAPPING[currentLesson.doutrina];
  
  // Buscar os dados de contexto histórico e localização (timeline) correspondentes à semana
  const timelineContext = TIMELINE_DATA.find(t => t.semana === currentLesson.semana);

  // PDF da Lição configurado pelo professor
  const currentOverride = overrides[currentLesson.semana];
  const hasPdf = !!currentOverride?.pdfUrl;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Controles de Seleção e Botão de Download */}
      <div className="bg-stone-50 dark:bg-slate-900/80 rounded-2xl p-4 sm:p-6 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BookText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            E-book da Lição
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Selecione uma lição para leitura contínua e estudo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(Number(e.target.value))}
            className="p-2.5 pr-8 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-xs text-sm cursor-pointer"
          >
            {lessons.map(lesson => (
              <option key={lesson.semana} value={lesson.semana}>
                Semana {lesson.semana} - {lesson.titulo.length > 25 ? lesson.titulo.substring(0, 25) + '...' : lesson.titulo}
              </option>
            ))}
          </select>

          {/* Botão de Download do PDF Geral (14 Lições) */}
          <button
            id="btn-download-pdf-general-ebook"
            onClick={() => {
              downloadOrPrintCompleteEbookPdf(lessons);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 rounded-xl font-bold shadow-sm hover:shadow-md transition-all text-xs sm:text-sm cursor-pointer shrink-0"
            title="Gerar e Baixar Livro Completo com todas as 14 Lições em PDF Único"
          >
            <BookOpen className="w-4 h-4 text-stone-950" />
            <span>E-book Completo (14 Lições)</span>
          </button>

          {/* Botão de Download do PDF desta Lição */}
          <button
            id="btn-download-pdf-ebook"
            onClick={() => {
              downloadOrPrintLessonPdf(currentLesson, currentOverride?.pdfUrl, currentOverride?.pdfFileName);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold shadow-sm hover:shadow-md transition-all text-xs sm:text-sm cursor-pointer shrink-0"
            title={hasPdf ? `Baixar arquivo PDF anexado: ${currentOverride?.pdfFileName || 'Material da Lição'}` : 'Baixar / Imprimir Dossiê Completo em PDF com Contexto Histórico'}
          >
            <FileDown className="w-4 h-4 text-emerald-200" />
            <span>{hasPdf ? 'Baixar PDF da Lição' : 'Baixar Dossiê em PDF'}</span>
          </button>

          {isTeacher && !hasPdf && onNavigateToProfessor && (
            <button
              id="btn-teacher-attach-pdf"
              onClick={onNavigateToProfessor}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-600 dark:text-stone-300 rounded-xl font-medium border border-stone-200 dark:border-slate-700 text-xs cursor-pointer transition-colors"
              title="Anexar arquivo PDF próprio no painel do professor"
            >
              <Download className="w-3.5 h-3.5 text-stone-400" />
              <span>+ Anexar PDF (Professor)</span>
            </button>
          )}
        </div>
      </div>

      {/* Livro Digital Contínuo */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-stone-200 dark:border-slate-800 overflow-hidden">
        
        {/* Cabeçalho do Livro */}
        <div className="bg-stone-100 dark:bg-slate-950 p-6 sm:p-12 border-b-4 border-emerald-800 dark:border-emerald-600 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="text-sm font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-widest">
              Escola Bíblica Dominical • Semana {currentLesson.semana}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              {currentLesson.titulo}
            </h1>
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300 px-4 py-2 rounded-lg font-serif font-bold text-base sm:text-lg border border-emerald-200 dark:border-emerald-800/60">
              📖 {currentLesson.referencia}
            </div>
          </div>

          {/* Botão de Download adicional no cabeçalho se houver PDF */}
          {hasPdf && (
            <div className="shrink-0 pt-2 sm:pt-0">
              <a
                href={currentOverride.pdfUrl}
                download={currentOverride.pdfFileName || `EBD-Licao-${currentLesson.semana}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md transition-all text-xs sm:text-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          )}
        </div>

        {/* Corpo do Livro */}
        <div className="p-6 sm:p-12 space-y-12">
          
          {/* Seção: Verdade Central */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full inline-block"></span>
              Verdade Central
            </h2>
            <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-serif leading-relaxed italic bg-stone-50 dark:bg-slate-800/50 p-6 rounded-xl border border-stone-100 dark:border-slate-700/50">
              "{currentLesson.verdadeCentral}"
            </p>
          </section>

          {/* Contexto Geográfico e Histórico / Cenário da Parábola com Recorte de Timeline e Mapa */}
          {timelineContext && (
            <section className="bg-sky-50/70 dark:bg-sky-950/30 p-5 sm:p-8 rounded-2xl border border-sky-100 dark:border-sky-800/40 space-y-6">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200 dark:border-sky-800 pb-3">
                 <h3 className="text-xl font-serif font-bold text-sky-900 dark:text-sky-300 flex items-center gap-2">
                    <Compass className="w-6 h-6 text-sky-700 dark:text-sky-400" />
                    Cenário da Parábola & Contexto Geográfico
                 </h3>
                 <span className="text-xs font-semibold px-3 py-1 bg-sky-200/80 dark:bg-sky-900/80 text-sky-800 dark:text-sky-200 rounded-full w-fit">
                    Etapa {timelineContext.etapaNumero} de 14 • {timelineContext.periodoLabel}
                 </span>
               </div>
               
               {/* Informações detalhadas do Cenário */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                 <div className="space-y-4">
                   <div className="flex items-start gap-3">
                     <Landmark className="w-5 h-5 text-sky-700 dark:text-sky-400 mt-1 shrink-0" />
                     <div>
                       <strong className="block text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wide">Região</strong>
                       <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{timelineContext.regiao}</span>
                     </div>
                   </div>
                   
                   <div className="flex items-start gap-3">
                     <MapPin className="w-5 h-5 text-sky-700 dark:text-sky-400 mt-1 shrink-0" />
                     <div>
                       <strong className="block text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wide">Local Específico</strong>
                       <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{timelineContext.localEspecifico}</span>
                     </div>
                   </div>

                   <div className="flex items-start gap-3">
                     <Users className="w-5 h-5 text-sky-700 dark:text-sky-400 mt-1 shrink-0" />
                     <div>
                       <strong className="block text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wide">Ouvintes / Interlocutores</strong>
                       <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed block mt-0.5">{timelineContext.interlocutores}</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-white/80 dark:bg-slate-900/80 p-5 rounded-xl border border-sky-200/80 dark:border-sky-800/60 shadow-2xs">
                   <strong className="block text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                     <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                     Cenário Histórico & Social da Parábola
                   </strong>
                   <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                     {timelineContext.contextoHistorico}
                   </p>
                 </div>
               </div>

               {/* RECORTE DE TIMELINE & MAPA DE ONDE O ALUNO ESTÁ */}
               <ParableSceneCutout 
                 timelineContext={timelineContext} 
                 onNavigateToMap={onNavigateToMap} 
               />
            </section>
          )}

          {/* DADOS HISTÓRICOS MUNDIAIS: O IMPÉRIO ROMANO & O MUNDO NO SÉCULO I */}
          <section>
            <WorldHistoryImmersion semana={currentLesson.semana} />
          </section>

          {/* Seção: Introdução */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full inline-block"></span>
              Introdução
            </h2>
            <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed text-justify">
              {currentLesson.introducao}
            </p>
          </section>

          {/* Seção: Esboço e Exegese */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full inline-block"></span>
              Esboço & Exegese
            </h2>
            <div className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed text-justify whitespace-pre-line bg-stone-50/50 dark:bg-slate-800/30 p-6 sm:p-8 rounded-2xl border border-stone-100 dark:border-slate-700/50">
              {currentLesson.esboco}
            </div>
          </section>

          {/* Seção: Aplicação Prática */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full inline-block"></span>
              Aplicação Prática
            </h2>
            <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed text-justify bg-emerald-50/50 dark:bg-emerald-900/10 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
              {currentLesson.aplicacao}
            </p>
          </section>

          {/* Seção: Doutrina e Westminster */}
          <section>
             <h2 className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
               <span className="w-1.5 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full inline-block"></span>
               Fundamento Doutrinário: {currentLesson.doutrina}
             </h2>
             <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed text-justify mb-6">
               {currentLesson.doutrinaDesc}
             </p>
             
             {westminsterData && (
               <div className="bg-amber-50 dark:bg-amber-900/20 p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-amber-800/40">
                 <h3 className="text-xl font-serif font-bold text-amber-900 dark:text-amber-500 mb-3 flex items-center gap-2">
                   <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-500" />
                   Confissão de Fé de Westminster
                 </h3>
                 <p className="text-lg text-slate-800 dark:text-slate-200 italic mb-4 text-justify">
                   "{westminsterData.confissao}"
                 </p>
                 <p className="text-sm font-bold text-amber-800 dark:text-amber-600 text-right mb-6">
                   — {westminsterData.capitulo}
                 </p>
                 
                 <div className="border-t border-amber-200/60 dark:border-amber-800/60 pt-5">
                    <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500 mb-2 uppercase tracking-wider">Base Bíblica de Apoio:</h4>
                    <p className="text-base text-slate-700 dark:text-slate-300 text-justify">
                      "{westminsterData.textoApoio}" <strong className="text-amber-800 dark:text-amber-500">({westminsterData.refApoio})</strong>
                    </p>
                 </div>
               </div>
             )}
          </section>

          {/* Card de Download de Material Complementar em PDF */}
          <section className="bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-800 dark:text-slate-100">
                  Material de Apoio em PDF
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                  {hasPdf
                    ? `Arquivo: ${currentOverride?.pdfFileName || `EBD-Semana-${currentLesson.semana}.pdf`}`
                    : 'Estudo em PDF e materiais de apoio disponibilizados pelo professor.'}
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-2">
              <button
                id="btn-bottom-download-pdf-ebook"
                onClick={() => {
                  downloadOrPrintLessonPdf(currentLesson, currentOverride?.pdfUrl, currentOverride?.pdfFileName);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                title={hasPdf ? `Baixar arquivo PDF: ${currentOverride?.pdfFileName}` : 'Baixar / Imprimir Dossiê Completo em PDF'}
              >
                <FileDown className="w-4 h-4" />
                <span>{hasPdf ? 'Baixar Arquivo PDF' : 'Baixar Dossiê em PDF'}</span>
              </button>

              {isTeacher && !hasPdf && onNavigateToProfessor && (
                <button
                  onClick={onNavigateToProfessor}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-stone-200 dark:bg-slate-800 hover:bg-stone-300 dark:hover:bg-slate-700 text-stone-700 dark:text-stone-300 text-sm font-semibold rounded-xl border border-stone-300 dark:border-slate-700 cursor-pointer transition-colors"
                  title="Anexar PDF personalizado no painel do professor"
                >
                  <Download className="w-4 h-4" />
                  <span>Painel do Professor</span>
                </button>
              )}
            </div>
          </section>

          {/* Seção: Perguntas */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full inline-block"></span>
              Perguntas para Reflexão
            </h2>
            <div className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed text-justify whitespace-pre-line pl-4 border-l-2 border-stone-200 dark:border-slate-700">
              {currentLesson.perguntas || "1. Como a verdade central desta lição se aplica à sua vida diária?\n2. Quais desafios você enfrenta para colocar os ensinamentos de hoje em prática?\n3. Compartilhe uma experiência em que Deus demonstrou este princípio na sua vida."}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

