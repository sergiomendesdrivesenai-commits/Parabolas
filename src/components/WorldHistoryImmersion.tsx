import React, { useState } from 'react';
import { 
  Globe, 
  Landmark, 
  Coins, 
  BookOpen, 
  Shield, 
  Crown, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Scroll, 
  Compass,
  Building2
} from 'lucide-react';
import { LESSON_WORLD_CONTEXT, PANORAMA_MUNDIAL_SECULO_I } from '../data/worldHistoryContext';

interface WorldHistoryImmersionProps {
  semana: number;
}

export const WorldHistoryImmersion: React.FC<WorldHistoryImmersionProps> = ({ semana }) => {
  const [activeTab, setActiveTab] = useState<'licao' | 'imperio' | 'geopolitica' | 'economia' | 'cultura'>('licao');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    'imperio-romano': true,
    'geopolitica-fronteiras': false,
    'economia-tributos': false,
    'sociedade-helenismo': false
  });

  const lessonContext = LESSON_WORLD_CONTEXT[semana] || LESSON_WORLD_CONTEXT[1];

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-700 shadow-xl space-y-6">
      
      {/* Cabeçalho da Seção de Imersão */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>Contexto Histórico Mundial • Século I d.C.</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <span>O Mundo na Época de Jesus & o Império Romano</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
            Descubra os acontecimentos no Império Romano, a geopolítica global, a economia e a sociedade secular da época para uma imersão completa no ambiente histórico da lição.
          </p>
        </div>

        {/* Badges de época */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-300 text-xs font-semibold">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Ano {lessonContext.anoAprox}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Tibério César</span>
          </span>
        </div>
      </div>

      {/* Régua Política da Época */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-stone-950/70 rounded-xl border border-stone-800/80 text-xs">
        <div>
          <span className="text-stone-400 block font-mono text-[11px] uppercase tracking-wider">César em Roma</span>
          <strong className="text-amber-200 text-sm font-serif">{lessonContext.imperadorRomano}</strong>
        </div>
        <div>
          <span className="text-stone-400 block font-mono text-[11px] uppercase tracking-wider">Governo na Judeia & Galileia</span>
          <strong className="text-emerald-300 text-sm font-serif">{lessonContext.governadorLocal}</strong>
        </div>
        <div>
          <span className="text-stone-400 block font-mono text-[11px] uppercase tracking-wider">Clima Geopolítico</span>
          <p className="text-stone-300 text-xs line-clamp-2 mt-0.5">{lessonContext.climaGeopolitico}</p>
        </div>
      </div>

      {/* Destaque de Imersão da Lição */}
      <div className="bg-amber-950/30 border border-amber-800/60 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <h4 className="font-serif font-bold text-base sm:text-lg text-amber-200">
            {lessonContext.destaqueImersao.titulo}
          </h4>
        </div>
        <p className="text-sm text-stone-300 leading-relaxed text-justify">
          {lessonContext.destaqueImersao.descricao}
        </p>
        <div className="bg-stone-900/90 p-3.5 rounded-lg border border-amber-900/40 text-xs text-amber-100 flex items-start gap-2">
          <Scroll className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block mb-0.5">Impacto Direto na Compreensão da Parábola:</strong>
            <span className="text-stone-300 leading-relaxed">{lessonContext.destaqueImersao.impactoNaParabola}</span>
          </div>
        </div>
      </div>

      {/* Grade de 4 Fatos Históricos Contemporâneos desta Lição */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
          <Compass className="w-4 h-4 text-sky-400" />
          <span>Fatos Históricos Mundiais Contemporâneos a esta Lição</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Roma */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-1.5">
            <strong className="text-xs font-bold text-sky-300 uppercase tracking-wide flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-sky-400" />
              O Coração do Império Romano
            </strong>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {lessonContext.fatosMundiais.roma}
            </p>
          </div>

          {/* Card 2: Oriente Médio & Fronteiras */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-1.5">
            <strong className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              Oriente Médio, Fronteiras & Nações Vizinhas
            </strong>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {lessonContext.fatosMundiais.orienteMedio}
            </p>
          </div>

          {/* Card 3: Comércio, Moeda & Estradas */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-1.5">
            <strong className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              Economia, Tributos, Rotas & Moeda
            </strong>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {lessonContext.fatosMundiais.comercioRotas}
            </p>
          </div>

          {/* Card 4: Sociedade & Cultura Helenística */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-1.5">
            <strong className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              Sociedade, Filosofia & Cultura Greco-Romana
            </strong>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {lessonContext.fatosMundiais.sociedadeCultura}
            </p>
          </div>

        </div>
      </div>

      {/* Painel Expansível dos Grandes Pilares do Século I */}
      <div className="space-y-3 pt-2 border-t border-stone-800">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Enciclopédia Histórica do Século I (Guias Temáticos do Mundo Antigo)</span>
          </h4>
        </div>

        <div className="space-y-3">
          {PANORAMA_MUNDIAL_SECULO_I.map((topic) => {
            const isExpanded = !!expandedTopics[topic.id];

            return (
              <div 
                key={topic.id}
                className="bg-stone-950/80 rounded-xl border border-stone-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-stone-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                      {topic.id === 'imperio-romano' && <Landmark className="w-4 h-4" />}
                      {topic.id === 'geopolitica-fronteiras' && <Globe className="w-4 h-4" />}
                      {topic.id === 'economia-tributos' && <Coins className="w-4 h-4" />}
                      {topic.id === 'sociedade-helenismo' && <BookOpen className="w-4 h-4" />}
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-sm text-stone-100">
                        {topic.titulo}
                      </h5>
                      <p className="text-xs text-stone-400 font-sans">
                        {topic.subtitulo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400 hidden sm:inline">
                      {isExpanded ? 'Ocultar detalhes' : 'Ler mais'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-stone-800/60 space-y-4 animate-in fade-in duration-300">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
                      {topic.detalhes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {topic.citacaoHistorica && (
                      <div className="p-3.5 bg-stone-900 rounded-lg border-l-4 border-amber-500 text-xs italic text-stone-300">
                        <p>{topic.citacaoHistorica}</p>
                        {topic.fonteHistorica && (
                          <span className="block mt-1 font-sans font-bold text-amber-400 not-italic text-[11px]">
                            — {topic.fonteHistorica}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
