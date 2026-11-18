import React, { useState, useEffect } from 'react';
import { Lesson, TabType, FilterType } from './types';
import { AULAS } from './data/lessons';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { CronogramaTab } from './components/CronogramaTab';
import { PilaresTab } from './components/PilaresTab';
import { RoteiroTab } from './components/RoteiroTab';
import { SlidesTab } from './components/SlidesTab';
import { LessonDetailModal } from './components/LessonDetailModal';
import { FullscreenPresenter } from './components/FullscreenPresenter';
import { Footer } from './components/Footer';
import { JornalTab } from './components/JornalTab';
import { TimelineTab } from './components/TimelineTab';
import { TutorialModal } from './components/TutorialModal';
import { ProfessorTab } from './components/ProfessorTab';
import { MidiaTab } from './components/MidiaTab';
import { EbookTab } from './components/EbookTab';
import { useFirebase } from './hooks/useFirebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('cronograma');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('todos');
  const [activeLessonSemana, setActiveLessonSemana] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedModalLesson, setSelectedModalLesson] = useState<Lesson | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  const { appSettings } = useFirebase();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persistência de Favoritos e Concluídos via localStorage
  const [favoritos, setFavoritos] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ebd_favoritos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [concluidos, setConcluidos] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ebd_concluidos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ebd_favoritos', JSON.stringify(favoritos));
    } catch (e) {
      console.error(e);
    }
  }, [favoritos]);

  useEffect(() => {
    try {
      localStorage.setItem('ebd_concluidos', JSON.stringify(concluidos));
    } catch (e) {
      console.error(e);
    }
  }, [concluidos]);

  const handleToggleFavorito = (semana: number) => {
    setFavoritos(prev =>
      prev.includes(semana) ? prev.filter(s => s !== semana) : [...prev, semana]
    );
  };

  const handleToggleConcluido = (semana: number) => {
    setConcluidos(prev =>
      prev.includes(semana) ? prev.filter(s => s !== semana) : [...prev, semana]
    );
  };

  // Reset total e retorno à página inicial do cronograma
  const handleResetToHome = () => {
    setSearchTerm('');
    setCurrentFilter('todos');
    setActiveTab('cronograma');
  };

  const handleSelectPilar = (pilar: string) => {
    setSearchTerm(pilar);
    setCurrentFilter('todos');
    setActiveTab('cronograma');
  };

  const handleGoToSlides = (semana: number) => {
    setActiveLessonSemana(semana);
    setCurrentSlide(0);
    setActiveTab('pitch');
    setSelectedModalLesson(null);
  };

  const handleGoToRoteiro = (semana: number) => {
    setActiveLessonSemana(semana);
    setActiveTab('roteiro');
    setSelectedModalLesson(null);
  };

  const currentLesson = AULAS.find(a => a.semana === activeLessonSemana) || AULAS[0];

  const revistaCount = AULAS.filter(a => a.bloco === 'revista').length;
  const consolidacaoCount = AULAS.filter(a => a.bloco === 'consolidação').length;

  return (
    <div className="bg-[#fdfcf7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900 dark:text-emerald-100">
      
      {/* Header com Navegação */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onResetToHome={handleResetToHome}
        onOpenTutorial={() => setShowTutorial(true)}
        theme={theme}
        toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        headerImageUrl={appSettings.headerImageUrl}
      />

      {/* Resumo de Estatísticas e Progresso */}
      <StatsBar
        totalLessons={AULAS.length}
        revistaCount={revistaCount}
        consolidacaoCount={consolidacaoCount}
        concluidosCount={concluidos.length}
      />

      {/* Conteúdo Principal */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {activeTab === 'cronograma' && (
          <div id="content-cronograma">
            <CronogramaTab
              lessons={AULAS}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              favoritos={favoritos}
              onToggleFavorito={handleToggleFavorito}
              concluidos={concluidos}
              onToggleConcluido={handleToggleConcluido}
              onOpenDetails={(lesson) => setSelectedModalLesson(lesson)}
              onGoToSlides={handleGoToSlides}
            />
          </div>
        )}

        {activeTab === 'timeline' && (
          <div id="content-timeline">
            <TimelineTab
              lessons={AULAS}
              onSelectLessonForDetail={(lesson) => setSelectedModalLesson(lesson)}
              onGoToRoteiro={handleGoToRoteiro}
              onGoToSlides={handleGoToSlides}
            />
          </div>
        )}

        {activeTab === 'conceitos' && (
          <div id="content-conceitos">
            <PilaresTab
              onSelectPilar={handleSelectPilar}
              onReturnToCronograma={handleResetToHome}
            />
          </div>
        )}

        {activeTab === 'roteiro' && (
          <div id="content-roteiro">
            <RoteiroTab
              lessons={AULAS}
              activeLessonSemana={activeLessonSemana}
              onSelectLesson={(sem) => setActiveLessonSemana(sem)}
              onReturnToCronograma={handleResetToHome}
            />
          </div>
        )}

        {activeTab === 'pitch' && (
          <div id="content-pitch">
            <SlidesTab
              lessons={AULAS}
              activeLessonSemana={activeLessonSemana}
              onSelectLesson={(sem) => {
                setActiveLessonSemana(sem);
                setCurrentSlide(0);
              }}
              currentSlide={currentSlide}
              onSelectSlide={(idx) => setCurrentSlide(idx)}
              onNextSlide={() => setCurrentSlide(prev => Math.min(prev + 1, 2))}
              onPrevSlide={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              onOpenFullscreen={() => setIsFullscreen(true)}
              onReturnToCronograma={handleResetToHome}
            />
          </div>
        )}

        {activeTab === 'jornal' && (
          <div id="content-jornal" className="h-full">
            <JornalTab />
          </div>
        )}

        {activeTab === 'ebook' && (
          <div id="content-ebook" className="h-full">
            <EbookTab 
              lessons={AULAS} 
              onNavigateToMap={() => setActiveTab('timeline')}
              onNavigateToProfessor={() => setActiveTab('professor')}
            />
          </div>
        )}

        {activeTab === 'midia' && (
          <div id="content-midia" className="h-full">
            <MidiaTab lessons={AULAS} />
          </div>
        )}

        {activeTab === 'professor' && (
          <div id="content-professor" className="h-full">
            <ProfessorTab lessons={AULAS} />
          </div>
        )}

      </main>

      {/* Modal de Detalhes da Lição */}
      {selectedModalLesson && (
        <LessonDetailModal
          lesson={selectedModalLesson}
          onClose={() => setSelectedModalLesson(null)}
          onGoToRoteiro={handleGoToRoteiro}
          onGoToSlides={handleGoToSlides}
        />
      )}

      {/* Modo Apresentação Projetada em Tela Cheia */}
      {isFullscreen && (
        <FullscreenPresenter
          lesson={currentLesson}
          currentSlide={currentSlide}
          onNextSlide={() => setCurrentSlide(prev => Math.min(prev + 1, 2))}
          onPrevSlide={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          onClose={() => setIsFullscreen(false)}
        />
      )}

      {/* Modal de Tutorial/Guia */}
      {showTutorial && (
        <TutorialModal onClose={() => setShowTutorial(false)} />
      )}

      {/* Rodapé Litúrgico */}
      <Footer />
    </div>
  );
}
