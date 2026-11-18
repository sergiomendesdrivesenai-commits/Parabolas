import React, { useState } from 'react';
import { Lesson } from '../types';
import * as Icons from 'lucide-react';
import { Printer, Copy, Check, Share2, ArrowLeft, UserCheck, MessageSquare, BookOpen, FileText } from 'lucide-react';

interface RoteiroTabProps {
  lessons: Lesson[];
  activeLessonSemana: number;
  onSelectLesson: (semana: number) => void;
  onReturnToCronograma: () => void;
}

export const RoteiroTab: React.FC<RoteiroTabProps> = ({
  lessons,
  activeLessonSemana,
  onSelectLesson,
  onReturnToCronograma,
}) => {
  const [profName, setProfName] = useState('');
  const [avisos, setAvisos] = useState('');
  const [notasExtras, setNotasExtras] = useState('');
  const [copied, setCopied] = useState(false);

  const currentLesson = lessons.find(a => a.semana === activeLessonSemana) || lessons[0];

  const [showIframeWarning, setShowIframeWarning] = useState(false);

  const handlePrint = () => {
    if (window.self !== window.top) {
      setShowIframeWarning(true);
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleCopyClipboard = () => {
    const textoCompleto = `==================================================
IGREJA PRESBITERIANA DE ANÁPOLIS
Guia Expositivo de Teologia Prática — EBD 2027
==================================================
Data da Aula: ${currentLesson.data}
Expositor: ${profName || 'Não Indicado'}
Texto Bíblico: ${currentLesson.referencia}
Lição: ${currentLesson.titulo}

--------------------------------------------------
LEITURA BÍBLICA RECOMENDADA
--------------------------------------------------
Texto Sagrado: ${currentLesson.referencia}
(Realizar a leitura expositiva diretamente na Bíblia Sagrada junto aos alunos)

--------------------------------------------------
PILAR TEOLÓGICO DE APOIO
--------------------------------------------------
Conceito: ${currentLesson.doutrina}
Explicação: ${currentLesson.doutrinaDesc}
Diretriz: ${currentLesson.verdadeCentral}

--------------------------------------------------
1. INTRODUÇÃO & GANCHO DE ENTRADA
--------------------------------------------------
${currentLesson.introducao}

--------------------------------------------------
2. ESBOÇO EXEGÉTICO & TEOLÓGICO
--------------------------------------------------
${currentLesson.esboco}

--------------------------------------------------
3. PERGUNTAS DE CONEXÃO
--------------------------------------------------
${currentLesson.perguntas}

--------------------------------------------------
4. DESAFIOS DE APLICAÇÃO PRÁTICA
--------------------------------------------------
${currentLesson.aplicacao}

${notasExtras.trim() ? `--------------------------------------------------\nNOTAS ADICIONAIS DO EXPOSITOR\n--------------------------------------------------\n${notasExtras}\n` : ''}
--------------------------------------------------
📢 COMUNICAÇÕES E SÚPLICAS
--------------------------------------------------
${avisos || 'Nenhum aviso registrado para este domingo.'}
==================================================`;

    navigator.clipboard.writeText(textoCompleto).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsAppShare = () => {
    const message = `⛪ *EBD 2027 - IP ANÁPOLIS* ⛪\n\n📖 *Lição:* ${currentLesson.titulo}\n📚 *Texto:* ${currentLesson.referencia}\n\n🏛️ *Doutrina:* ${currentLesson.doutrina}\n\n📍 *Aplicação Prática:* ${currentLesson.aplicacao}\n\n📢 *Comunicações:* ${avisos || 'Nenhum aviso'}\n\n_Bons estudos na Palavra!_`;
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Botão de Retorno */}
      <div className="max-w-6xl mx-auto no-print">
        <button
          id="btn-voltar-cronograma-roteiro"
          onClick={onReturnToCronograma}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-emerald-500 hover:text-[#047857] transition-all bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Cronograma Inicial
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl border border-[#eadeca] dark:border-slate-700 shadow-sm max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Painel de Controle (Esquerda - não impresso) */}
        <div className="lg:col-span-1 space-y-6 no-print">
          <div className="bg-[#f5f3e9] dark:bg-slate-800 p-5 rounded-xl border border-[#eadeca] dark:border-slate-700 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#004b3c] dark:text-emerald-400 border-b border-[#eadeca] dark:border-slate-700 pb-2 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#059669] dark:text-emerald-500" />
              Apoio ao Expositor
            </h3>

            {/* Seletor de Domingo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Selecione o Domingo Letivo
              </label>
              <select
                id="select-roteiro-domingo"
                value={currentLesson.semana}
                onChange={(e) => onSelectLesson(Number(e.target.value))}
                className="w-full text-sm p-3 rounded-lg border border-[#eadeca] dark:border-slate-700 focus:ring-2 focus:ring-[#059669] outline-none bg-white dark:bg-slate-900 transition-all shadow-sm font-sans"
              >
                {lessons.map((aula) => (
                  <option key={aula.semana} value={aula.semana}>
                    Semana {aula.semana} — {aula.titulo.substring(0, 34)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Nome do Expositor */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Ministrante / Expositor
              </label>
              <input
                id="input-roteiro-prof-name"
                type="text"
                value={profName}
                onChange={(e) => setProfName(e.target.value)}
                placeholder="Ex: Presb. Antônio Silva"
                className="w-full text-sm p-3 rounded-lg border border-[#eadeca] dark:border-slate-700 focus:ring-2 focus:ring-[#059669] outline-none bg-white dark:bg-slate-900 transition-all shadow-sm"
              />
            </div>

            {/* Avisos */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Avisos e Motivos de Oração
              </label>
              <textarea
                id="textarea-roteiro-avisos"
                value={avisos}
                onChange={(e) => setAvisos(e.target.value)}
                rows={3}
                placeholder="Ex: Círculo de Oração na terça às 19h; Ore pela saúde de nossos missionários..."
                className="w-full text-sm p-3 rounded-lg border border-[#eadeca] dark:border-slate-700 focus:ring-2 focus:ring-[#059669] outline-none resize-none bg-white dark:bg-slate-900 transition-all shadow-sm"
              />
            </div>

            {/* Anotações Extras */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Anotações do Expositor
              </label>
              <textarea
                id="textarea-roteiro-notas-extras"
                value={notasExtras}
                onChange={(e) => setNotasExtras(e.target.value)}
                rows={3}
                placeholder="Insira referências de apoio extras, ilustrações próprias ou considerações pessoais..."
                className="w-full text-sm p-3 rounded-lg border border-[#eadeca] dark:border-slate-700 focus:ring-2 focus:ring-[#059669] outline-none resize-none bg-white dark:bg-slate-900 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <button
              id="btn-roteiro-imprimir"
              onClick={handlePrint}
              className="w-full bg-[#004b3c] dark:bg-[#002f25] hover:bg-slate-800 text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              Imprimir Guia em A4
            </button>
            {showIframeWarning && (
              <div className="text-xs bg-amber-100 text-amber-800 border border-amber-300 p-2 rounded">
                <strong>Aviso:</strong> A impressão pode não abrir nesta janela. Clique no ícone "Abrir em Nova Aba" no topo da tela do estúdio.
              </div>
            )}

            <button
              id="btn-roteiro-copiar"
              onClick={handleCopyClipboard}
              className={`w-full text-xs font-bold py-3 rounded-xl border transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                copied
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 border-emerald-300'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-300 border-slate-300'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  Copiado para a Área de Transferência!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Roteiro como Texto
                </>
              )}
            </button>

            <button
              id="btn-roteiro-whatsapp"
              onClick={handleWhatsAppShare}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Enviar Guia via WhatsApp
            </button>
          </div>
        </div>

        {/* Pré-visualização do Roteiro (Direita / Print Area) */}
        <div
          className="lg:col-span-2 border border-slate-300 rounded-2xl p-6 sm:p-10 bg-white dark:bg-slate-900 shadow-liturgic flex flex-col justify-between"
          id="printArea"
        >
          <div className="space-y-6">
            
            {/* Cabeçalho Acadêmico / Padrão Presbiteriano */}
            <div className="text-center border-b-4 border-[#004b3c] dark:border-[#002f25] pb-4 print-border-black">
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#004b3c] dark:text-emerald-400 tracking-wide">
                IGREJA PRESBITERIANA DE ANÁPOLIS
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mt-1">
                Guia Expositivo de Teologia Prática — EBD 2027
              </p>
            </div>

            {/* Metadados da Aula */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#f5f3e9] dark:bg-slate-800 p-4 rounded-xl border border-[#eadeca] dark:border-slate-700 print-bg-none">
              <div className="print-text-dark">
                <strong>Data da Aula:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">{currentLesson.data}</span>
              </div>
              <div className="print-text-dark">
                <strong>Ministrante Responsável:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  {profName || 'Não Indicado'}
                </span>
              </div>
              <div className="col-span-1 sm:col-span-2 print-text-dark">
                <strong>Texto Bíblico Central:</strong>{' '}
                <span className="font-bold text-[#059669] dark:text-emerald-500 text-sm font-serif">
                  {currentLesson.referencia}
                </span>
              </div>
            </div>

            {/* Título da Lição */}
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-[#059669] dark:text-emerald-500 tracking-widest">
                Currículo Semestral
              </span>
              <h5 className="text-xl sm:text-2xl font-serif font-bold text-[#004b3c] dark:text-emerald-400 flex items-center gap-2">
                {currentLesson.iconName && (() => {
                  const Icon = Icons[currentLesson.iconName as keyof typeof Icons] as React.ElementType;
                  return Icon ? <Icon className="w-6 h-6 text-[#059669] dark:text-emerald-500" /> : null;
                })()}
                <span>{currentLesson.titulo}</span>
              </h5>
            </div>

            {/* Símbolos e Conexão de Teologia Reformada */}
            <div className="p-4 bg-stone-50 dark:bg-slate-800 rounded-xl border-l-4 border-[#059669] dark:border-emerald-500 space-y-1.5 shadow-sm print-bg-none">
              <h6 className="text-[10px] uppercase font-bold text-[#004b3c] dark:text-emerald-400 tracking-wider">
                Pilar Doutrinário Reformado
              </h6>
              <p className="text-sm font-semibold text-[#059669] dark:text-emerald-500 font-serif">
                {currentLesson.doutrina}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                {currentLesson.doutrinaDesc}
              </p>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-2 bg-slate-200/60 px-2 py-1 rounded inline-block">
                {currentLesson.verdadeCentral}
              </p>
            </div>

            {/* Leitura Bíblica Recomendada */}
            <div className="p-3.5 bg-[#fbf9f4] dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between shadow-2xs print-bg-none">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#059669] dark:text-emerald-500 shrink-0" />
                <div>
                  <h6 className="text-[11px] uppercase font-bold text-[#004b3c] dark:text-emerald-400 tracking-wider font-serif">
                    Texto Sagrado da Aula: {currentLesson.referencia}
                  </h6>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 font-sans">
                    Leitura direta na Bíblia Sagrada junto à classe na versão adotada pela congregação
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-[#004b3c] dark:text-emerald-300 shrink-0 font-mono">
                {currentLesson.referencia}
              </span>
            </div>

            {/* Detalhamento Pedagógico Expositivo */}
            <div className="space-y-5">
              
              {/* 1. INTRODUÇÃO E GANCHO */}
              <div className="space-y-1.5">
                <h6 className="text-xs uppercase font-bold text-[#004b3c] dark:text-emerald-400 tracking-wider border-b border-stone-200 dark:border-slate-700 pb-1 flex items-center gap-1.5">
                  <span className="text-[#059669] dark:text-emerald-500">■</span> 1. Introdução & Gancho de Entrada
                </h6>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {currentLesson.introducao}
                </p>
              </div>

              {/* 2. ESBOÇO EXPOSITIVO */}
              <div className="space-y-1.5">
                <h6 className="text-xs uppercase font-bold text-[#004b3c] dark:text-emerald-400 tracking-wider border-b border-stone-200 dark:border-slate-700 pb-1 flex items-center gap-1.5">
                  <span className="text-[#059669] dark:text-emerald-500">■</span> 2. Esboço Exegético & Teológico
                </h6>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-stone-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 print-bg-none font-serif">
                  {currentLesson.esboco}
                </div>
              </div>

              {/* 3. PERGUNTAS E APLICAÇÃO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <h6 className="text-xs uppercase font-bold text-[#004b3c] dark:text-emerald-400 tracking-wider border-b border-stone-200 dark:border-slate-700 pb-1 flex items-center gap-1.5">
                    <span className="text-[#059669] dark:text-emerald-500">■</span> 3. Perguntas de Conexão Mútua
                  </h6>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-serif">
                    {currentLesson.perguntas}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h6 className="text-xs uppercase font-bold text-[#004b3c] dark:text-emerald-400 tracking-wider border-b border-stone-200 dark:border-slate-700 pb-1 flex items-center gap-1.5">
                    <span className="text-[#059669] dark:text-emerald-500">■</span> 4. Desafios de Aplicação Prática
                  </h6>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {currentLesson.aplicacao}
                  </p>
                </div>
              </div>

              {/* Anotações Extras */}
              {notasExtras.trim() && (
                <div className="space-y-1.5">
                  <h6 className="text-xs uppercase font-bold text-[#004b3c] dark:text-emerald-400 tracking-wider border-b border-stone-200 dark:border-slate-700 pb-1 flex items-center gap-1.5">
                    <span className="text-[#059669] dark:text-emerald-500">■</span> 5. Anotações Pessoais do Expositor
                  </h6>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line italic font-serif bg-emerald-50/30 dark:bg-emerald-900/30 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50 print-bg-none">
                    {notasExtras}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Bloco de Avisos */}
          <div className="mt-8 border-t-2 border-dashed border-slate-300 pt-4" id="avisosBlock">
            <h6 className="text-xs uppercase font-bold text-[#059669] dark:text-emerald-500 tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Comunicações e Súplicas do Corpo da Igreja
            </h6>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 bg-emerald-50/40 dark:bg-emerald-900/30 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-800/50 font-serif print-bg-none">
              {avisos || 'Nenhum aviso registrado para este domingo.'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
