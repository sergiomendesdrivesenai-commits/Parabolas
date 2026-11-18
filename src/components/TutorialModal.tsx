import React from 'react';
import { X, BookOpen, Calendar, History, Landmark, UserCheck, Presentation, Newspaper, HelpCircle, ShieldCheck, Video } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
      <div 
        id="tutorialPrintArea"
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-emerald-100 dark:border-emerald-900/50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-100 dark:border-slate-800 bg-stone-50 dark:bg-slate-900/80 no-print">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#004b3c] text-white flex items-center justify-center shadow-xs">
                <HelpCircle className="w-5 h-5 text-emerald-300" />
             </div>
             <div>
               <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">
                 Guia de Uso & Tutorial
               </h2>
               <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                 Como utilizar a plataforma EBD
               </p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-stone-200 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex-1">
            <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Cabeçalho da Impressão (Visível apenas na impressão ou topo do conteúdo) */}
                <div className="text-center space-y-3 pb-6 border-b border-stone-200 dark:border-slate-700">
                    <h1 className="text-3xl font-serif font-bold text-[#004b3c] dark:text-emerald-400">Escola Bíblica Dominical</h1>
                    <h2 className="text-xl font-serif text-slate-700 dark:text-slate-300">As Parábolas de Jesus - Guia de Utilização</h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
                        Este documento detalha o objetivo de cada funcionalidade do aplicativo, projetado para auxiliar professores e alunos no estudo expositivo e doutrinário das Parábolas.
                    </p>
                </div>

                {/* Seção 1 */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        Objetivo Geral do Aplicativo
                    </h3>
                    <p className="text-sm leading-relaxed">
                        A plataforma foi desenvolvida como uma ferramenta de apoio pedagógico e exegético para a Escola Bíblica Dominical. Seu objetivo principal é fornecer recursos organizados — cronogramas, mapas, contextos históricos, esboços teológicos, roteiros e atividades lúdicas — para garantir que o ensino das Parábolas de Jesus seja fiel às Escrituras, profundo doutrinariamente e didático para a igreja.
                    </p>
                </div>

                {/* Seção 2 */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold font-serif text-slate-800 dark:text-slate-100 border-b border-stone-200 dark:border-slate-700 pb-2">
                        Explicação das Abas e Botões
                    </h3>

                    {/* Funcionalidade: Cronograma */}
                    <div className="bg-stone-50 dark:bg-slate-800/50 p-4 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-400">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: Cronograma</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Fornecer a visão geral do semestre, organizando as 22 semanas de estudo.
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Cartões de Aula:</strong> Mostram a data, tema, referência bíblica e o foco de cada lição.</li>
                            <li><strong>Filtros:</strong> Permitem visualizar apenas "Aulas da Revista", "Aulas de Consolidação" ou "Favoritas".</li>
                            <li><strong>Botão "Ver Detalhes":</strong> Abre uma janela (Modal) com a exegese completa, esboço da aula, doutrina e botão para copiar as informações da lição.</li>
                            <li><strong>Ícone de Estrela:</strong> Permite ao professor marcar aulas favoritas para acesso rápido.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: Timeline/Mapa */}
                    <div className="bg-stone-50 dark:bg-slate-800/50 p-4 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-400">
                                <History className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: Timeline e Mapa</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Situar o aluno geograficamente e historicamente. As parábolas não foram contadas no vácuo; o local e a audiência importam para a interpretação.
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Mapa Interativo:</strong> Exibe regiões da Palestina (Galileia, Samaria, Judeia, Pereia). Clicar nos marcadores revela os eventos ocorridos ali.</li>
                            <li><strong>Timeline (Linha do Tempo):</strong> Ordena as parábolas pelo momento provável do ministério de Jesus (Ano de Inauguração, Popularidade, Oposição, etc.).</li>
                            <li><strong>Dossiê:</strong> Ao selecionar um evento, um painel lateral exibe a referência bíblica, contexto da audiência e o clima daquele momento do ministério.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: Pilares Doutrinários */}
                    <div className="bg-stone-50 dark:bg-slate-800/50 p-4 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-400">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: Pilares Doutrinários</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Garantir a ortodoxia e o ensino sólido. Aqui estão os conceitos teológicos reformados que sustentam a revista.
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Lista de Conceitos:</strong> Traz definições rápidas de termos como "Soberania de Deus", "Graça Irresistível", "Justificação", etc.</li>
                            <li><strong>Pesquisa:</strong> Uma barra de busca permite ao professor encontrar rapidamente o significado de um pilar teológico para explicar à classe.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: Gerador de Roteiros */}
                    <div className="bg-stone-50 dark:bg-slate-800/50 p-4 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-400">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: Gerador de Roteiros</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Preparar o plano de aula do professor (o "plano de voo").
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Seleção de Aula:</strong> O professor escolhe a semana que vai lecionar.</li>
                            <li><strong>Formato A4:</strong> O texto é formatado em página branca padrão, estruturado em Cabeçalho, Leitura Recomendada, Esboço, e Momentos da Aula (Atos).</li>
                            <li><strong>Botão Imprimir (Roteiro):</strong> Localizado no topo direito desta aba, permite gerar o PDF daquele roteiro específico para levar impresso para a sala de aula.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: E-book */}
                    <div className="bg-emerald-50 dark:bg-slate-800/50 p-4 rounded-xl border border-emerald-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-400">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: E-book</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Fornecer um livro digital contínuo com o conteúdo de leitura rico de cada lição.
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Leitura Contínua:</strong> Escolha a semana para ler todo o conteúdo (introdução, esboço, aplicação e perguntas).</li>
                            <li><strong>Contexto Histórico:</strong> Acompanha dados geográficos e o cenário onde a parábola foi contada (integrado ao Mapa/Timeline).</li>
                            <li><strong>Base Doutrinária:</strong> Inclui o embasamento teológico e o trecho de apoio da Confissão de Fé de Westminster.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: Slides Sugeridos */}
                    <div className="bg-stone-50 dark:bg-slate-800/50 p-4 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-400">
                                <Presentation className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: Slides Sugeridos</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Facilitar a apresentação visual da aula para igrejas que usam datashow/TV.
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Visualização de Apresentação:</strong> Mostra exatamente o que deve estar escrito na tela em cada momento da aula (Ato 1, Ato 2, Ato 3).</li>
                            <li><strong>Cópia Fácil:</strong> Cada slide virtual orienta o professor na criação do material em softwares como PowerPoint ou Canva.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: Mídia & Recados */}
                    <div className="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-xl border border-blue-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-200 dark:bg-blue-900/50 rounded-lg text-blue-700 dark:text-blue-400">
                                <Video className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: Mídia & Recados</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Centralizar o conteúdo extra, vídeos do YouTube e recados ao vivo disponibilizados pelo professor.
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Recados do Professor:</strong> Os alunos podem visualizar os comunicados, pedidos de oração ou orientações de leitura prévia deixados pelo professor em cada semana.</li>
                            <li><strong>Material em Vídeo:</strong> Contém o player integrado do YouTube com conteúdos relevantes selecionados pelo professor para fixação.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: Área do Professor */}
                    <div className="bg-amber-50 dark:bg-slate-800/50 p-4 rounded-xl border border-amber-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-amber-200 dark:bg-amber-900/50 rounded-lg text-amber-700 dark:text-amber-400">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: Área do Professor</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Fornecer um painel administrativo exclusivo (com login de educador) para controlar o que os alunos veem na aba de Mídia.
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
                            <li><strong>Acesso com Senha:</strong> Autenticação direta. Apenas quem possui a senha da classe pode enviar atualizações de materiais.</li>
                            <li><strong>Edição Sincronizada:</strong> O professor pode selecionar qualquer aula, colar o link de um vídeo do YouTube e digitar um recado. Ao clicar em Salvar, essas informações aparecem instantaneamente para os alunos na aba <em>Mídia & Recados</em>.</li>
                        </ul>
                    </div>

                    {/* Funcionalidade: O Publicano */}
                    <div className="bg-stone-50 dark:bg-slate-800/50 p-4 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-400">
                                <Newspaper className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Aba: O Publicano (Jornal)</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            <strong>Objetivo:</strong> Atividade complementar e lúdica. Funciona como um boletim interativo com manchetes da época, caça-palavras e palavras cruzadas para fixação.
                        </p>
                    </div>
                </div>

                {/* Seção de Controles do Sistema */}
                <div className="space-y-4 border-t border-stone-200 dark:border-slate-700 pt-6">
                    <h3 className="text-lg font-bold font-serif text-slate-800 dark:text-slate-100">Controles do Sistema</h3>
                    <ul className="text-sm space-y-3 list-none text-stone-600 dark:text-stone-300">
                        <li className="flex items-start gap-3">
                            <span className="p-1 bg-stone-200 dark:bg-slate-700 rounded-md shrink-0">🌞/🌙</span>
                            <span><strong>Tema Claro/Escuro:</strong> O botão com ícone de Sol ou Lua no cabeçalho permite ajustar a luminosidade da tela para conforto visual.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="p-1 bg-stone-200 dark:bg-slate-700 rounded-md shrink-0"><BookOpen className="w-4 h-4 text-emerald-600"/></span>
                            <span><strong>Limpar e Voltar:</strong> Clicar na logo da "Escola Bíblica Dominical" (o livro verde no topo esquerdo) limpa todos os filtros e abas ativas, retornando o aplicativo ao estado inicial.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
