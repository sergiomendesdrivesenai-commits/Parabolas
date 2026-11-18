import React, { useState } from 'react';
import { TimelineEvent, TIMELINE_DATA } from '../data/timelineData';
import { MapTerrainSvg } from './MapTerrainSvg';
import { Compass, MapPin, ZoomIn, ZoomOut, ExternalLink, Calendar, Milestone } from 'lucide-react';

interface ParableSceneCutoutProps {
  timelineContext: TimelineEvent;
  onNavigateToMap?: () => void;
}

export const ParableSceneCutout: React.FC<ParableSceneCutoutProps> = ({
  timelineContext,
  onNavigateToMap
}) => {
  // Zoom level: 'focado' (zoom in on town/lake) or 'regional' (wider provincial context)
  const [zoomMode, setZoomMode] = useState<'focado' | 'regional'>('focado');

  // Find index in TIMELINE_DATA
  const currentIndex = TIMELINE_DATA.findIndex(t => t.id === timelineContext.id);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  // Calculate coordinates and focused bounding box
  const { x, y } = timelineContext.mapCoord;

  // Compute custom viewBox
  // Map dimensions are 600 x 850
  const boxW = zoomMode === 'focado' ? 180 : 320;
  const boxH = zoomMode === 'focado' ? 140 : 250;
  const boxX = Math.max(0, Math.min(600 - boxW, x - boxW / 2));
  const boxY = Math.max(0, Math.min(850 - boxH, y - boxH / 2));
  const customViewBox = `${boxX} ${boxY} ${boxW} ${boxH}`;

  // Trail paths
  const trailSvgPath = TIMELINE_DATA.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.mapCoord.x} ${curr.mapCoord.y}` : `${acc} L ${curr.mapCoord.x} ${curr.mapCoord.y}`;
  }, '');

  const completedTrailSvgPath = TIMELINE_DATA.slice(0, activeIndex + 1).reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.mapCoord.x} ${curr.mapCoord.y}` : `${acc} L ${curr.mapCoord.x} ${curr.mapCoord.y}`;
  }, '');

  // 3 Timeline Macro-periods for the visual stepper
  const macroPeriods = [
    {
      id: 'galileia',
      label: '1. Ministério na Galileia',
      fase: 'Etapas 1 a 6',
      sub: 'Margens do Mar de Tiberíades e cidades do norte'
    },
    {
      id: 'pereia_judeia',
      label: '2. Pereia, Samaria & Judeia',
      fase: 'Etapas 7 a 10',
      sub: 'A caminho de Jerusalém'
    },
    {
      id: 'jerusalem_paixao',
      label: '3. Jerusalém & Paixão',
      fase: 'Etapas 11 a 14',
      sub: 'Confronto no Templo e Monte das Oliveiras'
    }
  ];

  return (
    <div className="space-y-4 pt-2">
      
      {/* 1. RECORTE DA LINHA DO TEMPO (Onde o aluno está na trajetória) */}
      <div className="bg-stone-50/80 dark:bg-slate-800/80 p-4 rounded-xl border border-sky-200/60 dark:border-sky-800/40">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Milestone className="w-4 h-4 text-sky-700 dark:text-sky-400 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-300">
              Recorte da Linha do Tempo de Jesus
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 rounded-lg">
            <Calendar className="w-3.5 h-3.5" />
            <span>{timelineContext.anoAprox}</span>
          </div>
        </div>

        {/* Indicador de Etapa e Período */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-stone-200/60 dark:border-slate-700/60">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400">Posicionamento na Jornada:</span>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-bold">
                Etapa {timelineContext.etapaNumero} de 14
              </span>
              <span>{timelineContext.periodoLabel}</span>
            </div>
          </div>
          {onNavigateToMap && (
            <button
              onClick={onNavigateToMap}
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 hover:underline cursor-pointer"
            >
              <span>Ver Mapa Completo</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Barra Visual dos 3 Períodos Cronológicos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {macroPeriods.map((period) => {
            const isCurrent = timelineContext.periodo === period.id;
            return (
              <div
                key={period.id}
                className={`p-2.5 rounded-lg border transition-all ${
                  isCurrent
                    ? 'bg-sky-100/90 dark:bg-sky-950/70 border-sky-400 dark:border-sky-500 shadow-xs ring-1 ring-sky-400/50'
                    : 'bg-white/40 dark:bg-slate-900/40 border-stone-200/50 dark:border-slate-800/50 opacity-65'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[11px] font-bold ${isCurrent ? 'text-sky-900 dark:text-sky-200' : 'text-slate-600 dark:text-slate-400'}`}>
                    {period.label}
                  </span>
                  {isCurrent && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" title="Você está aqui" />
                  )}
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight">
                  {period.fase}
                </div>
                {isCurrent && (
                  <div className="mt-1.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <span>📍 Você está aqui</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RECORTE DO MAPA CARTOGRÁFICO */}
      <div className="bg-white dark:bg-slate-900/90 rounded-xl border border-sky-200 dark:border-sky-800/60 overflow-hidden shadow-xs">
        
        {/* Topo do Recorte do Mapa */}
        <div className="px-4 py-2.5 bg-stone-100 dark:bg-slate-800 border-b border-stone-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-700 dark:text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">
              Recorte Topográfico Bíblico
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setZoomMode(prev => prev === 'focado' ? 'regional' : 'focado')}
              className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold bg-white dark:bg-slate-700 border border-stone-300 dark:border-slate-600 hover:bg-stone-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-md shadow-2xs transition-colors cursor-pointer"
              title={zoomMode === 'focado' ? 'Alternar para visão regional ampliada' : 'Alternar para zoom focado no local'}
            >
              {zoomMode === 'focado' ? (
                <>
                  <ZoomOut className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  <span>Visão Regional</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  <span>Zoom no Ponto</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Janela de Visualização do SVG Recortado */}
        <div className="relative h-48 sm:h-56 w-full bg-[#f4ecd8] dark:bg-[#1a202c] overflow-hidden">
          <div className="w-full h-full">
            <MapTerrainSvg
              theme="pergaminho"
              layers={{
                roads: true,
                mountains: true,
                cities: true,
                landmarks: true,
                pins: true,
                trail: true
              }}
              currentIndex={activeIndex}
              hoveredEventId={null}
              studiedSteps={{}}
              isEventVisible={() => true}
              onSelectStep={() => {}}
              onHoverEvent={() => {}}
              trailSvgPath={trailSvgPath}
              completedTrailSvgPath={completedTrailSvgPath}
              customViewBox={customViewBox}
            />
          </div>

          {/* Legenda de Sobreposição no Recorte */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <div className="bg-slate-900/85 backdrop-blur-xs text-white px-2.5 py-1.5 rounded-lg border border-white/20 shadow-md text-xs pointer-events-auto flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold truncate max-w-[200px] sm:max-w-[280px]">
                {timelineContext.localEspecifico}
              </span>
              <span className="text-[10px] text-sky-300">({timelineContext.regiao})</span>
            </div>

            <div className="bg-white/85 dark:bg-slate-900/85 text-[10px] font-mono px-2 py-1 rounded border border-stone-300 dark:border-slate-700 text-stone-600 dark:text-stone-300 hidden sm:block">
              Coords: {x}, {y}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
