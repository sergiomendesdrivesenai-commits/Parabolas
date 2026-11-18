import React from 'react';
import { Lesson } from '../types';
import { getSlideDataForLesson } from '../data/lessons';
import { ArrowLeft, Presentation, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlidesTabProps {
  lessons: Lesson[];
  activeLessonSemana: number;
  onSelectLesson: (semana: number) => void;
  currentSlide: number;
  onSelectSlide: (slideIdx: number) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onOpenFullscreen: () => void;
  onReturnToCronograma: () => void;
}

export const SlidesTab: React.FC<SlidesTabProps> = ({
  lessons,
  activeLessonSemana,
  onSelectLesson,
  currentSlide,
  onSelectSlide,
  onNextSlide,
  onPrevSlide,
  onOpenFullscreen,
  onReturnToCronograma,
}) => {
  const currentLesson = lessons.find(a => a.semana === activeLessonSemana) || lessons[0];
  const slides = getSlideDataForLesson(currentLesson);
  const slide = slides[currentSlide] || slides[0];

  return (
    <div className="space-y-6 no-print max-w-5xl mx-auto">
      
      {/* Botão de Retorno */}
      <div>
        <button
          id="btn-voltar-cronograma-slides"
          onClick={onReturnToCronograma}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-emerald-500 hover:text-[#047857] transition-all bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Cronograma Inicial
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm space-y-6">
        
        {/* Barra Superior do Slide */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-200 dark:border-slate-700 pb-4 gap-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#004b3c] dark:text-emerald-400 flex items-center gap-2">
              <Presentation className="w-6 h-6 text-[#059669] dark:text-emerald-500" />
              Slides Sugeridos para Aula
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Apoio visual completo e temático focado na leitura clara e memorização em classe
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              id="select-slides-lesson"
              value={currentLesson.semana}
              onChange={(e) => onSelectLesson(Number(e.target.value))}
              className="text-xs p-2.5 rounded-lg border border-[#eadeca] dark:border-slate-700 focus:ring-2 focus:ring-[#059669] outline-none bg-stone-50 dark:bg-slate-800 font-semibold"
            >
              {lessons.map((aula) => (
                <option key={aula.semana} value={aula.semana}>
                  Semana {aula.semana} — {aula.titulo.substring(0, 32)}...
                </option>
              ))}
            </select>

            <button
              id="btn-abrir-modo-projetor"
              onClick={onOpenFullscreen}
              className="bg-[#004b3c] dark:bg-[#002f25] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Modo Projetor (Cheia)
            </button>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
              Slide <span className="text-[#004b3c] dark:text-emerald-400 font-bold">{currentSlide + 1}</span> de {slides.length}
            </div>
          </div>
        </div>

        {/* Container do Slide */}
        <div
          id="slide-card-container"
          className="min-h-[380px] bg-[#fdfcf7] dark:bg-slate-950 rounded-2xl border border-[#eadeca] dark:border-slate-700 overflow-hidden relative transition-all duration-300 shadow-inner flex flex-col justify-between"
        >
          <div className="p-6 sm:p-10 flex flex-col justify-between h-full w-full">
            <div className="space-y-6">
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#059669] dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded">
                  {slide.conceptTitle}
                </span>
              </div>

              <h4 className="font-serif font-bold text-2xl sm:text-3xl text-[#004b3c] dark:text-emerald-400 leading-tight border-b border-stone-200 dark:border-slate-700 pb-3">
                {slide.title}
              </h4>

              <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-serif">
                {slide.bullets.map((b, idx) => (
                  <li
                    key={idx}
                    className="border-l-4 border-[#059669] dark:border-emerald-500 pl-4 py-1 bg-white dark:bg-slate-900/70 rounded-r-lg"
                    dangerouslySetInnerHTML={{ __html: b }}
                  />
                ))}
              </ul>

            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-slate-700 text-xs text-stone-500 flex justify-between items-center mt-6">
              <span>Semana {currentLesson.semana} — {currentLesson.data}</span>
              <span className="font-semibold text-[#00362b] dark:text-emerald-200">
                {currentLesson.titulo.split('—')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Controles do Slide */}
        <div className="flex justify-between items-center pt-2">
          <button
            id="btn-slides-prev"
            onClick={onPrevSlide}
            disabled={currentSlide === 0}
            className={`bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer ${
              currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {/* Dots Indicadores */}
          <div className="flex gap-2" id="slides-dots-list">
            {slides.map((_, idx) => (
              <button
                key={idx}
                id={`dot-slide-${idx}`}
                onClick={() => onSelectSlide(idx)}
                aria-label={`Ir para Slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  idx === currentSlide
                    ? 'bg-[#059669] scale-125'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          <button
            id="btn-slides-next"
            onClick={onNextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`bg-[#059669] hover:bg-[#047857] text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1 shadow cursor-pointer ${
              currentSlide === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            Seguinte
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
