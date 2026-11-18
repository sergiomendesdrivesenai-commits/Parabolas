import { Lesson } from '../types';
import { WESTMINSTER_MAPPING } from '../data/westminster';
import { TIMELINE_DATA } from '../data/timelineData';
import { LESSON_WORLD_CONTEXT } from '../data/worldHistoryContext';

// Gera o SVG do Recorte Topográfico Bíblico focado no ponto onde o aluno está
function generateTopographicCutoutSvg(timeline: typeof TIMELINE_DATA[0]): string {
  const { x, y } = timeline.mapCoord;
  // Caixa de recorte focada nas imediações da cidade / região da parábola
  const boxW = 180;
  const boxH = 130;
  const boxX = Math.max(0, Math.min(600 - boxW, x - boxW / 2));
  const boxY = Math.max(0, Math.min(850 - boxH, y - boxH / 2));
  const viewBox = `${boxX} ${boxY} ${boxW} ${boxH}`;

  return `
    <svg viewBox="${viewBox}" class="cutout-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="medSeaGradPdf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c9dddf" />
          <stop offset="100%" stop-color="#a7c6ca" />
        </linearGradient>
        <linearGradient id="galileeSeaGradPdf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7cb5be" />
          <stop offset="100%" stop-color="#5599a4" />
        </linearGradient>
        <linearGradient id="deadSeaGradPdf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6f9d98" />
          <stop offset="100%" stop-color="#4c7c77" />
        </linearGradient>
        <filter id="pinShadowPdf" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3" />
        </filter>
      </defs>

      <!-- Terreno Base Pergaminho -->
      <rect x="0" y="0" width="600" height="850" fill="#f6f0dd" />

      <!-- Zonas Biogeográficas -->
      <path d="M 100 240 C 130 250, 160 300, 170 380 C 180 460, 160 550, 140 680 L 70 850 L 0 850 L 0 0 L 130 0 C 135 70, 140 150, 125 210 Z" fill="#d5e0be" opacity="0.4" />
      <ellipse cx="360" cy="170" rx="110" ry="75" fill="#d5e0be" opacity="0.45" />
      <path d="M 230 630 C 270 610, 370 580, 400 620 C 410 700, 410 790, 420 840 L 220 850 Z" fill="#ebd6b7" opacity="0.55" />
      <path d="M 398 120 C 410 240, 425 380, 420 520 C 416 600, 405 630, 405 700 L 440 700 C 445 610, 440 450, 430 300 C 420 180, 418 120, 398 120 Z" fill="#dedcb7" opacity="0.4" />

      <!-- Grade Geográfica -->
      <g stroke="#ded5bd" stroke-width="0.5" stroke-dasharray="3,6" opacity="0.65">
        <line x1="40" y1="150" x2="560" y2="150" />
        <line x1="40" y1="350" x2="560" y2="350" />
        <line x1="40" y1="550" x2="560" y2="550" />
        <line x1="40" y1="750" x2="560" y2="750" />
        <line x1="160" y1="40" x2="160" y2="820" />
        <line x1="320" y1="40" x2="320" y2="820" />
        <line x1="480" y1="40" x2="480" y2="820" />
      </g>

      <!-- Mar Mediterrâneo -->
      <path d="M 0 0 L 130 0 C 135 60, 140 140, 125 210 C 112 245, 148 240, 142 270 C 132 320, 115 420, 105 520 C 95 620, 85 720, 75 850 L 0 850 Z" fill="url(#medSeaGradPdf)" stroke="#8a7758" stroke-width="1.5" />

      <!-- Rio Jordão -->
      <path d="M 425 45 Q 418 85, 412 125" fill="none" stroke="#5599a4" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 408 215 C 416 260, 426 305, 417 350 C 410 395, 426 440, 427 490 C 429 540, 420 575, 419 625" fill="none" stroke="#5599a4" stroke-width="3.2" stroke-linecap="round" />
      <path d="M 480 380 Q 440 375, 420 385" fill="none" stroke="#5599a4" stroke-width="1.6" stroke-dasharray="2,2" />
      <path d="M 370 595 Q 395 605, 418 610" fill="none" stroke="#5599a4" stroke-width="1.5" stroke-dasharray="2,2" />

      <!-- Mar da Galileia -->
      <path d="M 380 135 C 405 115, 440 120, 445 150 C 450 180, 435 205, 415 215 C 395 220, 375 195, 375 160 Z" fill="url(#galileeSeaGradPdf)" stroke="#8a7758" stroke-width="1.5" />

      <!-- Mar Morto -->
      <path d="M 418 625 C 438 630, 446 665, 442 710 C 440 750, 448 790, 430 810 C 415 805, 408 750, 410 690 C 410 650, 405 630, 418 625 Z" fill="url(#deadSeaGradPdf)" stroke="#8a7758" stroke-width="1.5" />

      <!-- Cordilheiras / Relevo das Colinas -->
      <g stroke="#a0886e" fill="#dfceb4" stroke-width="1" opacity="0.9">
        <path d="M 390 50 L 420 30 L 450 50 Z" />
        <path d="M 290 190 L 315 170 L 340 190 Z" />
        <path d="M 330 195 L 350 178 L 370 195 Z" />
        <path d="M 170 230 L 195 210 L 220 230 Z" />
        <path d="M 280 370 L 305 348 L 330 370 Z" />
        <path d="M 270 410 L 295 388 L 320 410 Z" />
        <path d="M 260 640 L 280 620 L 300 640 Z" />
        <path d="M 295 645 L 310 630 L 325 645 Z" />
      </g>

      <!-- Estradas Romanas e Bíblicas -->
      <path d="M 60 840 C 70 720, 90 560, 110 450 C 130 350, 150 250, 190 225 C 240 215, 320 210, 385 195 C 400 160, 405 135, 410 40" fill="none" stroke="#b45309" stroke-width="2.2" stroke-dasharray="5,4" opacity="0.8" />
      <path d="M 240 820 L 255 740 L 268 658 L 290 520 L 315 385 L 305 220" fill="none" stroke="#b45309" stroke-width="1.6" stroke-dasharray="4,4" opacity="0.7" />
      <path d="M 495 820 L 490 600 L 485 430 L 490 250" fill="none" stroke="#b45309" stroke-width="1.6" stroke-dasharray="4,4" opacity="0.7" />
      <path d="M 390 610 C 360 620, 330 635, 275 658" fill="none" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="3,3" opacity="0.9" />

      <!-- Rótulos Províncias e Cidades Históricas -->
      <text x="300" y="125" fill="#047857" font-size="12" font-family="serif" font-weight="bold" letter-spacing="3" opacity="0.75">GALILEIA</text>
      <text x="490" y="195" fill="#64748b" font-size="11" font-family="serif" font-weight="bold" letter-spacing="2" opacity="0.7">DECÁPOLIS</text>
      <text x="270" y="330" fill="#64748b" font-size="12" font-family="serif" font-weight="bold" letter-spacing="3" opacity="0.7">SAMARIA</text>
      <text x="485" y="460" fill="#b45309" font-size="12" font-family="serif" font-weight="bold" letter-spacing="3" opacity="0.8">PEREIA</text>
      <text x="195" y="580" fill="#be123c" font-size="12" font-family="serif" font-weight="bold" letter-spacing="3" opacity="0.8">JUDEIA</text>

      <!-- Cidades de Referência Bíblica -->
      <circle cx="405" cy="148" r="3" fill="#0f172a" />
      <text x="412" y="148" font-size="8" font-family="serif" fill="#1e293b" font-weight="bold">Cafarnaum</text>
      <circle cx="370" cy="170" r="2.5" fill="#0f172a" />
      <text x="330" y="172" font-size="7.5" font-family="serif" fill="#334155">Tiberíades</text>
      <circle cx="310" cy="215" r="2.5" fill="#0f172a" />
      <text x="316" y="217" font-size="7.5" font-family="serif" fill="#334155">Nazaré</text>
      <circle cx="268" cy="658" r="3.5" fill="#0f172a" />
      <text x="220" y="655" font-size="8.5" font-family="serif" fill="#0f172a" font-weight="bold">Jerusalém</text>
      <circle cx="390" cy="610" r="2.5" fill="#0f172a" />
      <text x="396" y="612" font-size="7.5" font-family="serif" fill="#334155">Jericó</text>

      <!-- Marcador Especial do Local do Aluno (Você está aqui) -->
      <!-- Círculo de pulso/áurea de radar -->
      <circle cx="${x}" cy="${y}" r="14" fill="#10b981" fill-opacity="0.25" stroke="#059669" stroke-width="1.2" stroke-dasharray="2,2" />
      <circle cx="${x}" cy="${y}" r="8" fill="#f59e0b" fill-opacity="0.35" />

      <!-- Marcador de Alfinete (Pin) com Sombra -->
      <g transform="translate(${x}, ${y})" filter="url(#pinShadowPdf)">
        <!-- Haste e gota do Pin -->
        <path d="M 0 0 C -5 -8, -7 -14, 0 -22 C 7 -14, 5 -8, 0 0 Z" fill="#dc2626" stroke="#ffffff" stroke-width="1.2" />
        <!-- Ponto interno branco -->
        <circle cx="0" cy="-15" r="3" fill="#ffffff" />
        <circle cx="0" cy="-15" r="1.5" fill="#991b1b" />
      </g>

      <!-- Caixa de Etiqueta com Nome do Ponto Bíblico -->
      <g transform="translate(${x}, ${y})">
        <rect x="-65" y="-36" width="130" height="15" rx="3" fill="#0f172a" fill-opacity="0.9" stroke="#ffffff" stroke-width="0.8" />
        <text x="0" y="-26" fill="#fef08a" font-size="7.5" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="bold" text-anchor="middle">
          📍 VOCÊ ESTÁ AQUI
        </text>
      </g>
    </svg>
  `;
}

export function downloadOrPrintLessonPdf(

  lesson: Lesson,
  customPdfUrl?: string,
  customFileName?: string
) {
  // If the teacher has uploaded a custom PDF, trigger the direct download
  if (customPdfUrl) {
    const link = document.createElement('a');
    link.href = customPdfUrl;
    link.download = customFileName || `EBD-Licao-${lesson.semana}-${lesson.titulo.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Otherwise, open a pristine, formatted printable PDF document in a new window and trigger print (Save as PDF)
  const westminster = WESTMINSTER_MAPPING[lesson.doutrina];
  const timeline = TIMELINE_DATA.find((t) => t.semana === lesson.semana);
  const worldContext = LESSON_WORLD_CONTEXT[lesson.semana];

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Por favor, permita popups para gerar o PDF da lição.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>EBD - Semana ${lesson.semana}: ${lesson.titulo}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 15mm 18mm 15mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif, Georgia;
      color: #1a1a1a;
      line-height: 1.5;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .header-bar {
      border-bottom: 2px solid #004b3c;
      padding-bottom: 12px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .church-title {
      font-size: 15pt;
      font-weight: bold;
      color: #004b3c;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .sub-title {
      font-size: 9.5pt;
      color: #555;
      margin-top: 3px;
    }
    .lesson-meta-badge {
      text-align: right;
      font-size: 10pt;
      font-weight: bold;
      color: #059669;
    }
    h1 {
      font-size: 20pt;
      color: #0f172a;
      margin: 12px 0 8px 0;
      line-height: 1.2;
    }
    .scripture-box {
      background: #f4fbf7;
      border-left: 4px solid #059669;
      padding: 10px 14px;
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 16px;
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
    }
    .central-truth {
      background: #fdfaf3;
      border: 1px solid #e2d9c8;
      padding: 12px 14px;
      border-radius: 4px;
      font-style: italic;
      font-size: 11pt;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 13pt;
      color: #004b3c;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
      margin-top: 20px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    p {
      margin: 6px 0;
      text-align: justify;
    }
    .timeline-box {
      background: #fdfdf9;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #0284c7;
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 9.5pt;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .timeline-header {
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
    }
    .timeline-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .timeline-tag {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8pt;
      font-weight: bold;
      color: #0369a1;
      letter-spacing: 0.5px;
    }
    .timeline-badge-step {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8pt;
      font-weight: 600;
      background: #e0f2fe;
      color: #0284c7;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .timeline-location-title {
      font-size: 10.5pt;
      color: #0f172a;
    }
    .cutout-container {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 14px;
      align-items: start;
    }
    .cutout-svg-wrapper {
      border: 1.5px solid #8a7758;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      background: #f6f0dd;
    }
    .cutout-svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .cutout-info {
      font-size: 9pt;
      line-height: 1.45;
    }
    .cutout-coord-pill {
      font-family: monospace;
      font-size: 8pt;
      color: #64748b;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 3px;
      display: inline-block;
      margin-bottom: 6px;
    }
    .cutout-desc-block strong {
      color: #1e293b;
      font-size: 8.5pt;
      display: block;
      margin-bottom: 2px;
    }
    .cutout-desc-block p {
      margin: 0;
      color: #475569;
      font-size: 8.5pt;
      text-align: justify;
    }
    .cutout-pin-legend {
      margin-top: 8px;
      padding: 5px 8px;
      background: #fefce8;
      border: 1px solid #fef08a;
      border-radius: 4px;
      font-size: 8pt;
      color: #854d0e;
    }
    .pin-icon-dot {
      color: #dc2626;
      font-size: 11pt;
      vertical-align: middle;
      line-height: 0;
    }
    .section-box {
      margin-bottom: 14px;
    }
    .world-history-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 12px 16px;
      border-radius: 6px;
      margin-top: 14px;
      margin-bottom: 18px;
    }
    .world-history-box h3 {
      font-size: 11.5pt;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    .history-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 8px;
      font-size: 9.5pt;
    }
    .history-item {
      background: #ffffff;
      padding: 8px 10px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
    }
    .history-item strong {
      display: block;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .westminster-box {
      background: #fdfdf9;
      border: 1px solid #e5e7eb;
      padding: 10px 14px;
      border-radius: 4px;
      font-size: 9.5pt;
      margin-top: 10px;
    }
    .questions-list {
      padding-left: 20px;
      margin: 8px 0;
    }
    .questions-list li {
      margin-bottom: 6px;
    }
    .footer {
      border-top: 1px solid #ddd;
      padding-top: 10px;
      margin-top: 30px;
      text-align: center;
      font-size: 8.5pt;
      color: #777;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>

  <div class="header-bar">
    <div>
      <div class="church-title">Igreja Presbiteriana de Anápolis</div>
      <div class="sub-title">Escola Bíblica Dominical • As Parábolas de Jesus • 1º Sem/2027</div>
    </div>
    <div class="lesson-meta-badge">
      Semana ${lesson.semana}<br>
      Data: ${lesson.data}
    </div>
  </div>

  <h1>${lesson.titulo}</h1>

  <div class="scripture-box">
    📖 Referência Bíblica: ${lesson.referencia} • Doutrina: ${lesson.doutrina}
  </div>

  <div class="central-truth">
    <strong>Verdade Central:</strong> "${lesson.verdadeCentral}"
  </div>

  ${
    timeline
      ? `
  <div class="timeline-box">
    <div class="timeline-header">
      <div class="timeline-title-row">
        <span class="timeline-tag">RECORTE TOPOGRÁFICO BÍBLICO • ONDE VOCÊ ESTÁ NO MAPA</span>
        <span class="timeline-badge-step">Etapa ${timeline.etapaNumero} de 14 • ${timeline.anoAprox}</span>
      </div>
      <div class="timeline-location-title">
        📍 <strong>${timeline.localEspecifico}</strong> <em>(${timeline.regiao})</em> — <span>${timeline.periodoLabel}</span>
      </div>
    </div>

    <div class="cutout-container">
      <div class="cutout-svg-wrapper">
        ${generateTopographicCutoutSvg(timeline)}
      </div>
      <div class="cutout-info">
        <div class="cutout-coord-pill">Coordenadas Cartográficas: X: ${timeline.mapCoord.x} • Y: ${timeline.mapCoord.y}</div>
        <div class="cutout-desc-block">
          <strong>Contexto Geográfico & Local:</strong>
          <p>${timeline.contextoHistorico}</p>
        </div>
        <div class="cutout-desc-block" style="margin-top: 6px;">
          <strong>Cenário na Jornada de Jesus:</strong>
          <p>${timeline.contextoBiblico}</p>
        </div>
        <div class="cutout-pin-legend">
          <span class="pin-icon-dot">●</span> <strong>Ponto Indicador no Mapa:</strong> Você está situado exatamente em <em>${timeline.localEspecifico}</em>.
        </div>
      </div>
    </div>
  </div>
  `
      : ''
  }

  <div class="section-box">
    <h2>1. Introdução Teológica & Foco Pedagógico</h2>
    <p>${lesson.introducao}</p>
    <p><em>Foco Pedagógico:</em> ${lesson.foco}</p>
  </div>

  <div class="section-box">
    <h2>2. Esboço Expositivo da Lição</h2>
    <p style="white-space: pre-line;">${lesson.esboco}</p>
  </div>

  <div class="section-box">
    <h2>3. Aplicação Prática para a Vida Cristã</h2>
    <p style="white-space: pre-line;">${lesson.aplicacao}</p>
  </div>

  ${
    worldContext
      ? `
  <div class="world-history-box">
    <h2>🏛️ Contexto Histórico Mundial: O Império Romano na Época da Parábola</h2>
    <p><strong>Cenário Político Global (${worldContext.anoAprox}):</strong> Imperador Romano: <em>${worldContext.imperadorRomano}</em> | Autoridade Local: <em>${worldContext.governadorLocal}</em></p>
    <p style="font-size: 10pt; color: #334155;"><strong>Clima Geopolítico:</strong> ${worldContext.climaGeopolitico}</p>
    
    <div class="history-grid">
      <div class="history-item">
        <strong>🏛️ O Poder de Roma</strong>
        ${worldContext.fatosMundiais.roma}
      </div>
      <div class="history-item">
        <strong>🌍 Oriente Médio & Fronteiras</strong>
        ${worldContext.fatosMundiais.orienteMedio}
      </div>
      <div class="history-item">
        <strong>💰 Economia, Moeda & Estradas</strong>
        ${worldContext.fatosMundiais.comercioRotas}
      </div>
      <div class="history-item">
        <strong>📜 Cultura & Filosofia Greco-Romana</strong>
        ${worldContext.fatosMundiais.sociedadeCultura}
      </div>
    </div>

    <div style="margin-top: 10px; padding: 8px 10px; background: #e2e8f0; border-radius: 4px; font-size: 9.5pt;">
      <strong>⚔️ Imersão Histórica na Parábola:</strong> ${worldContext.destaqueImersao.titulo}<br>
      <span style="font-size: 9pt; color: #1e293b;">${worldContext.destaqueImersao.descricao}</span>
    </div>
  </div>
  `
      : ''
  }

  ${
    westminster
      ? `
  <div class="westminster-box">
    <h2>Confissão de Fé de Westminster & Doutrina</h2>
    <p><strong>Doutrina:</strong> ${lesson.doutrina}</p>
    <p><strong>${westminster.capitulo}:</strong> "${westminster.confissao}"</p>
    <p style="margin-top: 6px; font-size: 9.5pt;"><strong>Base Bíblica:</strong> "${westminster.textoApoio}" (<em>${westminster.refApoio}</em>)</p>
  </div>
  `
      : ''
  }

  <div class="section-box">
    <h2>4. Perguntas para Reflexão & Fixação em Classe</h2>
    <div style="font-size: 10pt; line-height: 1.5; white-space: pre-line;">
      ${lesson.perguntas}
    </div>
  </div>

  <div class="footer">
    Material da Escola Bíblica Dominical — Igreja Presbiteriana de Anápolis • Elaborado para edificação da Igreja e glória de Deus.<br>
    <em>Para salvar este documento como PDF no seu computador ou celular, use a opção "Salvar como PDF" na janela de impressão do seu navegador.</em>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

export function downloadOrPrintCompleteEbookPdf(lessons: Lesson[]) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Por favor, permita popups em seu navegador para gerar o E-book Completo em PDF.');
    return;
  }

  // Ordena as lições pela ordem cronológica das semanas (1 a 14)
  const sortedLessons = [...lessons].sort((a, b) => a.semana - b.semana);

  // Constrói o HTML de cada uma das 14 lições
  const lessonsHtml = sortedLessons
    .map((lesson) => {
      const westminster = WESTMINSTER_MAPPING[lesson.doutrina];
      const timeline = TIMELINE_DATA.find((t) => t.semana === lesson.semana);
      const worldContext = LESSON_WORLD_CONTEXT[lesson.semana];

      return `
    <article class="lesson-chapter">
      <div class="lesson-header-bar">
        <div>
          <span class="lesson-num-badge">SEMANA ${lesson.semana} • ${lesson.bloco === 'revista' ? 'REVISTA BASE' : 'CONSOLIDAÇÃO'}</span>
          <h2 class="lesson-chapter-title">${lesson.titulo}</h2>
          <div class="lesson-chapter-date">${lesson.data} • Escola Bíblica Dominical</div>
        </div>
        <div class="lesson-chapter-corner">
          <div class="church-small">IP Anápolis</div>
          <div class="page-meta">Lição ${lesson.semana} de 14</div>
        </div>
      </div>

      <div class="scripture-box">
        <strong>Texto Bíblico Base:</strong> ${lesson.referencia}
      </div>

      <div class="central-truth">
        <strong>${lesson.verdadeCentral}</strong>
      </div>

      ${
        worldContext
          ? `
      <div class="world-history-box">
        <div class="world-box-header">
          <span class="world-tag">CONTEXTO HISTÓRICO MUNDIAL • SÉCULO I d.C.</span>
          <span class="world-emperor">Roma: ${worldContext.imperadorRomano} | Governo Local: ${worldContext.governadorLocal}</span>
        </div>
        
        <div class="world-highlight">
          <strong>${worldContext.destaqueImersao.titulo}:</strong>
          <span>${worldContext.destaqueImersao.descricao}</span>
          <div class="parable-impact">
            <em>Impacto na Parábola:</em> ${worldContext.destaqueImersao.impactoNaParabola}
          </div>
        </div>

        <div class="history-grid">
          <div class="history-item">
            <strong>O Império Romano:</strong>
            <span>${worldContext.fatosMundiais.roma}</span>
          </div>
          <div class="history-item">
            <strong>Oriente Médio & Fronteiras:</strong>
            <span>${worldContext.fatosMundiais.orienteMedio}</span>
          </div>
          <div class="history-item">
            <strong>Economia, Moeda & Estradas:</strong>
            <span>${worldContext.fatosMundiais.comercioRotas}</span>
          </div>
          <div class="history-item">
            <strong>Sociedade & Cultura Helenística:</strong>
            <span>${worldContext.fatosMundiais.sociedadeCultura}</span>
          </div>
        </div>
      </div>
      `
          : ''
      }

      ${
        timeline
          ? `
      <div class="timeline-box">
        <div class="timeline-header">
          <div class="timeline-title-row">
            <span class="timeline-tag">RECORTE TOPOGRÁFICO BÍBLICO • ONDE VOCÊ ESTÁ NO MAPA</span>
            <span class="timeline-badge-step">Etapa ${timeline.etapaNumero} de 14 • ${timeline.anoAprox}</span>
          </div>
          <div class="timeline-location-title">
            📍 <strong>${timeline.localEspecifico}</strong> <em>(${timeline.regiao})</em> — <span>${timeline.periodoLabel}</span>
          </div>
        </div>

        <div class="cutout-container">
          <div class="cutout-svg-wrapper">
            ${generateTopographicCutoutSvg(timeline)}
          </div>
          <div class="cutout-info">
            <div class="cutout-coord-pill">Coordenadas Cartográficas: X: ${timeline.mapCoord.x} • Y: ${timeline.mapCoord.y}</div>
            <div class="cutout-desc-block">
              <strong>Contexto Geográfico & Local:</strong>
              <p>${timeline.contextoHistorico}</p>
            </div>
            <div class="cutout-desc-block" style="margin-top: 6px;">
              <strong>Cenário na Jornada de Jesus:</strong>
              <p>${timeline.contextoBiblico}</p>
            </div>
            <div class="cutout-pin-legend">
              <span class="pin-icon-dot">●</span> <strong>Ponto Indicador no Mapa:</strong> Você está situado exatamente em <em>${timeline.localEspecifico}</em>.
            </div>
          </div>
        </div>
      </div>
      `
          : ''
      }

      <div class="section-box">
        <h3>1. Introdução Teológica & Foco Pedagógico</h3>
        <p><strong>Foco da Aula:</strong> ${lesson.foco}</p>
        <p style="margin-top: 6px;">${lesson.introducao}</p>
      </div>

      <div class="section-box">
        <h3>2. Esboço Expositivo Detalhado</h3>
        <div class="outline-content">
          ${lesson.esboco}
        </div>
      </div>

      <div class="section-box">
        <h3>3. Aplicação Prática para a Vida Cristã</h3>
        <p>${lesson.aplicacao}</p>
      </div>

      ${
        westminster
          ? `
      <div class="westminster-box">
        <h3>Confissão de Fé de Westminster & Doutrina</h3>
        <p><strong>Doutrina Fundamental:</strong> ${lesson.doutrina}</p>
        <p><strong>${westminster.capitulo}:</strong> "${westminster.confissao}"</p>
        <p style="margin-top: 4px; font-size: 9.5pt;"><strong>Base Bíblica:</strong> "${westminster.textoApoio}" (<em>${westminster.refApoio}</em>)</p>
      </div>
      `
          : ''
      }

      <div class="section-box">
        <h3>4. Perguntas para Reflexão & Fixação em Classe</h3>
        <div class="questions-content">
          ${lesson.perguntas}
        </div>
      </div>

      <div class="chapter-footer">
        Igreja Presbiteriana de Anápolis • E-book Completo: As Parábolas de Jesus • Lição ${lesson.semana}
      </div>
    </article>
      `;
    })
    .join('');

  // Tabela do Sumário / Índice
  const indexRowsHtml = sortedLessons
    .map(
      (lesson) => `
      <tr>
        <td class="col-num">${lesson.semana}</td>
        <td class="col-title">
          <strong>${lesson.titulo}</strong><br>
          <span class="index-meta">${lesson.bloco === 'revista' ? 'Revista Base' : 'Consolidação'} • ${lesson.data}</span>
        </td>
        <td class="col-scripture">${lesson.referencia}</td>
        <td class="col-doctrine">${lesson.doutrina}</td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>E-book Completo — As Parábolas de Jesus (14 Lições) — IP Anápolis</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: 'Times New Roman', Times, serif, Georgia;
      color: #1a1a1a;
      line-height: 1.5;
      font-size: 10.5pt;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    /* BARRA DE AÇÃO SUPERIOR NA VISUALIZAÇÃO EM TELA */
    .screen-action-bar {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: #004b3c;
      color: #ffffff;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .screen-action-bar .info-text {
      font-size: 13px;
    }
    .screen-action-bar .info-text strong {
      color: #fef08a;
      display: block;
      font-size: 15px;
      margin-bottom: 2px;
    }
    .screen-action-bar .btn-group {
      display: flex;
      gap: 10px;
    }
    .btn-print {
      background: #059669;
      color: #ffffff;
      border: 1px solid #10b981;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }
    .btn-print:hover {
      background: #047857;
    }
    .btn-close {
      background: rgba(255,255,255,0.15);
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    }
    .btn-close:hover {
      background: rgba(255,255,255,0.25);
    }

    /* CAPA DO E-BOOK */
    .cover-page {
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      border: 6px double #004b3c;
      padding: 50px 30px;
      margin-bottom: 0;
      page-break-after: always;
      background: #fffdf9;
    }
    .cover-header {
      width: 100%;
    }
    .cover-denomination {
      font-size: 13pt;
      font-weight: bold;
      letter-spacing: 2px;
      color: #004b3c;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .cover-ebd-title {
      font-size: 10pt;
      letter-spacing: 1.5px;
      color: #666;
      text-transform: uppercase;
      border-bottom: 1px solid #c9b99a;
      padding-bottom: 12px;
      display: inline-block;
      min-width: 250px;
    }
    .cover-body {
      margin: 40px 0;
    }
    .cover-badge-pre {
      display: inline-block;
      background: #e6f4ea;
      color: #004b3c;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 9pt;
      font-weight: bold;
      padding: 4px 16px;
      border-radius: 20px;
      border: 1px solid #b7dfca;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .cover-main-title {
      font-size: 32pt;
      font-weight: bold;
      color: #00362c;
      margin: 0;
      line-height: 1.15;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .cover-sub-title {
      font-size: 14pt;
      font-style: italic;
      color: #5c4d32;
      margin-top: 15px;
      margin-bottom: 30px;
      font-family: Georgia, serif;
    }
    .cover-divider {
      width: 80px;
      height: 3px;
      background: #004b3c;
      margin: 0 auto 30px auto;
    }
    .cover-description {
      font-size: 11pt;
      color: #333;
      max-width: 500px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .cover-features {
      margin-top: 35px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 9.5pt;
      color: #444;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .cover-features span {
      background: #f4f0e6;
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      border: 1px solid #e2dac8;
      margin: 2px auto;
    }
    .cover-footer {
      width: 100%;
      border-top: 1px solid #c9b99a;
      padding-top: 16px;
      font-size: 10pt;
      color: #555;
    }

    /* ÍNDICE E SUMÁRIO */
    .index-page {
      page-break-before: always;
      page-break-after: always;
      padding-top: 10px;
      margin-bottom: 30px;
    }
    .index-title {
      font-size: 20pt;
      font-weight: bold;
      color: #004b3c;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 2px solid #004b3c;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .index-theology-box {
      background: #fdfaf3;
      border-left: 4px solid #b45309;
      padding: 12px 16px;
      font-size: 10pt;
      font-style: italic;
      line-height: 1.6;
      margin-bottom: 22px;
      color: #333;
    }
    .index-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 9.5pt;
    }
    .index-table th {
      background: #004b3c;
      color: #ffffff;
      padding: 8px 10px;
      text-align: left;
      font-size: 9.5pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .index-table td {
      padding: 9px 10px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }
    .index-table tr:nth-child(even) {
      background: #fcfbf7;
    }
    .col-num {
      width: 50px;
      font-weight: bold;
      text-align: center;
      color: #004b3c;
    }
    .col-title {
      width: 45%;
    }
    .index-meta {
      font-size: 8.5pt;
      color: #666;
    }
    .col-scripture {
      width: 25%;
      font-weight: 500;
      color: #1e293b;
    }
    .col-doctrine {
      width: 25%;
      color: #475569;
    }

    /* CADA CAPÍTULO / LIÇÃO */
    .lesson-chapter {
      page-break-before: always;
      margin-bottom: 35px;
      padding-top: 10px;
    }
    .lesson-header-bar {
      border-bottom: 2px solid #004b3c;
      padding-bottom: 10px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .lesson-num-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.5pt;
      font-weight: bold;
      letter-spacing: 1px;
      color: #059669;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }
    .lesson-chapter-title {
      font-size: 17pt;
      color: #0f172a;
      margin: 0;
      line-height: 1.25;
      font-weight: bold;
    }
    .lesson-chapter-date {
      font-size: 9pt;
      color: #64748b;
      margin-top: 4px;
    }
    .lesson-chapter-corner {
      text-align: right;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .church-small {
      font-size: 9pt;
      font-weight: bold;
      color: #004b3c;
    }
    .page-meta {
      font-size: 8pt;
      color: #64748b;
    }

    .scripture-box {
      background: #f4fbf7;
      border-left: 4px solid #059669;
      padding: 8px 12px;
      font-size: 10.5pt;
      margin-bottom: 12px;
    }
    .central-truth {
      background: #fdfaf3;
      border: 1px solid #e2d9c8;
      padding: 10px 14px;
      border-radius: 4px;
      font-style: italic;
      font-size: 10.5pt;
      margin-bottom: 16px;
      color: #292524;
    }

    /* MÓDULO HISTÓRICO MUNDIAL */
    .world-history-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 12px 14px;
      border-radius: 6px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .world-box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-bottom: 8px;
    }
    .world-tag {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.5pt;
      font-weight: bold;
      color: #b45309;
      letter-spacing: 0.5px;
    }
    .world-emperor {
      font-size: 8.5pt;
      color: #334155;
      font-weight: 600;
    }
    .world-highlight {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #b45309;
      padding: 8px 10px;
      font-size: 9.5pt;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .parable-impact {
      margin-top: 4px;
      font-size: 9pt;
      color: #475569;
      border-top: 1px dashed #e2e8f0;
      padding-top: 4px;
    }
    .history-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 8.5pt;
      line-height: 1.4;
    }
    .history-item {
      background: #ffffff;
      padding: 6px 8px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
    }
    .history-item strong {
      display: block;
      color: #0f172a;
      margin-bottom: 2px;
      font-size: 8.5pt;
    }

    .timeline-box {
      background: #fdfdf9;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #0284c7;
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 9.5pt;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .timeline-header {
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
    }
    .timeline-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .timeline-tag {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8pt;
      font-weight: bold;
      color: #0369a1;
      letter-spacing: 0.5px;
    }
    .timeline-badge-step {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8pt;
      font-weight: 600;
      background: #e0f2fe;
      color: #0284c7;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .timeline-location-title {
      font-size: 10.5pt;
      color: #0f172a;
    }
    .cutout-container {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 14px;
      align-items: start;
    }
    .cutout-svg-wrapper {
      border: 1.5px solid #8a7758;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      background: #f6f0dd;
    }
    .cutout-svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .cutout-info {
      font-size: 9pt;
      line-height: 1.45;
    }
    .cutout-coord-pill {
      font-family: monospace;
      font-size: 8pt;
      color: #64748b;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 3px;
      display: inline-block;
      margin-bottom: 6px;
    }
    .cutout-desc-block strong {
      color: #1e293b;
      font-size: 8.5pt;
      display: block;
      margin-bottom: 2px;
    }
    .cutout-desc-block p {
      margin: 0;
      color: #475569;
      font-size: 8.5pt;
      text-align: justify;
    }
    .cutout-pin-legend {
      margin-top: 8px;
      padding: 5px 8px;
      background: #fefce8;
      border: 1px solid #fef08a;
      border-radius: 4px;
      font-size: 8pt;
      color: #854d0e;
    }
    .pin-icon-dot {
      color: #dc2626;
      font-size: 11pt;
      vertical-align: middle;
      line-height: 0;
    }

    .section-box {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .section-box h3 {
      font-size: 11.5pt;
      color: #004b3c;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-top: 12px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .section-box p {
      margin: 4px 0;
      text-align: justify;
    }
    .outline-content {
      font-size: 10pt;
      line-height: 1.5;
      white-space: pre-line;
      background: #fafaf9;
      border: 1px solid #f0ede6;
      padding: 10px 14px;
      border-radius: 4px;
    }
    .westminster-box {
      background: #fdfdf9;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #004b3c;
      padding: 10px 14px;
      border-radius: 4px;
      font-size: 9.5pt;
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .westminster-box h3 {
      font-size: 11pt;
      color: #004b3c;
      margin: 0 0 6px 0;
      text-transform: uppercase;
    }
    .westminster-box p {
      margin: 3px 0;
    }
    .questions-content {
      font-size: 9.5pt;
      line-height: 1.5;
      white-space: pre-line;
      background: #f8fafc;
      padding: 10px 14px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }
    .chapter-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 8px;
      margin-top: 20px;
      text-align: center;
      font-size: 8pt;
      color: #64748b;
      page-break-inside: avoid;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .no-print {
        display: none !important;
      }
      .cover-page {
        min-height: 98vh;
      }
    }
  </style>
</head>
<body>

  <!-- BARRA DE AÇÃO EM TELA (NÃO APARECE NA IMPRESSÃO) -->
  <div class="screen-action-bar no-print">
    <div class="info-text">
      <strong>📖 E-book Completo (14 Lições com Capa & Índice)</strong>
      <span>Para salvar em arquivo: selecione a opção <em>"Salvar como PDF"</em> no destino da caixa de diálogo.</span>
    </div>
    <div class="btn-group">
      <button class="btn-print" onclick="window.print()">
        🖨️ Imprimir / Salvar como PDF
      </button>
      <button class="btn-close" onclick="window.close()">
        ✕ Fechar
      </button>
    </div>
  </div>

  <!-- PÁGINA 1: CAPA OFICIAL EDITORIAL -->
  <div class="cover-page">
    <div class="cover-header">
      <div class="cover-denomination">Igreja Presbiteriana de Anápolis</div>
      <div class="cover-ebd-title">Escola Bíblica Dominical • 1º Semestre de 2027</div>
    </div>

    <div class="cover-body">
      <div class="cover-badge-pre">Dossiê Expositivo Completo</div>
      <h1 class="cover-main-title">As Parábolas<br>de Jesus</h1>
      <div class="cover-sub-title">O Reino de Deus Revelado em Mistério, Graça e Glória</div>
      <div class="cover-divider"></div>
      <p class="cover-description">
        Compêndio Teológico Unificado reunindo as 14 lições semestrais de estudos expositivos,
        aliando fidelidade exegética reformada à Confissão de Fé de Westminster e aprofundamento histórico no cenário do Império Romano do Século I d.C.
      </p>

      <div class="cover-features">
        <span>14 Semanas de Lições Expositivas com Esboços e Aplicações</span>
        <span>Contexto Histórico Mundial & O Império Romano sob Tibério César</span>
        <span>Recorte Topográfico Bíblico Cartográfico ("Onde Você Está no Mapa")</span>
        <span>Mapeamento Confessional com a Confissão de Fé de Westminster</span>
        <span>Geografia Bíblica, Cronologia e Perguntas para Fixação</span>
      </div>
    </div>

    <div class="cover-footer">
      <strong>Anápolis — Goiás | 2027</strong><br>
      <em>"Para que, vendo, vejam e não percebam; e, ouvindo, ouçam e não entendam... A vós outros é dado conhecer o mistério do Reino de Deus." (Mc 4:11-12)</em>
    </div>
  </div>

  <!-- PÁGINA 2: SUMÁRIO & ÍNDICE GERAL -->
  <div class="index-page">
    <h2 class="index-title">Sumário & Índice Geral do Curso</h2>

    <div class="index-theology-box">
      <strong>A Natureza e o Desígnio das Parábolas de Jesus:</strong><br>
      As parábolas de nosso Senhor Jesus Cristo constituem um dos métodos mais sublimes e solenes de instrução de toda a revelação bíblica.
      Longe de serem meras historietas morais ilustrativas, as parábolas operam na teologia do Novo Testamento como uma manifestação direta da soberania de Deus:
      desvendam os mistérios salvíficos do Reino aos regenerados pela fé, ao mesmo tempo que exercem juízo divino sobre os corações orgulhosos e obstinados (Mc 4:11-12; Mt 13:10-17).
      Este volume reúne a integralidade das 14 lições do primeiro semestre de 2027 da Escola Bíblica Dominical da Igreja Presbiteriana de Anápolis.
    </div>

    <table class="index-table">
      <thead>
        <tr>
          <th style="width: 8%;">Sem.</th>
          <th style="width: 42%;">Lição & Título</th>
          <th style="width: 25%;">Referência Bíblica</th>
          <th style="width: 25%;">Doutrina Principal</th>
        </tr>
      </thead>
      <tbody>
        ${indexRowsHtml}
      </tbody>
    </table>
  </div>

  <!-- PÁGINAS 3+: AS 14 LIÇÕES INTEGRAIS -->
  ${lessonsHtml}

  <script>
    // Inicia a janela de impressão automaticamente após carregar estilos
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
