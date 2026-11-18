import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import * as Icons from 'lucide-react';
import { X, Copy, Check, BookOpen, Landmark, Target, HeartHandshake, Presentation, UserCheck, FileDown } from 'lucide-react';
import { useFirebase } from '../hooks/useFirebase';
import { downloadOrPrintLessonPdf } from '../utils/lessonPdfGenerator';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  onGoToRoteiro: (semana: number) => void;
  onGoToSlides: (semana: number) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  onClose,
  onGoToRoteiro,
  onGoToSlides,
}) => {
  const { overrides } = useFirebase();
  const [copied, setCopied] = useState(false);
  const [copiedScripture, setCopiedScripture] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!lesson) return null;

  const handleCopy = () => {
    const textToCopy = `📍 EBD IP Anápolis 2027
📖 Aula: ${lesson.titulo}
Texto Bíblico: ${lesson.referencia}
Teologia: ${lesson.doutrina}
Verdade Central: ${lesson.verdadeCentral}

1. Introdução:
${lesson.introducao}

2. Esboço:
${lesson.esboco}

3. Aplicação:
${lesson.aplicacao}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyScriptureOnly = () => {
    const scriptureText = `📖 ${lesson.titulo}\nPassagem Bíblica: ${lesson.referencia}\nTema: ${lesson.doutrina}\nVerdade Central: ${lesson.verdadeCentral}`;
    navigator.clipboard.writeText(scriptureText).then(() => {
      setCopiedScripture(true);
      setTimeout(() => setCopiedScripture(false), 2000);
    });
  };

  return (
    <div
      id="modal-lesson-detail-backdrop"
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print animate-fade-in"
      onClick={onClose}
    >
      <div
        id="modal-lesson-detail-box"
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full border-t-8 border-[#059669] dark:border-emerald-500 overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Topo do Modal */}
        <div className="p-6 sm:p-8 space-y-5 overflow-y-auto custom-scrollbar flex-grow">
          
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-[#059669] dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
              Domingo da Semana {lesson.semana} • {lesson.data}
            </span>
            <button
              id="btn-close-lesson-modal"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:text-slate-400 transition-all p-1 rounded-lg hover:bg-slate-100 dark:bg-slate-800 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#004b3c] dark:text-emerald-400 leading-tight flex items-start gap-2">
              {lesson.iconName && (() => {
                const Icon = Icons[lesson.iconName as keyof typeof Icons] as React.ElementType;
                return Icon ? <Icon className="w-6 h-6 sm:w-7 sm:h-7 mt-0.5 shrink-0 text-[#059669] dark:text-emerald-500" /> : null;
              })()}
              <span>{lesson.titulo}</span>
            </h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-serif flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#059669] dark:text-emerald-500" />
              Passagem Bíblica: {lesson.referencia}
            </p>
          </div>

          {/* Seção: Referência das Escrituras Sagradas */}
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-[#fbf9f4] dark:bg-slate-950 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#004b3c] text-white flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-serif">
                  Texto Sagrado da Lição
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 font-serif">
                  {lesson.referencia}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Leitura expositiva recomendada diretamente na Bíblia Sagrada junto à turma de EBD.
                </p>
              </div>
            </div>

            <button
              id="btn-copy-scripture-ref"
              onClick={handleCopyScriptureOnly}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800 text-[#004b3c] dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0 self-start sm:self-center"
              title="Copiar referência bíblica e dados da lição"
            >
              {copiedScripture ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Referência</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            
            <div className="p-4 bg-[#fdfcf7] dark:bg-slate-950 rounded-xl border border-[#eadeca] dark:border-slate-700 space-y-1 shadow-sm">
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#00362b] dark:text-emerald-200 uppercase tracking-widest">
                <Landmark className="w-3.5 h-3.5 text-[#059669] dark:text-emerald-500" />
                Enquadramento Doutrinário
              </div>
              <p className="text-sm font-bold text-[#059669] dark:text-emerald-500 font-serif">
                {lesson.doutrina}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {lesson.doutrinaDesc}
              </p>
            </div>

            <div className="p-4 bg-[#fdfcf7] dark:bg-slate-950 rounded-xl border border-[#eadeca] dark:border-slate-700 space-y-1 shadow-sm">
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#00362b] dark:text-emerald-200 uppercase tracking-widest">
                <Target className="w-3.5 h-3.5 text-[#059669] dark:text-emerald-500" />
                Alvo Pedagógico Principal
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {lesson.foco}
              </p>
            </div>

          </div>

          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800/50 space-y-1.5 shadow-inner">
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-widest">
              <HeartHandshake className="w-3.5 h-3.5 text-[#059669] dark:text-emerald-500" />
              Aplicação Prática (Conexão Anápolis)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {lesson.aplicacao}
            </p>
          </div>

          {/* Ações Rápidas Internas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <button
              id={`modal-btn-download-${lesson.semana}`}
              onClick={() => {
                const override = overrides[lesson.semana];
                downloadOrPrintLessonPdf(lesson, override?.pdfUrl, override?.pdfFileName);
              }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              title={overrides[lesson.semana]?.pdfUrl ? 'Baixar arquivo PDF desta lição' : 'Baixar / Imprimir Dossiê em PDF desta Lição'}
            >
              <FileDown className="w-4 h-4 text-emerald-100" />
              Baixar PDF da Aula
            </button>
            <button
              id={`modal-btn-roteiro-${lesson.semana}`}
              onClick={() => onGoToRoteiro(lesson.semana)}
              className="px-4 py-2.5 bg-[#f5f3e9] dark:bg-slate-800 hover:bg-[#eadeca] dark:hover:bg-slate-700 text-[#004b3c] dark:text-emerald-400 text-xs font-bold rounded-xl border border-[#eadeca] dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#059669] dark:text-emerald-500" />
              Gerar Roteiro
            </button>
            <button
              id={`modal-btn-slides-${lesson.semana}`}
              onClick={() => onGoToSlides(lesson.semana)}
              className="px-4 py-2.5 bg-[#004b3c] dark:bg-[#002f25] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Presentation className="w-4 h-4" />
              Ver Slides
            </button>
          </div>

        </div>

        {/* Rodapé do Modal */}
        <div className="bg-[#fdfcf7] dark:bg-slate-950 px-6 py-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            {lesson.verdadeCentral}
          </span>
          <button
            id="btn-copy-modal-summary"
            onClick={handleCopy}
            className={`font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              copied ? 'text-emerald-700 font-bold' : 'text-[#059669] dark:text-emerald-500 hover:text-[#047857]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copiar Detalhes da Lição
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
