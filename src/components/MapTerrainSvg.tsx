import React from 'react';
import { TimelineEvent, TIMELINE_DATA } from '../data/timelineData';

export type MapTheme = 'pergaminho' | 'relevo' | 'noturno';

export interface MapLayers {
  roads: boolean;
  mountains: boolean;
  cities: boolean;
  landmarks: boolean;
  pins: boolean;
  trail: boolean;
}

interface MapTerrainSvgProps {
  theme: MapTheme;
  layers: MapLayers;
  currentIndex: number;
  hoveredEventId: string | null;
  studiedSteps: Record<string, boolean>;
  isEventVisible: (ev: TimelineEvent) => boolean;
  onSelectStep: (index: number) => void;
  onHoverEvent: (id: string | null) => void;
  trailSvgPath: string;
  completedTrailSvgPath: string;
  customViewBox?: string;
}

export const MapTerrainSvg: React.FC<MapTerrainSvgProps> = ({
  theme,
  layers,
  currentIndex,
  hoveredEventId,
  studiedSteps,
  isEventVisible,
  onSelectStep,
  onHoverEvent,
  trailSvgPath,
  completedTrailSvgPath,
  customViewBox
}) => {
  const activeEvent = TIMELINE_DATA[currentIndex] || TIMELINE_DATA[0];

  // Colors based on theme
  const getThemePalette = () => {
    switch (theme) {
      case 'relevo':
        return {
          landBg: '#e6ded0',
          coastLine: '#1e3a8a',
          medSeaStart: '#60a5fa',
          medSeaEnd: '#2563eb',
          galileeStart: '#38bdf8',
          galileeEnd: '#0284c7',
          deadSeaStart: '#14b8a6',
          deadSeaEnd: '#0f766e',
          jordanRiver: '#0284c7',
          mountainFill: '#bba78c',
          mountainStroke: '#8c765c',
          ridgeStroke: '#6b5742',
          samariaGreen: '#c5d8a4',
          galileeLush: '#b8d696',
          desertJudea: '#e8d2b0',
          textProvince: '#0f172a',
          gridLines: '#cbd5e1',
          roadColor: '#d97706',
          romanMilestone: '#b45309'
        };
      case 'noturno':
        return {
          landBg: '#090d16',
          coastLine: '#1e293b',
          medSeaStart: '#0f172a',
          medSeaEnd: '#020617',
          galileeStart: '#1e3a8a',
          galileeEnd: '#0f172a',
          deadSeaStart: '#0d4844',
          deadSeaEnd: '#042f2e',
          jordanRiver: '#38bdf8',
          mountainFill: '#1e293b',
          mountainStroke: '#334155',
          ridgeStroke: '#475569',
          samariaGreen: '#0f291e',
          galileeLush: '#064e3b',
          desertJudea: '#1c1917',
          textProvince: '#e2e8f0',
          gridLines: '#1e293b',
          roadColor: '#fbbf24',
          romanMilestone: '#f59e0b'
        };
      case 'pergaminho':
      default:
        return {
          landBg: '#f6f0dd',
          coastLine: '#8a7758',
          medSeaStart: '#c9dddf',
          medSeaEnd: '#a7c6ca',
          galileeStart: '#7cb5be',
          galileeEnd: '#5599a4',
          deadSeaStart: '#6f9d98',
          deadSeaEnd: '#4c7c77',
          jordanRiver: '#5599a4',
          mountainFill: '#dfceb4',
          mountainStroke: '#a0886e',
          ridgeStroke: '#755f47',
          samariaGreen: '#dedcb7',
          galileeLush: '#d5e0be',
          desertJudea: '#ebd6b7',
          textProvince: '#451a03',
          gridLines: '#ded5bd',
          roadColor: '#b45309',
          romanMilestone: '#92400e'
        };
    }
  };

  const pal = getThemePalette();

  return (
    <svg
      id="palestine-ancient-map-svg"
      viewBox={customViewBox || "0 0 600 850"}
      className="w-full h-full select-none"
      style={{
        backgroundColor: pal.landBg,
        transition: 'background-color 0.4s ease'
      }}
    >
      <defs>
        {/* Filtro de textura de papiro antigo e relevo */}
        <filter id="parchmentNoise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0"
          />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>

        {/* Gradientes Aquáticos */}
        <linearGradient id="medSeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pal.medSeaStart} stopOpacity={theme === 'noturno' ? 0.95 : 0.85} />
          <stop offset="100%" stopColor={pal.medSeaEnd} stopOpacity={theme === 'noturno' ? 1 : 0.95} />
        </linearGradient>

        <linearGradient id="galileeSeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pal.galileeStart} />
          <stop offset="100%" stopColor={pal.galileeEnd} />
        </linearGradient>

        <linearGradient id="deadSeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pal.deadSeaStart} />
          <stop offset="100%" stopColor={pal.deadSeaEnd} />
        </linearGradient>

        {/* Gradiente de Elevação das Colinas */}
        <linearGradient id="hermonSnowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.95} />
          <stop offset="60%" stopColor="#e2e8f0" stopOpacity={0.8} />
          <stop offset="100%" stopColor={pal.mountainFill} />
        </linearGradient>

        {/* Sombra de Pinos */}
        <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity={theme === 'noturno' ? 0.8 : 0.35} />
        </filter>

        {/* Brilho Noturno para Fogueiras e Paradas */}
        <filter id="nightGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Padrão de Relevo Hachurado Clássico */}
        <pattern id="hatchingPattern" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke={pal.ridgeStroke} strokeWidth="0.6" opacity="0.3" />
        </pattern>
      </defs>

      {/* ============================================================ */}
      {/* 1. FUNDO DO MAPA & TEXTURA DO TERRENO                        */}
      {/* ============================================================ */}
      <rect x="0" y="0" width="600" height="850" fill={pal.landBg} />

      {/* Zonas Biogeográficas da Terra de Israel */}
      {/* Planície Fértil de Sarom e Costa do Mediterrâneo */}
      <path
        d="M 100 240 C 130 250, 160 300, 170 380 C 180 460, 160 550, 140 680 L 70 850 L 0 850 L 0 0 L 130 0 C 135 70, 140 150, 125 210 Z"
        fill={pal.galileeLush}
        opacity={theme === 'noturno' ? 0.35 : 0.4}
      />

      {/* Bacia da Galileia Fértil (Verdejante e Agrícola) */}
      <ellipse
        cx="360"
        cy="170"
        rx="110"
        ry="75"
        fill={pal.galileeLush}
        opacity={theme === 'noturno' ? 0.3 : 0.45}
      />

      {/* Deserto da Judeia e Região do Neguebe (Terroso & Árido) */}
      <path
        d="M 230 630 C 270 610, 370 580, 400 620 C 410 700, 410 790, 420 840 L 220 850 Z"
        fill={pal.desertJudea}
        opacity={theme === 'noturno' ? 0.25 : 0.55}
      />

      {/* Fosso Profundo do Vale da Fenda do Jordão (Depressão Geológica - Ghor) */}
      <path
        d="M 398 120 C 410 240, 425 380, 420 520 C 416 600, 405 630, 405 700 L 440 700 C 445 610, 440 450, 430 300 C 420 180, 418 120, 398 120 Z"
        fill={pal.samariaGreen}
        opacity={theme === 'noturno' ? 0.2 : 0.4}
      />

      {/* Grade de Latitude/Longitude com Numeração Antiga */}
      <g stroke={pal.gridLines} strokeWidth="0.5" strokeDasharray="3,6" opacity={0.65}>
        <line x1="40" y1="150" x2="560" y2="150" />
        <line x1="40" y1="350" x2="560" y2="350" />
        <line x1="40" y1="550" x2="560" y2="550" />
        <line x1="40" y1="750" x2="560" y2="750" />
        <line x1="160" y1="40" x2="160" y2="820" />
        <line x1="320" y1="40" x2="320" y2="820" />
        <line x1="480" y1="40" x2="480" y2="820" />
      </g>

      {/* ============================================================ */}
      {/* 2. ÁGUAS BÍBLICAS (MAR MEDITERRÂNEO, GALILEIA, JORDÃO, MORTO)*/}
      {/* ============================================================ */}

      {/* Mar Mediterrâneo (Mare Internum / O Grande Mar) */}
      <path
        d="M 0 0 L 130 0 C 135 60, 140 140, 125 210 C 112 245, 148 240, 142 270 C 132 320, 115 420, 105 520 C 95 620, 85 720, 75 850 L 0 850 Z"
        fill="url(#medSeaGrad)"
        stroke={pal.coastLine}
        strokeWidth="1.5"
      />

      {/* Ondas e Linhas Costeiras do Mediterrâneo */}
      <g stroke={theme === 'noturno' ? '#38bdf8' : '#7dd3fc'} strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <path d="M 25 120 Q 40 115, 55 120" fill="none" />
        <path d="M 40 230 Q 55 225, 70 230" fill="none" />
        <path d="M 30 360 Q 45 355, 60 360" fill="none" />
        <path d="M 20 490 Q 35 485, 50 490" fill="none" />
        <path d="M 35 640 Q 50 635, 65 640" fill="none" />
        <path d="M 25 770 Q 40 765, 55 770" fill="none" />
      </g>

      {/* Navio Mercante Antigo no Mediterrâneo (Estilo Galera Fenícia/Romana) */}
      <g transform="translate(45, 330) scale(0.75)" opacity={theme === 'noturno' ? 0.75 : 0.85}>
        <path d="M -15 10 C -5 20, 25 20, 35 10 L 28 5 L -10 5 Z" fill={theme === 'noturno' ? '#78350f' : '#854d0e'} />
        <line x1="8" y1="5" x2="8" y2="-22" stroke="#451a03" strokeWidth="2" />
        <path d="M 8 -20 Q 22 -14, 25 2 L 8 2 Z" fill="#f8fafc" stroke="#451a03" strokeWidth="0.8" opacity="0.9" />
        <line x1="8" y1="-22" x2="16" y2="-24" stroke="#dc2626" strokeWidth="1.5" />
        <text x="10" y="30" fill={theme === 'noturno' ? '#94a3b8' : '#64748b'} fontSize="7" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Navio Romano
        </text>
      </g>

      <text
        x="35"
        y="420"
        fill={theme === 'noturno' ? '#93c5fd' : '#1e3a8a'}
        fontSize="12"
        fontFamily="serif"
        fontStyle="italic"
        letterSpacing="3"
        transform="rotate(-90, 35, 420)"
        opacity="0.8"
      >
        MAR MEDITERRÂNEO (GRANDE MAR)
      </text>

      {/* Rio Jordão com seus meandros e afluentes (Yarmuk e Jaboque) */}
      {/* Alto Jordão vindo do Monte Hermom */}
      <path
        d="M 425 45 Q 418 85, 412 125"
        fill="none"
        stroke={pal.jordanRiver}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Médio e Baixo Jordão (Do Mar da Galileia ao Mar Morto) */}
      <path
        d="M 408 215 C 416 260, 426 305, 417 350 C 410 395, 426 440, 427 490 C 429 540, 420 575, 419 625"
        fill="none"
        stroke={pal.jordanRiver}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.9"
        filter={theme === 'noturno' ? 'drop-shadow(0 0 3px rgba(56,189,248,0.5))' : 'none'}
      />

      {/* Afluentes Bíblicos do Jordão: Rio Jaboque (Pereia) e Ribeiro de Querite */}
      <path
        d="M 480 380 Q 440 375, 420 385"
        fill="none"
        stroke={pal.jordanRiver}
        strokeWidth="1.6"
        strokeDasharray="2,2"
        opacity="0.75"
      />
      <text x="450" y="372" fill={theme === 'noturno' ? '#7dd3fc' : '#0369a1'} fontSize="7" fontFamily="serif" fontStyle="italic">
        Rio Jaboque (Gên 32)
      </text>

      <path
        d="M 370 595 Q 395 605, 418 610"
        fill="none"
        stroke={pal.jordanRiver}
        strokeWidth="1.5"
        strokeDasharray="2,2"
        opacity="0.75"
      />
      <text x="350" y="590" fill={theme === 'noturno' ? '#7dd3fc' : '#0369a1'} fontSize="6.5" fontFamily="serif" fontStyle="italic">
        Rib. Querite
      </text>

      <text
        x="430"
        y="320"
        fill={theme === 'noturno' ? '#38bdf8' : '#0284c7'}
        fontSize="8.5"
        fontFamily="serif"
        fontStyle="italic"
        letterSpacing="1.5"
        transform="rotate(84, 430, 320)"
      >
        RIO JORDÃO
      </text>

      {/* Mar da Galileia (Lago Kinneret / Genesaré) */}
      <path
        d="M 380 135 C 405 115, 440 120, 445 150 C 450 180, 435 205, 415 215 C 395 220, 375 195, 375 160 Z"
        fill="url(#galileeSeaGrad)"
        stroke={pal.coastLine}
        strokeWidth="1.5"
        filter={theme === 'noturno' ? 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.4))' : 'drop-shadow(0 1px 3px rgba(2, 132, 199, 0.3))'}
      />

      {/* Barco de Pesca tradicional da Galileia */}
      <g transform="translate(405, 172) scale(0.65)">
        <path d="M 0 6 C 12 6, 22 9, 26 16 L -6 16 C 0 9, -6 6, 0 6 Z" fill="#582f0e" />
        <line x1="11" y1="6" x2="11" y2="-12" stroke="#582f0e" strokeWidth="1.6" />
        <path d="M 11 -12 L 23 -1 L 11 1 Z" fill="#ffffff" opacity="0.9" />
        <path d="M 1 -3 Q 8 2, 11 -8" stroke="#fcd34d" strokeWidth="0.8" fill="none" opacity="0.8" />
      </g>

      <text
        x="415"
        y="160"
        fill="#ffffff"
        fontSize="8"
        fontFamily="serif"
        fontWeight="bold"
        textAnchor="middle"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
      >
        MAR DA GALILEIA
      </text>
      <text
        x="415"
        y="169"
        fill="#e0f2fe"
        fontSize="6.5"
        fontFamily="serif"
        fontStyle="italic"
        textAnchor="middle"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
      >
        (Lago de Genesaré)
      </text>

      {/* Mar Morto (Mar Salgado / Asfaltite) */}
      <path
        d="M 418 625 C 438 630, 446 665, 442 710 C 440 750, 448 790, 430 810 C 415 805, 408 750, 410 690 C 410 650, 405 630, 418 625 Z"
        fill="url(#deadSeaGrad)"
        stroke={pal.coastLine}
        strokeWidth="1.5"
        filter={theme === 'noturno' ? 'drop-shadow(0 0 6px rgba(20, 184, 166, 0.4))' : 'drop-shadow(0 1px 3px rgba(15, 118, 110, 0.3))'}
      />

      {/* Margens de Sal Branco ao Redor do Mar Morto */}
      <path
        d="M 418 628 C 435 633, 443 667, 439 710 C 437 748, 444 785, 428 805"
        fill="none"
        stroke="#f8fafc"
        strokeWidth="1.2"
        strokeDasharray="2,3"
        opacity="0.8"
      />

      <text
        x="427"
        y="720"
        fill="#ffffff"
        fontSize="9.5"
        fontFamily="serif"
        fontWeight="bold"
        letterSpacing="1.5"
        transform="rotate(85, 427, 720)"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
      >
        MAR MORTO
      </text>
      <text
        x="414"
        y="720"
        fill="#ccfbf1"
        fontSize="6.5"
        fontFamily="serif"
        fontStyle="italic"
        letterSpacing="1"
        transform="rotate(85, 414, 720)"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
      >
        -430m (Mais baixo da Terra)
      </text>

      {/* ============================================================ */}
      {/* 3. RELEVO REALISTA & MONTES BÍBLICOS                          */}
      {/* ============================================================ */}
      {layers.mountains && (
        <g id="biblical-mountains-layer" opacity={theme === 'noturno' ? 0.85 : 0.95}>
          {/* Maciço do Monte Hermom (+2814m) com Neve Eterna no Norte */}
          <g id="mount-hermon" transform="translate(425, 25)">
            <polygon points="-35,25 0,-15 35,25" fill="url(#hermonSnowGrad)" stroke={pal.mountainStroke} strokeWidth="1.2" />
            <polygon points="0,-15 12,5 0,10 -10,2" fill="#ffffff" />
            <polygon points="-15,25 15,-10 45,25" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="1" opacity="0.8" />
            <text x="0" y="-19" fill={theme === 'noturno' ? '#cbd5e1' : '#451a03'} fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              MTE. HERMOM (+2814m)
            </text>
          </g>

          {/* Monte Carmelo e Vale de Jezreel (+546m) */}
          <g id="mount-carmel" transform="translate(145, 235)">
            <path d="M -25,15 L 0,-6 L 25,15 Z" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="1" />
            <path d="M 12,15 L 30,-2 L 48,15 Z" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="0.8" opacity="0.75" />
            <text x="5" y="-10" fill={theme === 'noturno' ? '#94a3b8' : '#78350f'} fontSize="7.5" fontFamily="serif" fontWeight="bold">
              Mte. Carmelo
            </text>
          </g>

          {/* Monte Tabor (+575m) - O icônico monte arredondado da Galileia */}
          <g id="mount-tabor" transform="translate(330, 225)">
            <ellipse cx="0" cy="5" rx="16" ry="9" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="1" />
            <path d="M -16,5 Q 0,-7 16,5" fill="none" stroke={pal.mountainStroke} strokeWidth="1" />
            <text x="0" y="-8" fill={theme === 'noturno' ? '#94a3b8' : '#78350f'} fontSize="7" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              Mte. Tabor
            </text>
          </g>

          {/* Montes de Samaria: Monte Ebal (+940m) e Monte Gerizim (+881m) */}
          <g id="samaria-mountains" transform="translate(325, 385)">
            {/* Ebal */}
            <polygon points="-30,10 -15,-8 0,10" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="1" />
            <text x="-15" y="-11" fill={theme === 'noturno' ? '#94a3b8' : '#78350f'} fontSize="6.5" fontFamily="serif" textAnchor="middle">
              Mte. Ebal
            </text>
            {/* Gerizim (Monte Sagrado Samaritano) */}
            <polygon points="5,10 20,-6 35,10" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="1" />
            <text x="20" y="-9" fill={theme === 'noturno' ? '#94a3b8' : '#78350f'} fontSize="6.5" fontFamily="serif" textAnchor="middle">
              Mte. Gerizim
            </text>
            {/* Garganta de Siquém / Poço de Jacó entre os dois montes */}
            <line x1="-2" y1="-2" x2="6" y2="12" stroke="#0284c7" strokeWidth="1" strokeDasharray="1,2" />
          </g>

          {/* Colinas da Judeia e Deserto de Judá */}
          <g id="judean-hills" transform="translate(250, 610)">
            <path d="M -30,20 Q -15,0 0,20 Q 15,3 30,20" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="1" />
            <text x="0" y="-3" fill={theme === 'noturno' ? '#94a3b8' : '#78350f'} fontSize="7" fontFamily="serif" textAnchor="middle">
              Montes da Judeia
            </text>
          </g>

          {/* Monte das Oliveiras e Monte Moriá (Jerusalém) */}
          <g id="mount-of-olives" transform="translate(310, 638)">
            <polygon points="-12,8 0,-5 12,8" fill={pal.mountainFill} stroke={pal.mountainStroke} strokeWidth="1" />
            {/* Ícone de oliveira verde */}
            <circle cx="0" cy="-6" r="2.5" fill="#15803d" />
            <text x="14" y="0" fill={theme === 'noturno' ? '#a7f3d0' : '#166534'} fontSize="7" fontFamily="serif" fontWeight="bold">
              Mte. Oliveiras (+826m)
            </text>
          </g>

          {/* Desfiladeiro Íngreme de Jericó (A Descida de 1.000m - Wadi Qelt) */}
          <g id="wadi-qelt" transform="translate(345, 620)">
            <path d="M -40,15 L -20,8 L 0,12 L 20,5 L 40,10" fill="none" stroke="#b45309" strokeWidth="1.2" strokeDasharray="2,3" />
            <text x="0" y="-3" fill="#b45309" fontSize="6" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              Descida do Wadi Qelt (-1000m)
            </text>
          </g>
        </g>
      )}

      {/* ============================================================ */}
      {/* 4. ESTRADAS ROMANAS ANTIGAS & ROTAS BÍBLICAS                  */}
      {/* ============================================================ */}
      {layers.roads && (
        <g id="roman-roads-layer">
          {/* VIA MARIS (A Grande Estrada Romana do Mar) */}
          <path
            d="M 60 840 C 70 720, 90 560, 110 450 C 130 350, 150 250, 190 225 C 240 215, 320 210, 385 195 C 400 160, 405 135, 410 40"
            fill="none"
            stroke={pal.roadColor}
            strokeWidth="2.2"
            strokeDasharray="5,4"
            opacity={0.8}
          />
          <text x="120" y="470" fill={pal.romanMilestone} fontSize="7" fontFamily="serif" fontWeight="bold" letterSpacing="1" transform="rotate(-75, 120, 470)">
            VIA MARIS (ESTRADA DO MAR)
          </text>

          {/* CAMINHO DOS PATRIARCAS (Rota Central da Cumeeira: Hebrom - Jerusalém - Siquém - Nazaré) */}
          <path
            d="M 240 820 L 255 740 L 268 658 L 290 520 L 315 385 L 305 220"
            fill="none"
            stroke={pal.roadColor}
            strokeWidth="1.6"
            strokeDasharray="4,4"
            opacity={0.7}
          />
          <text x="280" y="530" fill={pal.romanMilestone} fontSize="6.5" fontFamily="serif" letterSpacing="0.8" transform="rotate(82, 280, 530)">
            Caminho dos Patriarcas
          </text>

          {/* ESTRADA REAL / KING'S HIGHWAY (Pereia - Além do Jordão) */}
          <path
            d="M 495 820 L 490 600 L 485 430 L 490 250"
            fill="none"
            stroke={pal.roadColor}
            strokeWidth="1.6"
            strokeDasharray="4,4"
            opacity={0.7}
          />
          <text x="498" y="550" fill={pal.romanMilestone} fontSize="6.5" fontFamily="serif" letterSpacing="0.8" transform="rotate(88, 498, 550)">
            Estrada Real (Pereia)
          </text>

          {/* A ROTA PERIGOSA DE JERICÓ A JERUSALÉM (Cenário do Bom Samaritano) */}
          <path
            d="M 390 610 C 360 620, 330 635, 275 658"
            fill="none"
            stroke="#e11d48"
            strokeWidth="2.4"
            strokeDasharray="3,3"
            opacity={0.9}
          />
          <text x="335" y="628" fill="#e11d48" fontSize="6.5" fontFamily="serif" fontWeight="bold" transform="rotate(-15, 335, 628)">
            Estrada de Jericó (Adumim)
          </text>
        </g>
      )}

      {/* ============================================================ */}
      {/* 5. PROVÍNCIAS DO SÉCULO I                                    */}
      {/* ============================================================ */}
      <g id="provinces-labels">
        <text
          x="300"
          y="125"
          fill={theme === 'noturno' ? '#34d399' : '#047857'}
          fontSize="14"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="4"
          opacity="0.85"
        >
          GALILEIA
        </text>

        <text
          x="490"
          y="195"
          fill={theme === 'noturno' ? '#94a3b8' : '#64748b'}
          fontSize="12"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="3"
          opacity="0.75"
        >
          DECÁPOLIS
        </text>

        <text
          x="270"
          y="330"
          fill={theme === 'noturno' ? '#94a3b8' : '#64748b'}
          fontSize="13"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="4"
          opacity="0.75"
        >
          SAMARIA
        </text>

        <text
          x="485"
          y="460"
          fill={theme === 'noturno' ? '#fbbf24' : '#b45309'}
          fontSize="14"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="4"
          opacity="0.9"
        >
          PEREIA
        </text>

        <text
          x="195"
          y="580"
          fill={theme === 'noturno' ? '#f43f5e' : '#be123c'}
          fontSize="14"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="4"
          opacity="0.85"
        >
          JUDEIA
        </text>
      </g>

      {/* ============================================================ */}
      {/* 6. MARCOS HISTÓRICOS & MONUMENTOS ILUSTRADOS                 */}
      {/* ============================================================ */}
      {layers.landmarks && (
        <g id="landmarks-layer">
          {/* O TEMPLO DE HERODES EM JERUSALÉM */}
          <g id="temple-of-jerusalem" transform="translate(268, 658)">
            {/* Muralha e Fortaleza */}
            <rect x="-12" y="-10" width="24" height="20" fill="#f8fafc" stroke="#475569" strokeWidth="1.2" rx="1" filter="url(#pinShadow)" />
            {/* Colunatas do Pórtico Real */}
            <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="-10" y1="5" x2="10" y2="5" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Santuário Central Dourado */}
            <rect x="-5" y="-5" width="10" height="10" fill="#eab308" stroke="#ca8a04" strokeWidth="0.8" />
            <polygon points="-4,-5 0,-9 4,-5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.6" />
            <text x="0" y="19" fill={theme === 'noturno' ? '#f43f5e' : '#9f1239'} fontSize="8.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              TEMPLO DE JERUSALÉM
            </text>
          </g>

          {/* OÁSIS E TAMAREIRAS DE JERICÓ (A Cidade das Palmeiras) */}
          <g id="oasis-jericho" transform="translate(395, 608)">
            <circle cx="0" cy="0" r="5" fill="#10b981" opacity="0.3" />
            {/* Três palmeiras estilizadas */}
            <path d="M -6,5 L -6,-2 M -9,-5 Q -6,-2 -3,-5 M -10,-2 Q -6,-2 -2,-2" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 4,5 L 4,-3 M 1,-6 Q 4,-3 7,-6 M 0,-3 Q 4,-3 8,-3" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
            <text x="0" y="16" fill={theme === 'noturno' ? '#fcd34d' : '#854d0e'} fontSize="7.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              Jericó (Oásis)
            </text>
          </g>

          {/* VILA DE PESCADORES DE CAFARNAUM */}
          <g id="capernaum-harbor" transform="translate(405, 133)">
            {/* Píer de pedras */}
            <path d="M -8,2 L 8,2 L 12,8 L -4,8 Z" fill="#475569" />
            <circle cx="0" cy="0" r="3" fill="#059669" stroke="#ffffff" strokeWidth="1" />
            <text x="0" y="-6" fill={theme === 'noturno' ? '#6ee7b7' : '#065f46'} fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              Cafarnaum
            </text>
          </g>

          {/* NAZARÉ NA BAIXA GALILEIA */}
          <g id="nazareth-town" transform="translate(300, 220)">
            <circle cx="0" cy="0" r="2.8" fill="#64748b" stroke="#ffffff" strokeWidth="0.8" />
            <text x="-6" y="2" fill={theme === 'noturno' ? '#cbd5e1' : '#334155'} fontSize="7.5" fontFamily="serif" textAnchor="end">
              Nazaré
            </text>
          </g>

          {/* BETÂNIA (Casa de Lázaro, Marta e Maria) */}
          <g id="bethany-village" transform="translate(315, 650)">
            <circle cx="0" cy="0" r="2.5" fill="#64748b" stroke="#ffffff" strokeWidth="0.8" />
            <text x="6" y="3" fill={theme === 'noturno' ? '#cbd5e1' : '#334155'} fontSize="7" fontFamily="serif">
              Betânia
            </text>
          </g>

          {/* COLUNATAS DA DECÁPOLIS (Gérasa / Gadara) */}
          <g id="decapolis-pillars" transform="translate(485, 230)">
            <line x1="-6" y1="-6" x2="-6" y2="4" stroke="#64748b" strokeWidth="1.2" />
            <line x1="0" y1="-6" x2="0" y2="4" stroke="#64748b" strokeWidth="1.2" />
            <line x1="6" y1="-6" x2="6" y2="4" stroke="#64748b" strokeWidth="1.2" />
            <line x1="-8" y1="-6" x2="8" y2="-6" stroke="#64748b" strokeWidth="1" />
            <text x="0" y="14" fill={theme === 'noturno' ? '#94a3b8' : '#64748b'} fontSize="7" fontFamily="serif" textAnchor="middle">
              Gadara / Decápolis
            </text>
          </g>
        </g>
      )}

      {/* ============================================================ */}
      {/* 7. A TRILHA SAGRADA DE CRISTO (O CAMINHO DAS PARÁBOLAS)       */}
      {/* ============================================================ */}
      {layers.trail && (
        <g id="jesus-pilgrim-trail">
          {/* Trilha Guia Pontilhada Completa */}
          <path
            d={trailSvgPath}
            fill="none"
            stroke={theme === 'noturno' ? '#334155' : '#cbd5e1'}
            strokeWidth="2.2"
            strokeDasharray="5,6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />

          {/* Trilha Dinâmica já percorrida com Efeito Iluminado */}
          <path
            d={completedTrailSvgPath}
            fill="none"
            stroke={theme === 'noturno' ? '#34d399' : '#059669'}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6,4"
            className="transition-all duration-500 ease-out"
            filter={theme === 'noturno' ? 'url(#nightGlow)' : 'drop-shadow(0 0 4px rgba(5, 150, 105, 0.45))'}
          />
        </g>
      )}

      {/* ============================================================ */}
      {/* 8. MARCADORES INTERATIVOS DAS 19 PARÁBOLAS (PINS)            */}
      {/* ============================================================ */}
      {layers.pins && (
        <g id="interactive-parable-pins">
          {TIMELINE_DATA.map((ev, index) => {
            const isActive = index === currentIndex;
            const isHovered = hoveredEventId === ev.id;
            const isStudied = !!studiedSteps[ev.id];
            const visible = isEventVisible(ev);

            if (!visible) return null;

            // Pin Color by phase
            let pinBg = '#10b981'; // Galileia
            if (ev.periodo === 'pereia_judeia') pinBg = '#f59e0b';
            if (ev.periodo === 'jerusalem_paixao') pinBg = '#f43f5e';
            if (isActive) pinBg = theme === 'noturno' ? '#10b981' : '#004b3c';

            return (
              <g
                key={ev.id}
                id={`map-pin-step-${ev.etapaNumero}`}
                transform={`translate(${ev.mapCoord.x}, ${ev.mapCoord.y})`}
                className="cursor-pointer transition-transform duration-300"
                onClick={() => onSelectStep(index)}
                onMouseEnter={() => onHoverEvent(ev.id)}
                onMouseLeave={() => onHoverEvent(null)}
              >
                {/* Efeito Pulsante Quando a Parábola está Selecionada */}
                {isActive && (
                  <>
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      fill={theme === 'noturno' ? '#34d399' : '#10b981'}
                      opacity="0.3"
                      className="animate-ping"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="16"
                      fill="none"
                      stroke={theme === 'noturno' ? '#6ee7b7' : '#059669'}
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                  </>
                )}

                {/* Halo de hover ao passar o mouse */}
                {isHovered && !isActive && (
                  <circle cx="0" cy="0" r="16" fill="#f59e0b" opacity="0.35" />
                )}

                {/* Círculo Principal do Marcador */}
                <circle
                  cx="0"
                  cy="0"
                  r={isActive ? 13 : isHovered ? 11.5 : 10}
                  fill={pinBg}
                  stroke="#ffffff"
                  strokeWidth={isActive ? 2.5 : 1.8}
                  filter="url(#pinShadow)"
                  className="transition-all duration-200"
                />

                {/* Número da Etapa (1 a 19) */}
                <text
                  x="0"
                  y={isActive ? 4 : 3.5}
                  fill="#ffffff"
                  fontSize={isActive ? '10.5' : '9'}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {ev.etapaNumero}
                </text>

                {/* Checkmark de Lição Estudada */}
                {isStudied && (
                  <g transform="translate(7, -8) scale(0.65)">
                    <circle cx="0" cy="0" r="7" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                    <path d="M -3 0 L -1 3 L 4 -2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}

                {/* Tooltip Dinâmico com Título ao passar o mouse ou ativo */}
                {(isHovered || isActive) && (
                  <g
                    transform={`translate(0, ${ev.mapCoord.y > 700 ? -26 : -24})`}
                    pointerEvents="none"
                    className="animate-fadeIn"
                  >
                    <rect
                      x="-90"
                      y="-22"
                      width="180"
                      height="24"
                      rx="6"
                      fill={theme === 'noturno' ? '#0f172a' : '#0f172a'}
                      opacity="0.95"
                      stroke={isActive ? '#38bdf8' : '#f59e0b'}
                      strokeWidth="1.2"
                      filter="url(#pinShadow)"
                    />
                    <text
                      x="0"
                      y="-7"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {ev.etapaNumero}. {ev.titulo.length > 25 ? ev.titulo.substring(0, 25) + '...' : ev.titulo}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      )}

      {/* ============================================================ */}
      {/* 9. MARCADOR DINÂMICO DO DISCÍPULO / CRISTO                     */}
      {/* ============================================================ */}
      <g
        id="christ-presence-marker"
        transform={`translate(${activeEvent.mapCoord.x}, ${activeEvent.mapCoord.y})`}
        className="transition-all duration-700 ease-in-out pointer-events-none"
      >
        {/* Auréola de Luz Dourada */}
        <circle cx="0" cy="-30" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.6" opacity="0.95" filter="url(#nightGlow)" />
        {/* Manto Bíblico */}
        <path d="M -4 -23 L 4 -23 L 6 -13 L -6 -13 Z" fill="#b45309" />
        {/* Banner "VOCÊ ESTÁ AQUI" */}
        <g transform="translate(0, 24)">
          <rect x="-48" y="0" width="96" height="16" rx="4" fill="#004b3c" stroke="#10b981" strokeWidth="0.8" opacity="0.96" />
          <text x="0" y="11" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.6">
            ETAPA ATUAL • #{activeEvent.etapaNumero}
          </text>
        </g>
      </g>

      {/* ============================================================ */}
      {/* 10. ROSA DOS VENTOS MONUMENTAL & ESCALA EM MILHAS/KM          */}
      {/* ============================================================ */}
      {/* Rosa dos Ventos Antiga */}
      <g transform="translate(540, 75) scale(0.7)" opacity={theme === 'noturno' ? 0.85 : 0.85}>
        <circle cx="0" cy="0" r="32" fill="none" stroke={theme === 'noturno' ? '#94a3b8' : '#78716c'} strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="0" cy="0" r="22" fill="none" stroke={theme === 'noturno' ? '#64748b' : '#a8a29e'} strokeWidth="0.8" />
        {/* Pontas Cardeais */}
        <polygon points="0,-36 6,-9 0,0 -6,-9" fill="#dc2626" />
        <polygon points="0,36 6,9 0,0 -6,9" fill={theme === 'noturno' ? '#94a3b8' : '#78716c'} />
        <polygon points="36,0 9,6 0,0 9,-6" fill={theme === 'noturno' ? '#94a3b8' : '#78716c'} />
        <polygon points="-36,0 -9,6 0,0 -9,-6" fill={theme === 'noturno' ? '#94a3b8' : '#78716c'} />
        {/* Pontas Colaterais */}
        <polygon points="22,-22 5,-5 0,0 -5,-5" fill={theme === 'noturno' ? '#475569' : '#d6d3d1'} />
        <polygon points="22,22 5,5 0,0 5,-5" fill={theme === 'noturno' ? '#475569' : '#d6d3d1'} />
        <polygon points="-22,-22 -5,-5 0,0 5,-5" fill={theme === 'noturno' ? '#475569' : '#d6d3d1'} />
        <polygon points="-22,22 -5,5 0,0 -5,-5" fill={theme === 'noturno' ? '#475569' : '#d6d3d1'} />
        {/* Letras Cardeais */}
        <text x="0" y="-40" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="serif" textAnchor="middle">N</text>
        <text x="0" y="49" fill={theme === 'noturno' ? '#cbd5e1' : '#44403c'} fontSize="10" fontFamily="serif" textAnchor="middle">S</text>
        <text x="45" y="3.5" fill={theme === 'noturno' ? '#cbd5e1' : '#44403c'} fontSize="10" fontFamily="serif" textAnchor="middle">L</text>
        <text x="-45" y="3.5" fill={theme === 'noturno' ? '#cbd5e1' : '#44403c'} fontSize="10" fontFamily="serif" textAnchor="middle">O</text>
      </g>

      {/* Régua de Escala Cartográfica Realista (Milhas Romanas e Quilômetros) */}
      <g transform="translate(430, 810)" opacity="0.85">
        <rect x="-10" y="-14" width="165" height="36" rx="4" fill={theme === 'noturno' ? '#0f172a' : '#fcfaf7'} stroke={theme === 'noturno' ? '#334155' : '#d6d3d1'} strokeWidth="1" />
        <text x="72" y="-3" fill={theme === 'noturno' ? '#cbd5e1' : '#44403c'} fontSize="7" fontFamily="serif" fontWeight="bold" textAnchor="middle">
          ESCALA CARTOGRÁFICA HISTÓRICA
        </text>
        {/* Barra de 20 km (aprox 70px) */}
        <line x1="10" y1="8" x2="135" y2="8" stroke={theme === 'noturno' ? '#e2e8f0' : '#1e293b'} strokeWidth="2" />
        <line x1="10" y1="4" x2="10" y2="12" stroke={theme === 'noturno' ? '#e2e8f0' : '#1e293b'} strokeWidth="2" />
        <line x1="72" y1="5" x2="72" y2="11" stroke={theme === 'noturno' ? '#e2e8f0' : '#1e293b'} strokeWidth="1.5" />
        <line x1="135" y1="4" x2="135" y2="12" stroke={theme === 'noturno' ? '#e2e8f0' : '#1e293b'} strokeWidth="2" />
        <text x="10" y="18" fill={theme === 'noturno' ? '#94a3b8' : '#64748b'} fontSize="6" fontFamily="sans-serif">0</text>
        <text x="72" y="18" fill={theme === 'noturno' ? '#94a3b8' : '#64748b'} fontSize="6" fontFamily="sans-serif" textAnchor="middle">20 km</text>
        <text x="135" y="18" fill={theme === 'noturno' ? '#94a3b8' : '#64748b'} fontSize="6" fontFamily="sans-serif" textAnchor="middle">40 km</text>
      </g>

      {/* Cartela Decorativa do Mapa no Canto Superior Esquerdo */}
      <g transform="translate(20, 20)" opacity="0.9">
        <rect x="0" y="0" width="165" height="46" rx="6" fill={theme === 'noturno' ? '#0f172a' : '#fcfaf7'} stroke={theme === 'noturno' ? '#334155' : '#d6d3d1'} strokeWidth="1" filter="url(#pinShadow)" />
        <text x="10" y="16" fill={theme === 'noturno' ? '#f8fafc' : '#1e293b'} fontSize="9.5" fontFamily="serif" fontWeight="bold">
          TERRA SANCTA
        </text>
        <text x="10" y="28" fill={theme === 'noturno' ? '#34d399' : '#047857'} fontSize="7.5" fontFamily="serif" fontStyle="italic">
          Palestina no Século I (28 a 30 d.C.)
        </text>
        <text x="10" y="39" fill={theme === 'noturno' ? '#94a3b8' : '#64748b'} fontSize="6.5" fontFamily="sans-serif">
          19 Marcos e Parábolas de Jesus
        </text>
      </g>
    </svg>
  );
};
