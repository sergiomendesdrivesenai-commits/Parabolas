import React, { useState, useEffect, useRef } from 'react';
import { 
  TimelineEvent, 
  TIMELINE_DATA 
} from '../data/timelineData';
import { 
  MapTerrainSvg, 
  MapTheme, 
  MapLayers 
} from './MapTerrainSvg';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  MapPin, 
  Footprints, 
  Compass, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Layers,
  Search,
  Mountain,
  Sun,
  Moon,
  Scroll,
  X,
  Map as MapIcon
} from 'lucide-react';
import { Lesson } from '../types';

interface ParablesJourneyMapProps {
  onSelectLessonForDetail?: (lesson: Lesson) => void;
  onGoToRoteiro?: (semana: number) => void;
  onGoToSlides?: (semana: number) => void;
  lessons: Lesson[];
  selectedEventId?: string;
  onSelectEventId?: (id: string) => void;
}

export const ParablesJourneyMap: React.FC<ParablesJourneyMapProps> = ({
  onSelectLessonForDetail,
  onGoToRoteiro,
  onGoToSlides,
  lessons,
  selectedEventId,
  onSelectEventId
}) => {
  // Current active step index (0 to 18)
  const initialIndex = selectedEventId 
    ? Math.max(0, TIMELINE_DATA.findIndex(e => e.id === selectedEventId))
    : 0;

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tourSpeed, setTourSpeed] = useState<number>(5); // 3, 5, or 8 seconds
  const [timerSeconds, setTimerSeconds] = useState<number>(5);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [mapTheme, setMapTheme] = useState<MapTheme>('pergaminho');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [showLayersMenu, setShowLayersMenu] = useState<boolean>(false);

  // Map Pan and Zoom State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Layers visibility
  const [layers, setLayers] = useState<MapLayers>({
    roads: true,
    mountains: true,
    cities: true,
    landmarks: true,
    pins: true,
    trail: true
  });

  // Region filter focus
  const [regionFocus, setRegionFocus] = useState<'todos' | 'galileia' | 'pereia' | 'jerusalem'>('todos');
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [showScriptureInDossier, setShowScriptureInDossier] = useState<boolean>(false);

  // Studied local persistence
  const [studiedSteps, setStudiedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ebd_studied_parables');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const activeEvent = TIMELINE_DATA[currentIndex] || TIMELINE_DATA[0];

  // Play gentle harmonic chime using native Web Audio API
  const playReverentChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // Solfeggio / warm bell
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch {
      // Ignore audio restrictions
    }
  };

  // Sync outside selection
  useEffect(() => {
    if (selectedEventId) {
      const idx = TIMELINE_DATA.findIndex(e => e.id === selectedEventId);
      if (idx >= 0 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  }, [selectedEventId]);

  // Handle Step Selection with optional auto-pan centering
  const handleSelectStep = (index: number, autoCenter = true) => {
    if (index >= 0 && index < TIMELINE_DATA.length) {
      setCurrentIndex(index);
      playReverentChime();
      if (onSelectEventId) {
        onSelectEventId(TIMELINE_DATA[index].id);
      }

      // If zoomed in and autoCenter is requested, smoothly pan towards the coordinate
      if (autoCenter && zoom > 1.2) {
        const ev = TIMELINE_DATA[index];
        // Center around coordinate (300, 425 is middle of 600x850 SVG)
        const targetX = (300 - ev.mapCoord.x) * (zoom - 1);
        const targetY = (425 - ev.mapCoord.y) * (zoom - 1);
        setPan({
          x: Math.max(-250, Math.min(250, targetX)),
          y: Math.max(-350, Math.min(350, targetY))
        });
      }
    }
  };

  // Toggle study status
  const handleToggleStudied = (id: string) => {
    const updated = { ...studiedSteps, [id]: !studiedSteps[id] };
    setStudiedSteps(updated);
    try {
      localStorage.setItem('ebd_studied_parables', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Auto-tour loop with configurable speed
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          setCurrentIndex(curr => {
            const next = curr + 1 >= TIMELINE_DATA.length ? 0 : curr + 1;
            if (onSelectEventId) {
              onSelectEventId(TIMELINE_DATA[next].id);
            }
            playReverentChime();
            return next;
          });
          return tourSpeed;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, tourSpeed, onSelectEventId, soundEnabled]);

  // Navigation handlers
  const handlePrev = () => {
    const prev = currentIndex > 0 ? currentIndex - 1 : TIMELINE_DATA.length - 1;
    handleSelectStep(prev);
    setTimerSeconds(tourSpeed);
  };

  const handleNext = () => {
    const next = currentIndex < TIMELINE_DATA.length - 1 ? currentIndex + 1 : 0;
    handleSelectStep(next);
    setTimerSeconds(tourSpeed);
  };

  const handleRestart = () => {
    handleSelectStep(0);
    setTimerSeconds(tourSpeed);
  };

  // Camera Zoom Controls
  const handleZoomIn = () => {
    setZoom(z => Math.min(3.2, Number((z + 0.35).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom(z => {
      const nextZ = Math.max(1, Number((z - 0.35).toFixed(2)));
      if (nextZ === 1) setPan({ x: 0, y: 0 });
      return nextZ;
    });
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Camera Presets for key biblical regions
  const handleFocusRegionPreset = (region: 'todos' | 'galileia' | 'pereia' | 'jerusalem') => {
    setRegionFocus(region);
    switch (region) {
      case 'galileia':
        setZoom(2.2);
        setPan({ x: -120, y: 220 });
        handleSelectStep(0, false);
        break;
      case 'pereia':
        setZoom(1.9);
        setPan({ x: -150, y: -40 });
        handleSelectStep(7, false);
        break;
      case 'jerusalem':
        setZoom(2.4);
        setPan({ x: 80, y: -290 });
        handleSelectStep(15, false);
        break;
      case 'todos':
      default:
        handleResetView();
        break;
    }
  };

  // Mouse Drag to Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    // Bound pan
    const maxBound = (zoom - 1) * 300;
    setPan({
      x: Math.max(-maxBound, Math.min(maxBound, newX)),
      y: Math.max(-maxBound * 1.4, Math.min(maxBound * 1.4, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Filter events based on region
  const isEventVisible = (ev: TimelineEvent) => {
    if (regionFocus === 'todos') return true;
    if (regionFocus === 'galileia') return ev.periodo === 'galileia';
    if (regionFocus === 'pereia') return ev.periodo === 'pereia_judeia' && ev.regiao !== 'Jerusalém';
    if (regionFocus === 'jerusalem') return ev.regiao === 'Jerusalém' || ev.periodo === 'jerusalem_paixao';
    return true;
  };

  // Filtered search results
  const searchResults = searchQuery.trim().length > 1 
    ? TIMELINE_DATA.filter(ev => 
        ev.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.referencia.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.localEspecifico.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.subtitulo && ev.subtitulo.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // Progress stats
  const studiedCount = Object.values(studiedSteps).filter(Boolean).length;
  const progressPercent = Math.round((studiedCount / TIMELINE_DATA.length) * 100);

  // Pilgrim badge
  const getPilgrimBadge = () => {
    if (studiedCount >= 19) return { title: 'Testemunha da Ressurreição', color: 'text-amber-500 bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-800' };
    if (studiedCount >= 15) return { title: 'Peregrino de Jerusalém', color: 'text-rose-600 bg-rose-100 dark:bg-rose-950/70 border-rose-300 dark:border-rose-800' };
    if (studiedCount >= 8) return { title: 'Caminhante da Pereia', color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-800' };
    return { title: 'Discípulo da Galileia', color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800' };
  };

  const badge = getPilgrimBadge();

  // Trail SVG Paths
  const trailSvgPath = TIMELINE_DATA.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.mapCoord.x} ${curr.mapCoord.y}`;
    const prev = TIMELINE_DATA[idx - 1];
    const dx = curr.mapCoord.x - prev.mapCoord.x;
    const cx1 = prev.mapCoord.x + dx * 0.5;
    const cy1 = prev.mapCoord.y;
    const cx2 = prev.mapCoord.x + dx * 0.5;
    const cy2 = curr.mapCoord.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.mapCoord.x} ${curr.mapCoord.y}`;
  }, '');

  const completedTrailSvgPath = TIMELINE_DATA.slice(0, currentIndex + 1).reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.mapCoord.x} ${curr.mapCoord.y}`;
    const prev = TIMELINE_DATA[idx - 1];
    const dx = curr.mapCoord.x - prev.mapCoord.x;
    const cx1 = prev.mapCoord.x + dx * 0.5;
    const cy1 = prev.mapCoord.y;
    const cx2 = prev.mapCoord.x + dx * 0.5;
    const cy2 = curr.mapCoord.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.mapCoord.x} ${curr.mapCoord.y}`;
  }, '');

  // Altitude and geographical insights for the active stop
  const getGeographicalInsight = (ev: TimelineEvent) => {
    if (ev.regiao === 'Galileia') {
      return {
        altitude: '-210 metros (abaixo do nível do mar)',
        clima: 'Mediterrâneo ameno e úmido, fértil para oliveiras, trigo e pesca no lago de água doce.',
        distancia: 'Aprox. 130 km ao norte de Jerusalém (3 a 4 dias de marcha a pé pelos caminhos da Palestina).'
      };
    }
    if (ev.regiao === 'Pereia' || ev.regiao === 'Judeia / Jericó') {
      if (ev.localEspecifico.includes('Jericó')) {
        return {
          altitude: '-250 metros (Oásis mais baixo e antigo do mundo)',
          clima: 'Semiárido tropical, famoso pelas tamareiras, bálsamo aromático e fontes de água pura.',
          distancia: 'Apenas 27 km de Jerusalém, porém com uma subida violenta de 1.000 metros pelo deserto rochoso.'
        };
      }
      return {
        altitude: '+300 a +700 metros (Planalto oriental)',
        clima: 'Estepário e pastoril, refúgio seguro além do Rio Jordão fora da jurisdição direta de Pilatos.',
        distancia: 'Rota judaica alternativa para peregrinos que desciam ao Templo sem cruzar a hostil Samaria.'
      };
    }
    // Jerusalém
    return {
      altitude: '+750 a +826 metros (Monte das Oliveiras)',
      clima: 'Montanhoso e fresco, ventos do Mediterrâneo à tarde e noites frias de primavera na Páscoa.',
      distancia: 'Centro teológico e político de Israel; destino final da Paixão e Ressurreição do Senhor.'
    };
  };

  const geoInsight = getGeographicalInsight(activeEvent);

  const getRegionBadgeColor = (periodo: string) => {
    switch (periodo) {
      case 'galileia':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'pereia_judeia':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'jerusalem_paixao':
        return 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <div id="parables-journey-map-container" className="space-y-6">
      
      {/* ============================================================ */}
      {/* 1. BARRA SUPERIOR DE COMANDO DA PEREGRINAÇÃO                 */}
      {/* ============================================================ */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-[#eadeca] dark:border-slate-800 shadow-sm transition-all">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* Status do Aluno / Peregrino Bíblico */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-[#004b3c] text-white flex items-center justify-center shadow-md shrink-0">
              <Footprints className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Caminho Geográfico & Histórico
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.title}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
                A Rota das Parábolas de Jesus
              </h2>
            </div>
          </div>

          {/* Controles de Viagem do Discípulo & Auto-Tour */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
            
            {/* Campo de Busca Rápida de Parábolas */}
            <div className="relative">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-1.5 border border-stone-200 dark:border-slate-700">
                <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar parábola no mapa..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  className="bg-transparent text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none w-36 sm:w-44"
                />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(''); setShowSearchDropdown(false); }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Dropdown de Resultados da Busca */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute left-0 mt-1 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-stone-200 dark:border-slate-700 z-50 max-h-60 overflow-y-auto p-1.5 animate-fadeIn">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                    Parábolas Encontradas ({searchResults.length}):
                  </div>
                  {searchResults.map(result => {
                    const idx = TIMELINE_DATA.findIndex(e => e.id === result.id);
                    return (
                      <button
                        key={result.id}
                        onClick={() => {
                          handleSelectStep(idx, true);
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-all flex items-start gap-2 text-xs"
                      >
                        <span className="w-5 h-5 rounded-md bg-[#004b3c] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {result.etapaNumero}
                        </span>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                            {result.titulo}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            {result.referencia} • {result.regiao}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Som Ambiente / Harpa Bíblica Toggle */}
            <button
              id="journey-sound-toggle-btn"
              onClick={() => {
                const nextSound = !soundEnabled;
                setSoundEnabled(nextSound);
                if (nextSound) playReverentChime();
              }}
              title={soundEnabled ? "Som Ativado (clique para silenciar)" : "Ativar Efeito Sonoro Sagrado ao Mudar de Parada"}
              className={`p-2 rounded-xl text-xs transition-all active:scale-95 border ${
                soundEnabled 
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-stone-200 dark:border-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Botão Anterior */}
            <button
              id="journey-prev-btn"
              onClick={handlePrev}
              title="Parábola Anterior"
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 border border-stone-200 dark:border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Play / Pause Auto-Tour */}
            <button
              id="journey-play-tour-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pausar Peregrinação" : "Iniciar Caminho Automático"}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                isPlaying 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse' 
                  : 'bg-[#004b3c] hover:bg-[#00382d] text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar ({timerSeconds}s)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Percorrer Caminho</span>
                </>
              )}
            </button>

            {/* Seletor de Velocidade do Tour */}
            {isPlaying && (
              <select
                value={tourSpeed}
                onChange={(e) => {
                  const spd = Number(e.target.value);
                  setTourSpeed(spd);
                  setTimerSeconds(spd);
                }}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-xl px-2 py-2 border border-stone-200 dark:border-slate-700"
              >
                <option value={3}>3s (Rápido)</option>
                <option value={5}>5s (Padrão)</option>
                <option value={8}>8s (Contemplativo)</option>
              </select>
            )}

            {/* Botão Próximo */}
            <button
              id="journey-next-btn"
              onClick={handleNext}
              title="Próxima Parábola"
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span className="hidden sm:inline">Próxima</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Reiniciar */}
            <button
              id="journey-restart-btn"
              onClick={handleRestart}
              title="Voltar ao Início na Galileia"
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs transition-all active:scale-95 border border-stone-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Barra de Progresso no Caminho */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="font-bold text-[#004b3c] dark:text-emerald-400">
                Etapa {currentIndex + 1} de {TIMELINE_DATA.length}
              </span>
              • {activeEvent.localEspecifico.split('—')[0]}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-mono">
              {studiedCount} de {TIMELINE_DATA.length} estudadas ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / TIMELINE_DATA.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Barra de Ferramentas do Mapa: Estilos + Câmera + Camadas */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          
          {/* Seletor de Estilos de Mapa (Pergaminho / Relevo / Noturno) */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-stone-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase px-2">
              Estilo:
            </span>
            <button
              id="theme-pergaminho-btn"
              onClick={() => setMapTheme('pergaminho')}
              className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                mapTheme === 'pergaminho'
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>Pergaminho</span>
            </button>
            <button
              id="theme-relevo-btn"
              onClick={() => setMapTheme('relevo')}
              className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                mapTheme === 'relevo'
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Relevo 3D</span>
            </button>
            <button
              id="theme-noturno-btn"
              onClick={() => setMapTheme('noturno')}
              className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                mapTheme === 'noturno'
                  ? 'bg-slate-900 text-cyan-300 border border-slate-700 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Noite & Tochas</span>
            </button>
          </div>

          {/* Atalhos Rápidos de Câmera & Região */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase px-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              Foco:
            </span>
            <button
              onClick={() => handleFocusRegionPreset('todos')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                regionFocus === 'todos' && zoom === 1
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Toda Terra Santa
            </button>
            <button
              onClick={() => handleFocusRegionPreset('galileia')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                regionFocus === 'galileia'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              1. Galileia (Zoom)
            </button>
            <button
              onClick={() => handleFocusRegionPreset('pereia')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                regionFocus === 'pereia'
                  ? 'bg-amber-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              2. Pereia & Jericó
            </button>
            <button
              onClick={() => handleFocusRegionPreset('jerusalem')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                regionFocus === 'jerusalem'
                  ? 'bg-rose-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              3. Jerusalém
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. GRID PRINCIPAL: O MAPA CARTOGRÁFICO + PAINEL DA PARADA   */}
      {/* ============================================================ */}
      <div className={`grid grid-cols-1 ${isMaximized ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-6 items-start transition-all`}>
        
        {/* COLUNA ESQUERDA: O MAPA ILUSTRADO DA PALESTINA (SVG COM ZOOM & PAN) */}
        <div className={`${isMaximized ? 'lg:col-span-1' : 'lg:col-span-6 xl:col-span-7'} bg-[#fdfbf7] dark:bg-slate-950 rounded-2xl border border-[#e6dbc8] dark:border-slate-800 p-4 sm:p-5 shadow-sm overflow-hidden relative transition-all`}>
          
          {/* Barra Superior do Canvas do Mapa */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-slate-800 dark:text-slate-200 tracking-wide flex items-center gap-1.5">
                <MapIcon className="w-3.5 h-3.5 text-emerald-600" />
                MAPA REALISTA DA PALESTINA BÍBLICA
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-stone-200 dark:bg-slate-800 text-stone-700 dark:text-stone-300 rounded font-mono">
                28 — 30 d.C.
              </span>
            </div>

            {/* Controles de Câmera e Camadas Flutuantes */}
            <div className="flex items-center gap-1.5">
              
              {/* Menu de Camadas Dropdown */}
              <div className="relative">
                <button
                  id="toggle-layers-btn"
                  onClick={() => setShowLayersMenu(!showLayersMenu)}
                  title="Gerenciar Camadas do Mapa"
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                    showLayersMenu
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Camadas</span>
                </button>

                {showLayersMenu && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-stone-200 dark:border-slate-700 p-3 z-50 text-xs space-y-2 animate-fadeIn">
                    <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 uppercase tracking-wider pb-1 border-b border-stone-100 dark:border-slate-800">
                      Camadas Visíveis
                    </div>
                    
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700 dark:text-slate-300">Pinos das Parábolas</span>
                      <input
                        type="checkbox"
                        checked={layers.pins}
                        onChange={(e) => setLayers({ ...layers, pins: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700 dark:text-slate-300">Trilha de Jesus</span>
                      <input
                        type="checkbox"
                        checked={layers.trail}
                        onChange={(e) => setLayers({ ...layers, trail: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700 dark:text-slate-300">Estradas Romanas</span>
                      <input
                        type="checkbox"
                        checked={layers.roads}
                        onChange={(e) => setLayers({ ...layers, roads: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700 dark:text-slate-300">Relevo & Montes</span>
                      <input
                        type="checkbox"
                        checked={layers.mountains}
                        onChange={(e) => setLayers({ ...layers, mountains: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700 dark:text-slate-300">Marcos Históricos</span>
                      <input
                        type="checkbox"
                        checked={layers.landmarks}
                        onChange={(e) => setLayers({ ...layers, landmarks: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                title="Ampliar Mapa"
                className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-stone-200 dark:border-slate-700 shadow-xs"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                title="Reduzir Zoom"
                className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-stone-200 dark:border-slate-700 shadow-xs"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              {/* Reset Zoom */}
              {zoom > 1 && (
                <button
                  onClick={handleResetView}
                  title="Restaurar Visão Padrão"
                  className="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-lg border border-amber-300 font-mono text-[10px] font-bold"
                >
                  {zoom.toFixed(1)}x (Reset)
                </button>
              )}

              {/* Maximizar / Minimizar Área do Mapa */}
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? "Reduzir Mapa" : "Expandir Mapa para Modo Amplo"}
                className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-stone-200 dark:border-slate-700 shadow-xs"
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Canvas do Mapa SVG Interativo com Suporte a Pan e Zoom Suave */}
          <div 
            id="map-viewport-frame"
            className={`relative w-full aspect-[600/850] rounded-xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-inner ${
              zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Contêiner de Transformação com Transição Animada */}
            <div
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
                width: '100%',
                height: '100%'
              }}
            >
              <MapTerrainSvg
                theme={mapTheme}
                layers={layers}
                currentIndex={currentIndex}
                hoveredEventId={hoveredEventId}
                studiedSteps={studiedSteps}
                isEventVisible={isEventVisible}
                onSelectStep={(idx) => handleSelectStep(idx, true)}
                onHoverEvent={(id) => setHoveredEventId(id)}
                trailSvgPath={trailSvgPath}
                completedTrailSvgPath={completedTrailSvgPath}
              />
            </div>

            {/* Dica de Interatividade Flutuante no canto inferior */}
            <div className="absolute bottom-2 left-2 pointer-events-none text-[10px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium">
              {zoom > 1 ? "Arraste com o mouse para explorar o terreno" : "Clique nos números ou use os botões para navegar"}
            </div>
          </div>

          {/* Legenda de Fases com Cores */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-200 dark:border-slate-800 text-[11px]">
            <div 
              onClick={() => handleFocusRegionPreset('galileia')}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline"
            >
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">1. Galileia (1-7)</span>
            </div>
            <div 
              onClick={() => handleFocusRegionPreset('pereia')}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline"
            >
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
              <span className="truncate">2. Pereia (8-15)</span>
            </div>
            <div 
              onClick={() => handleFocusRegionPreset('jerusalem')}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline"
            >
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
              <span className="truncate">3. Jerusalém (16-19)</span>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: O DOSSIÊ DA PARADA SELECIONADA */}
        <div className={`${isMaximized ? 'lg:col-span-1' : 'lg:col-span-6 xl:col-span-5'} space-y-4`}>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-[#eadeca] dark:border-slate-800 shadow-sm relative overflow-hidden">
            
            {/* Faixa Superior com Número e Fases */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#004b3c] to-emerald-800 text-white flex items-center justify-center font-bold text-base font-serif shadow-sm">
                  {activeEvent.etapaNumero}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Parada {activeEvent.etapaNumero} de {TIMELINE_DATA.length}
                  </span>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border inline-block mt-0.5 ${getRegionBadgeColor(activeEvent.periodo)}`}>
                    {activeEvent.periodoLabel}
                  </span>
                </div>
              </div>

              {/* Botão de Marcar como Estudada / Checkmark */}
              <button
                id="toggle-studied-btn"
                onClick={() => handleToggleStudied(activeEvent.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                  studiedSteps[activeEvent.id]
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-[#004b3c] dark:text-emerald-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-300'
                }`}
              >
                {studiedSteps[activeEvent.id] ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Estudada</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span>Marcar Aprendida</span>
                  </>
                )}
              </button>
            </div>

            {/* Título e Subtítulo da Parábola */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              {activeEvent.titulo}
            </h3>
            {activeEvent.subtitulo && (
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 font-medium mt-1">
                {activeEvent.subtitulo}
              </p>
            )}

            {/* Metadados Geográficos e Temporais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="bg-[#fcfaf7] dark:bg-slate-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-slate-700/60 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Local Bíblico:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 leading-snug block">{activeEvent.localEspecifico}</span>
                </div>
              </div>

              <div className="bg-[#fcfaf7] dark:bg-slate-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-slate-700/60 flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Época e Ano:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 leading-snug block">{activeEvent.anoAprox}</span>
                </div>
              </div>

              <div className="bg-[#fcfaf7] dark:bg-slate-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-slate-700/60 flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Texto Sagrado:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px] leading-snug block">{activeEvent.referencia}</span>
                </div>
              </div>

              <div className="bg-[#fcfaf7] dark:bg-slate-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-slate-700/60 flex items-start gap-2">
                <Users className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Interlocutores:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] leading-tight line-clamp-2 block" title={activeEvent.interlocutores}>
                    {activeEvent.interlocutores}
                  </span>
                </div>
              </div>
            </div>

            {/* DADOS GEOGRÁFICOS REALISTAS DO TERRENO */}
            <div className="mt-3 p-3 bg-stone-50 dark:bg-slate-800/40 rounded-xl border border-stone-200/70 dark:border-slate-700/50 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <Mountain className="w-3.5 h-3.5 text-amber-600" />
                <span>Geografia Física & Relevo do Local:</span>
              </div>
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Altitude:</span> {geoInsight.altitude} • <span className="font-semibold text-slate-700 dark:text-slate-300">Distância:</span> {geoInsight.distancia}
              </div>
            </div>

            {/* ABAS CONTEXTUAIS DETALHADAS */}
            <div className="mt-4 space-y-3.5 text-xs">
              
              {/* Contexto Histórico e Cultural */}
              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900/40">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300 font-serif mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Contexto Histórico & Cultural do Século I
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[12px]">
                  {activeEvent.contextoHistorico}
                </p>
              </div>

              {/* Contexto Bíblico nos Evangelhos */}
              <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200/80 dark:border-blue-900/40">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 font-serif mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Contexto Bíblico & Ocasião do Evangelho
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[12px]">
                  {activeEvent.contextoBiblico}
                </p>
              </div>

              {/* Propósito Teológico Reformado */}
              <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/80 dark:border-emerald-900/40">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300 font-serif mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Propósito Teológico & Aplicação Cristã
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[12px]">
                  {activeEvent.propositoTeologico}
                </p>
              </div>

              {/* Referência Bíblica da Parábola */}
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-[#fbf9f4] dark:bg-slate-950 p-3 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span className="font-bold font-serif text-slate-800 dark:text-slate-200 text-xs">
                    Passagem Bíblica:
                  </span>
                  <span className="text-[11px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded font-mono">
                    {activeEvent.referencia}
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">
                  Leitura expositiva na Bíblia Sagrada
                </span>
              </div>
            </div>

            {/* Ações de Ensino e Lição da EBD */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {activeEvent.semana && onSelectLessonForDetail && (
                  <button
                    id={`open-lesson-details-${activeEvent.semana}`}
                    onClick={() => {
                      const lesson = lessons.find(l => l.semana === activeEvent.semana);
                      if (lesson) onSelectLessonForDetail(lesson);
                    }}
                    className="px-3.5 py-1.5 bg-[#004b3c] hover:bg-[#00382d] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Ver Aula {activeEvent.semana}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {activeEvent.semana && onGoToRoteiro && (
                  <button
                    id={`open-roteiro-${activeEvent.semana}`}
                    onClick={() => onGoToRoteiro(activeEvent.semana!)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-all cursor-pointer"
                  >
                    Roteiro A4
                  </button>
                )}

                {activeEvent.semana && onGoToSlides && (
                  <button
                    id={`open-slides-${activeEvent.semana}`}
                    onClick={() => onGoToSlides(activeEvent.semana!)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-all cursor-pointer"
                  >
                    Slides
                  </button>
                )}
              </div>

              {/* Botão de Avanço Rápido */}
              <button
                id="next-stop-button"
                onClick={handleNext}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 ml-auto cursor-pointer"
              >
                <span>Avançar no Caminho</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Carrossel de 19 Miniaturas da Peregrinação */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-[#eadeca] dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                As 19 Paradas na Terra de Israel:
              </span>
              <span className="text-[10px] text-slate-400">
                Clique para saltar
              </span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {TIMELINE_DATA.map((ev, idx) => {
                const isActive = idx === currentIndex;
                const isStudied = !!studiedSteps[ev.id];
                return (
                  <button
                    key={ev.id}
                    id={`step-chip-${ev.etapaNumero}`}
                    onClick={() => handleSelectStep(idx, true)}
                    className={`flex-shrink-0 w-8 h-8 rounded-lg text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${
                      isActive 
                        ? 'bg-[#004b3c] text-white ring-2 ring-[#059669] shadow-md scale-110' 
                        : isStudied
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                    title={`${ev.etapaNumero}. ${ev.titulo}`}
                  >
                    {ev.etapaNumero}
                    {isStudied && !isActive && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
