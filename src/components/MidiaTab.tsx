import React, { useState } from 'react';
import { Lesson } from '../types';
import { useFirebase } from '../hooks/useFirebase';
import { Video, MessageSquare, ExternalLink, Info, FileDown, FileText, Download } from 'lucide-react';

interface MidiaTabProps {
  lessons: Lesson[];
}

export const MidiaTab: React.FC<MidiaTabProps> = ({ lessons }) => {
  const { overrides, loading } = useFirebase();
  const [selectedLesson, setSelectedLesson] = useState<number>(1);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Carregando conteúdos...</div>;
  }

  const currentOverride = overrides[selectedLesson];
  const hasMedia = !!currentOverride?.youtubeLink;
  const hasMessage = !!currentOverride?.teacherMessage;
  const hasPdf = !!currentOverride?.pdfUrl;

  // Extract YouTube Video ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = hasMedia ? getYoutubeId(currentOverride.youtubeLink!) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-blue-50 dark:bg-slate-900 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/50 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Mídia & Recados
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Selecione uma lição para ver os materiais em vídeo e recados do seu professor.
          </p>
        </div>
        <select
          value={selectedLesson}
          onChange={(e) => setSelectedLesson(Number(e.target.value))}
          className="w-full sm:w-auto p-3 pr-8 bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
        >
          {lessons.map(lesson => (
            <option key={lesson.semana} value={lesson.semana}>
              Semana {lesson.semana} - {lesson.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recados */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm h-full">
            <h3 className="text-lg font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4 pb-2 border-b border-stone-100 dark:border-slate-800">
              <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Recados do Professor
            </h3>
            
            {hasMessage ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-slate-700 dark:text-stone-300 whitespace-pre-line text-sm leading-relaxed">
                  {currentOverride.teacherMessage}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                <Info className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Nenhum recado adicionado para esta lição.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Material em Vídeo
              </h3>
              {hasMedia && (
                <a
                  href={currentOverride.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  Abrir no YouTube <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {hasMedia && videoId ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner flex-1">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center opacity-60 bg-stone-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-stone-200 dark:border-slate-700">
                <Video className="w-12 h-12 text-slate-400 mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                  O professor ainda não disponibilizou nenhum link de vídeo para o estudo desta semana.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Material em PDF para Download */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>Material Didático em PDF</span>
              {hasPdf && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Disponível
                </span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              {hasPdf
                ? `Arquivo da Semana ${selectedLesson}: ${currentOverride.pdfFileName || 'Estudo Complementar'}`
                : `O professor ainda não disponibilizou o arquivo PDF desta lição.`}
            </p>
          </div>
        </div>

        {hasPdf ? (
          <a
            href={currentOverride.pdfUrl}
            download={currentOverride.pdfFileName || `EBD-Licao-${selectedLesson}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors text-sm cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Baixar Arquivo PDF</span>
          </a>
        ) : (
          <div className="text-xs text-stone-400 italic px-3 py-2 bg-stone-100 dark:bg-slate-800 rounded-lg">
            Aguardando envio pelo professor
          </div>
        )}
      </div>
    </div>
  );
};
