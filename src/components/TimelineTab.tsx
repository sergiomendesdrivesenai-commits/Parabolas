import React, { useState, useMemo } from 'react';
import { 
  TIMELINE_DATA, 
  TimelineEvent 
} from '../data/timelineData';
import { ParablesJourneyMap } from './ParablesJourneyMap';
import { 
  History, 
  MapPin, 
  Clock, 
  BookOpen, 
  Coins, 
  Sprout, 
  Wheat, 
  Leaf, 
  Gem, 
  Handshake, 
  HeartHandshake, 
  Shield, 
  Landmark, 
  UtensilsCrossed, 
  Home, 
  Scale, 
  User, 
  Users, 
  Pickaxe, 
  Flame, 
  Briefcase, 
  Sun, 
  Search, 
  Compass, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Map,
  ListOrdered
} from 'lucide-react';
import { Lesson } from '../types';

interface TimelineTabProps {
  onSelectLessonForDetail?: (lesson: Lesson) => void;
  onGoToRoteiro?: (semana: number) => void;
  onGoToSlides?: (semana: number) => void;
  lessons: Lesson[];
}

export const TimelineTab: React.FC<TimelineTabProps> = ({
  onSelectLessonForDetail,
  onGoToRoteiro,
  onGoToSlides,
  lessons
}) => {
  const [viewMode, setViewMode] = useState<'mapa' | 'cronologica'>('mapa');
  const [selectedEventId, setSelectedEventId] = useState<string>(TIMELINE_DATA[0].id);
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>('todos');
  const [selectedRegiao, setSelectedRegiao] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Icon mapping
  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case 'Coins': return <Coins {...props} />;
      case 'Sprout': return <Sprout {...props} />;
      case 'Wheat': return <Wheat {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'Gem': return <Gem {...props} />;
      case 'Handshake': return <Handshake {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Landmark': return <Landmark {...props} />;
      case 'UtensilsCrossed': return <UtensilsCrossed {...props} />;
      case 'Home': return <Home {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'User': return <User {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Pickaxe': return <Pickaxe {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Sun': return <Sun {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  const filteredEvents = useMemo(() => {
    return TIMELINE_DATA.filter(ev => {
      const matchesPeriodo = selectedPeriodo === 'todos' || ev.periodo === selectedPeriodo;
      const matchesRegiao = selectedRegiao === 'todas' || ev.regiao === selectedRegiao;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        ev.titulo.toLowerCase().includes(q) ||
        (ev.subtitulo && ev.subtitulo.toLowerCase().includes(q)) ||
        ev.referencia.toLowerCase().includes(q) ||
        ev.localEspecifico.toLowerCase().includes(q) ||
        ev.contextoHistorico.toLowerCase().includes(q) ||
        ev.contextoBiblico.toLowerCase().includes(q) ||
        ev.propositoTeologico.toLowerCase().includes(q);

      return matchesPeriodo && matchesRegiao && matchesSearch;
    });
  }, [selectedPeriodo, selectedRegiao, searchQuery]);

  const handleOpenLesson = (semana?: number) => {
    if (!semana || !onSelectLessonForDetail) return;
    const found = lessons.find(l => l.semana === semana);
    if (found) {
      onSelectLessonForDetail(found);
    }
  };

  const handleJumpToMap = (eventId: string) => {
    setSelectedEventId(eventId);
    setViewMode('mapa');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div id="timeline-container" className="space-y-8 animate-fadeIn pb-16">
      
      {/* Cabeçalho da Linha do Tempo & Seletor de Modo */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-[#eadeca] dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/70 text-[#004b3c] dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-300 dark:border-emerald-800">
              <History className="w-3.5 h-3.5" />
              Timeline/Mapa • Cronologia & Geografia das Parábolas
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Timeline/Mapa: O Caminho das Parábolas de Jesus
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Percorra passo a passo a rota de Jesus na Palestina do século I — da Galileia à Pereia e Jerusalém — descobrindo onde e quando cada parábola foi contada, bem como os contextos histórico e bíblico de cada mensagem.
            </p>
          </div>

          {/* Seletor de Visualização: Mapa vs. Lista */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-700 w-full sm:w-auto shrink-0 shadow-inner">
            <button
              id="viewmode-mapa-btn"
              onClick={() => setViewMode('mapa')}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                viewMode === 'mapa'
                  ? 'bg-[#004b3c] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Caminho no Mapa</span>
            </button>
            <button
              id="viewmode-cronologica-btn"
              onClick={() => setViewMode('cronologica')}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                viewMode === 'cronologica'
                  ? 'bg-[#004b3c] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>Linha do Tempo Completa</span>
            </button>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="bg-[#fcfaf7] dark:bg-slate-800/80 p-3.5 rounded-xl border border-stone-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-bold font-serif text-[#004b3c] dark:text-emerald-400">
              19
            </span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Parábolas & Marcos
            </span>
          </div>
          <div className="bg-[#fcfaf7] dark:bg-slate-800/80 p-3.5 rounded-xl border border-stone-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-bold font-serif text-amber-700 dark:text-amber-400">
              28 a 30 d.C.
            </span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Ministério Terreno
            </span>
          </div>
          <div className="bg-[#fcfaf7] dark:bg-slate-800/80 p-3.5 rounded-xl border border-stone-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-bold font-serif text-indigo-700 dark:text-indigo-400">
              5 Regiões
            </span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Cenários Bíblicos
            </span>
          </div>
          <div className="bg-[#fcfaf7] dark:bg-slate-800/80 p-3.5 rounded-xl border border-stone-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-bold font-serif text-rose-700 dark:text-rose-400">
              100%
            </span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Contextos Históricos
            </span>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL: MAPA INTERATIVO vs. LISTA COMPLETA */}
      {viewMode === 'mapa' ? (
        <ParablesJourneyMap
          lessons={lessons}
          onSelectLessonForDetail={onSelectLessonForDetail}
          onGoToRoteiro={onGoToRoteiro}
          onGoToSlides={onGoToSlides}
          selectedEventId={selectedEventId}
          onSelectEventId={(id) => setSelectedEventId(id)}
        />
      ) : (
        <div id="timeline-list-view" className="space-y-8">
          
          {/* Barra de Fases e Filtros */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-[#eadeca] dark:border-slate-800 shadow-sm">
            {/* Três Fases Cronológicas Principais (Cards de Síntese) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div 
            onClick={() => setSelectedPeriodo('galileia')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPeriodo === 'galileia'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 font-serif">1. Fase da Galileia</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-200/60 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 rounded font-mono">28 - 29 d.C.</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-normal">
              Cafarnaum e Mar da Galileia. Parábolas agrícolas do Reino (Semeador, Joio, Mostarda, Dois Devedores).
            </p>
          </div>

          <div 
            onClick={() => setSelectedPeriodo('pereia_judeia')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPeriodo === 'pereia_judeia'
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 font-serif">2. Grande Viagem / Pereia</span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-200/60 dark:bg-amber-900 text-amber-900 dark:text-amber-200 rounded font-mono">29 - 30 d.C.</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-normal">
              A caminho de Jerusalém (Lucas 9 a 19). Confronto com o legalismo (Bom Samaritano, Filho Pródigo, Fariseu e Publicano).
            </p>
          </div>

          <div 
            onClick={() => setSelectedPeriodo('jerusalem_paixao')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPeriodo === 'jerusalem_paixao'
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-rose-800 dark:text-rose-300 font-serif">3. Jerusalém & Paixão</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-200/60 dark:bg-rose-900 text-rose-900 dark:text-rose-200 rounded font-mono">Abril de 30 d.C.</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-normal">
              Pátio do Templo e Monte das Oliveiras. Confronto com sacerdotes e escatologia (Lavradores Maus, Dez Virgens, Talentos).
            </p>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="timeline-search-input"
              type="text"
              placeholder="Buscar por parábola, contexto ou texto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Período:
            </span>
            <button
              id="filter-periodo-todos"
              onClick={() => setSelectedPeriodo('todos')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPeriodo === 'todos'
                  ? 'bg-[#004b3c] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Todos ({TIMELINE_DATA.length})
            </button>
            <button
              id="filter-periodo-galileia"
              onClick={() => setSelectedPeriodo('galileia')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPeriodo === 'galileia'
                  ? 'bg-[#004b3c] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Galileia
            </button>
            <button
              id="filter-periodo-pereia"
              onClick={() => setSelectedPeriodo('pereia_judeia')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPeriodo === 'pereia_judeia'
                  ? 'bg-[#004b3c] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Pereia & Judeia
            </button>
            <button
              id="filter-periodo-jerusalem"
              onClick={() => setSelectedPeriodo('jerusalem_paixao')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPeriodo === 'jerusalem_paixao'
                  ? 'bg-[#004b3c] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Jerusalém
            </button>
          </div>
        </div>
      </div>

      {/* Linha do Tempo Interativa */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:content-[''] before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-[#059669] before:via-amber-500 before:to-rose-600">
        
        {filteredEvents.map((event, index) => {
          const isGalileia = event.periodo === 'galileia';
          const isPereia = event.periodo === 'pereia_judeia';
          const isJerusalem = event.periodo === 'jerusalem_paixao';

          const nodeColorClass = isGalileia 
            ? 'bg-emerald-600 text-white border-emerald-200' 
            : isPereia 
              ? 'bg-amber-600 text-white border-amber-200' 
              : 'bg-rose-600 text-white border-rose-200';

          const badgePeriodClass = isGalileia 
            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            : isPereia 
              ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
              : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800';

          return (
            <div 
              key={event.id}
              id={`timeline-card-${event.id}`} 
              className="relative group transition-all"
            >
              {/* Marcador do Nó na Linha do Tempo */}
              <div className={`absolute -left-6 sm:-left-10 top-5 w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-md transition-transform group-hover:scale-110 z-10 ${nodeColorClass}`}>
                {renderIcon(event.icone)}
              </div>

              {/* Card de Conteúdo */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-5 sm:p-7 space-y-5">
                
                {/* Cabeçalho do Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {event.semana && (
                        <span className="px-2 py-0.5 bg-[#004b3c] text-white text-[11px] font-bold rounded-md">
                          Lição {event.semana} (Semana {event.semana})
                        </span>
                      )}
                      <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${badgePeriodClass}`}>
                        {event.periodoLabel}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {event.anoAprox}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white pt-1">
                      {event.titulo}
                    </h2>
                    {event.subtitulo && (
                      <p className="text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-400">
                        {event.subtitulo}
                      </p>
                    )}
                  </div>

                  {/* Referência Bíblica Badge e Botão Ver no Mapa */}
                  <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 self-start sm:self-center">
                    <button
                      id={`btn-jump-map-${event.id}`}
                      onClick={() => handleJumpToMap(event.id)}
                      className="px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-[#004b3c] dark:text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>Ver no Mapa</span>
                    </button>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f3e9] dark:bg-slate-800 text-[#004b3c] dark:text-emerald-300 text-xs font-mono font-bold rounded-xl border border-[#eadeca] dark:border-slate-700">
                      <BookOpen className="w-3.5 h-3.5" />
                      {event.referencia}
                    </span>
                  </div>
                </div>

                {/* Bloco "ONDE" - Geografia e Cenário */}
                <div className="bg-[#faf8f2] dark:bg-slate-800/50 rounded-xl p-4 border border-[#eee9dc] dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>Onde foi contada (Local Geográfico):</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 pl-5">
                      <strong className="text-slate-900 dark:text-white">{event.regiao}:</strong> {event.localEspecifico}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Interlocutores & Ouvintes:</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 pl-5">
                      {event.interlocutores}
                    </p>
                  </div>
                </div>

                {/* Dois Blocos Centrais: Contexto Histórico vs. Contexto Bíblico */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
                  
                  {/* Contexto Histórico */}
                  <div className="bg-stone-50/70 dark:bg-slate-800/40 rounded-xl p-4 sm:p-5 border border-stone-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
                      <Landmark className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      Contexto Histórico & Cultural do Século I
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                      {event.contextoHistorico}
                    </p>
                  </div>

                  {/* Contexto Bíblico */}
                  <div className="bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl p-4 sm:p-5 border border-emerald-200/70 dark:border-emerald-900/50 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                      <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      Contexto Bíblico & Narrativa do Evangelho
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                      {event.contextoBiblico}
                    </p>
                  </div>

                </div>

                {/* Propósito Teológico / Confissão Reformada */}
                <div className="bg-[#f0f9f5] dark:bg-slate-800/80 rounded-xl p-4 border-l-4 border-[#059669] dark:border-emerald-500 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#004b3c] dark:text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Propósito Teológico Central (Ortodoxia Reformada / CWM)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {event.propositoTeologico}
                  </p>
                </div>

                {/* Ações Rápidas da Lição */}
                {event.semana && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                    <div className="text-slate-500 dark:text-slate-400 font-medium">
                      Integrada ao cronograma letivo da Escola Bíblica Dominical
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        id={`btn-timeline-modal-${event.id}`}
                        onClick={() => handleOpenLesson(event.semana)}
                        className="px-3 py-1.5 bg-[#f5f3e9] dark:bg-slate-800 hover:bg-[#eadeca] dark:hover:bg-slate-700 text-[#004b3c] dark:text-emerald-300 font-bold rounded-lg border border-[#eadeca] dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Ver Detalhes da Lição
                      </button>

                      {onGoToRoteiro && (
                        <button
                          id={`btn-timeline-roteiro-${event.id}`}
                          onClick={() => onGoToRoteiro(event.semana!)}
                          className="px-3 py-1.5 bg-[#004b3c] hover:bg-[#00362b] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          Gerar Roteiro Desta Parábola
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-stone-200 dark:border-slate-800 text-center space-y-3">
            <Compass className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhuma parábola encontrada para os critérios selecionados
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tente redefinir o termo de pesquisa ou selecionar outro período do ministério de Jesus.
            </p>
            <button
              onClick={() => { setSelectedPeriodo('todos'); setSelectedRegiao('todas'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#004b3c] text-white text-xs font-bold rounded-lg mt-2 cursor-pointer"
            >
              Limpar Filtros da Timeline
            </button>
          </div>
        )}

      </div>
    </div>
  )}

    </div>
  );
};
