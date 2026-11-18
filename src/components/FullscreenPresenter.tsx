import React, { useEffect } from 'react';
import { Lesson } from '../types';
import { getSlideDataForLesson } from '../data/lessons';
import * as Icons from 'lucide-react';
import { X, ChevronLeft, ChevronRight, Landmark } from 'lucide-react';

interface FullscreenPresenterProps {
  lesson: Lesson;
  currentSlide: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onClose: () => void;
}

export const FullscreenPresenter: React.FC<FullscreenPresenterProps> = ({
  lesson,
  currentSlide,
  onNextSlide,
  onPrevSlide,
  onClose,
}) => {
  const slides = getSlideDataForLesson(lesson);
  const slide = slides[currentSlide] || slides[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNextSlide();
      if (e.key === 'ArrowLeft') onPrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNextSlide, onPrevSlide]);

  return (
    <div
      id="fullscreen-presenter-overlay"
      className="fixed inset-0 bg-[#004b3c] dark:bg-[#002f25] text-white z-50 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
    >
      {/* Topo do Projetor */}
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white">
            {lesson.iconName && (() => {
              const Icon = Icons[lesson.iconName as keyof typeof Icons] as React.ElementType;
              return Icon ? <Icon className="w-5 h-5" /> : <Landmark className="w-5 h-5" />;
            })()}
            {!lesson.iconName && <Landmark className="w-5 h-5" />}
          </div>
          <span className="font-serif text-lg tracking-wider text-stone-200">
            EBD 2027 — {lesson.titulo}
          </span>
        </div>
        <button
          id="btn-close-fullscreen-presenter"
          onClick={onClose}
          className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
        >
          <X className="w-4 h-4" />
          Sair do Modo Projetor [ESC]
        </button>
      </div>

      {/* Conteúdo Central */}
      <div className="flex-grow flex items-center justify-center max-w-5xl mx-auto my-8 w-full">
        <div className="flex flex-col items-center justify-center w-full text-center space-y-8">
          
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono bg-slate-800/80 px-4 py-1.5 rounded-full border border-emerald-500/30">
            {slide.conceptTitle}
          </span>

          <h2 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#fef3c7] leading-tight">
            {slide.title}
          </h2>

          <ul className="space-y-6 text-stone-200 text-lg sm:text-2xl leading-relaxed font-serif text-left inline-block max-w-3xl mx-auto w-full">
            {slide.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="border-l-4 border-[#059669] dark:border-emerald-500 pl-6 py-2 bg-slate-800/40 rounded-r-xl"
                dangerouslySetInnerHTML={{ __html: bullet }}
              />
            ))}
          </ul>

        </div>
      </div>

      {/* Barra Inferior de Navegação */}
      <div className="flex justify-between items-center border-t border-slate-700 pt-4">
        <button
          id="btn-fullscreen-prev-slide"
          onClick={onPrevSlide}
          disabled={currentSlide === 0}
          className={`bg-slate-800 hover:bg-slate-700 text-stone-200 px-6 py-3 rounded-lg text-xs font-bold transition-all border border-slate-700 flex items-center gap-2 cursor-pointer ${
            currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Slide Anterior
        </button>

        <div className="text-xs font-mono text-slate-400">
          Slide <span className="text-white font-bold">{currentSlide + 1}</span> de {slides.length}
        </div>

        <button
          id="btn-fullscreen-next-slide"
          onClick={onNextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`bg-[#059669] hover:bg-[#047857] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
            currentSlide === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          Próximo Slide
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
