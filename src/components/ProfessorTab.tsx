import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { useFirebase, LessonOverride } from '../hooks/useFirebase';
import { 
  ShieldCheck, LogIn, LogOut, Save, Video, MessageSquare, KeyRound, 
  Image as ImageIcon, Trash2, Upload, CheckCircle2, FileDown, FileText, 
  Download, ExternalLink 
} from 'lucide-react';

interface ProfessorTabProps {
  lessons: Lesson[];
}

export const ProfessorTab: React.FC<ProfessorTabProps> = ({ lessons }) => {
  const { isTeacher, overrides, appSettings, loading, login, logout, saveOverride, saveHeaderImage } = useFirebase();

  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [teacherMessage, setTeacherMessage] = useState('');

  // Configurações de Arquivo PDF para Alunos
  const [pdfInputUrl, setPdfInputUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfFileSize, setPdfFileSize] = useState<string | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Configurações de Imagem do Cabeçalho (Lado Direito)
  const [headerImageInput, setHeaderImageInput] = useState('');
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [imageSavedFeedback, setImageSavedFeedback] = useState(false);

  // Sincronizar imagem salva do Firestore
  useEffect(() => {
    if (appSettings?.headerImageUrl) {
      setHeaderImageInput(appSettings.headerImageUrl);
    } else {
      setHeaderImageInput('');
    }
  }, [appSettings?.headerImageUrl]);

  // Load existing override when selecting a lesson
  useEffect(() => {
    if (overrides[selectedLesson]) {
      setYoutubeLink(overrides[selectedLesson].youtubeLink || '');
      setTeacherMessage(overrides[selectedLesson].teacherMessage || '');
      setPdfInputUrl(overrides[selectedLesson].pdfUrl || '');
      setPdfFileName(overrides[selectedLesson].pdfFileName || '');
      setPdfFileSize(null);
    } else {
      setYoutubeLink('');
      setTeacherMessage('');
      setPdfInputUrl('');
      setPdfFileName('');
      setPdfFileSize(null);
    }
  }, [selectedLesson, overrides]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveOverride(selectedLesson, { 
      youtubeLink: youtubeLink.trim(), 
      teacherMessage: teacherMessage.trim(),
      pdfUrl: pdfInputUrl.trim(),
      pdfFileName: pdfFileName.trim() || `Licao-${selectedLesson}.pdf`
    });
    setIsSaving(false);
    alert('Alterações da lição (vídeo, recado e PDF) salvas com sucesso!');
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo no formato PDF.');
      return;
    }

    // Firestore document limit is ~1MB. Safe limit for base64 is ~750KB.
    if (file.size > 800 * 1024) {
      alert(
        `O arquivo PDF selecionado possui ${(file.size / (1024 * 1024)).toFixed(2)} MB. ` +
        `Para arquivos maiores que 800 KB, recomendamos colar o link compartilhável do Google Drive, OneDrive ou Dropbox no campo "Link Direto / URL do PDF".`
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPdfInputUrl(dataUrl);
      setPdfFileName(file.name);
      setPdfFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePdf = () => {
    if (confirm('Deseja realmente remover o arquivo PDF configurado para esta lição?')) {
      setPdfInputUrl('');
      setPdfFileName('');
      setPdfFileSize(null);
    }
  };

  const handleSaveHeaderImage = async () => {
    setIsSavingImage(true);
    await saveHeaderImage(headerImageInput.trim());
    setIsSavingImage(false);
    setImageSavedFeedback(true);
    setTimeout(() => setImageSavedFeedback(false), 3000);
  };

  const handleRemoveHeaderImage = async () => {
    if (!confirm('Deseja realmente remover a imagem do cabeçalho?')) return;
    setIsSavingImage(true);
    setHeaderImageInput('');
    await saveHeaderImage('');
    setIsSavingImage(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Redimensiona se for muito grande para manter o documento leve
        const maxDim = 360;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png', 0.9);
          setHeaderImageInput(dataUrl);
        } else {
          setHeaderImageInput(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(passwordInput);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Carregando permissões...</div>;
  }

  if (!isTeacher) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 space-y-6">
        <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">Área Restrita do Professor</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Digite a senha de acesso para configurar a imagem do cabeçalho, editar os links de mídia e enviar recados para os alunos em cada lição.
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <input
              type="password"
              placeholder="Senha"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            <LogIn className="w-5 h-5" />
            Acessar Painel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-amber-50 dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-800 dark:text-slate-100">Painel do Professor</h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">Acesso autorizado exclusivo</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 sm:mt-0 px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      {/* SEÇÃO 1: Imagem do Cabeçalho (À Direita) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-stone-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-xl">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-800 dark:text-slate-100">
                Imagem do Cabeçalho (Lado Direito)
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Adicione a logo ou foto da sua igreja para ser exibida no canto direito do cabeçalho.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Formulário de Inserção */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Opção 1: Cole a URL da Imagem
              </label>
              <input
                type="url"
                value={headerImageInput}
                onChange={(e) => setHeaderImageInput(e.target.value)}
                placeholder="https://exemplo.com/logo-igreja.png"
                className="w-full p-3 text-sm bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Opção 2: Carregar do Computador
              </label>
              <label className="flex items-center justify-center gap-2 p-3 bg-stone-100 dark:bg-slate-800/80 hover:bg-stone-200 dark:hover:bg-slate-700/80 border border-dashed border-stone-300 dark:border-slate-600 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Escolher arquivo de imagem</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-stone-500 mt-1">Formatos aceitos: PNG, JPG, WebP ou SVG.</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveHeaderImage}
                disabled={isSavingImage}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {imageSavedFeedback ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
                {isSavingImage ? 'Salvando...' : imageSavedFeedback ? 'Salvo no Cabeçalho!' : 'Salvar Imagem no Cabeçalho'}
              </button>

              {headerImageInput && (
                <button
                  type="button"
                  onClick={handleRemoveHeaderImage}
                  disabled={isSavingImage}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-sm font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                  title="Remover imagem do cabeçalho"
                >
                  <Trash2 className="w-4 h-4" />
                  Remover
                </button>
              )}
            </div>
          </div>

          {/* Pré-visualização ao vivo */}
          <div className="bg-stone-100 dark:bg-slate-800/60 p-4 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Pré-visualização no Cabeçalho
            </h4>
            <div className="p-4 bg-[#004b3c] dark:bg-[#002f25] rounded-xl border border-[#059669]/40 flex items-center justify-between gap-3 text-white">
              <span className="text-xs text-stone-300 font-serif italic">
                Canto direito do topo:
              </span>
              {headerImageInput ? (
                <div className="h-12 max-w-[150px] px-2 py-1 flex items-center justify-center bg-white/10 dark:bg-black/20 rounded-lg border border-white/20">
                  <img
                    src={headerImageInput}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="text-xs text-stone-400 italic bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                  Nenhuma imagem configurada
                </div>
              )}
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              A imagem fica posicionada com proporção ideal à direita da barra superior do cabeçalho.
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: Gerenciamento de Lições (Vídeos e Recados) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-stone-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-xl">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-800 dark:text-slate-100">
                Conteúdos e Recados das Lições
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Adicione vídeos do YouTube e orientações para a aba Mídia & Recados.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
            Selecione a Lição para Editar:
          </label>
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(Number(e.target.value))}
            className="w-full p-3 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
          >
            {lessons.map(lesson => (
              <option key={lesson.semana} value={lesson.semana}>
                Semana {lesson.semana} - {lesson.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-slate-800">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <Video className="w-4 h-4 text-blue-500" />
              Link do YouTube (Opcional)
            </label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full p-3 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-stone-500">Cole o link completo do vídeo relacionado a esta lição.</p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              Recado para os Alunos (Opcional)
            </label>
            <textarea
              value={teacherMessage}
              onChange={(e) => setTeacherMessage(e.target.value)}
              placeholder="Ex: Leiam o texto sugerido antes da aula..."
              rows={4}
              className="w-full p-3 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none custom-scrollbar"
            />
            <p className="text-xs text-stone-500">Este recado aparecerá na Aba Mídia & Recados desta lição.</p>
          </div>

          {/* Arquivo PDF da Lição para os Alunos */}
          <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <FileDown className="w-4 h-4 text-emerald-600" />
                Arquivo PDF para Download dos Alunos (E-book e Estudos)
              </label>
              {pdfInputUrl && (
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> PDF Configurado
                </span>
              )}
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              O arquivo PDF inserido aqui liberará o botão de download no E-book da Lição e na aba de Mídias para os alunos baixarem o material completo.
            </p>

            {/* Status Atual do PDF */}
            {pdfInputUrl ? (
              <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-600 text-white rounded-lg shadow-xs shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">
                        {pdfFileName || `Licao-${selectedLesson}.pdf`}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {pdfFileSize ? `Tamanho: ${pdfFileSize}` : 'Arquivo pronto para download'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={pdfInputUrl}
                      download={pdfFileName || `Licao-${selectedLesson}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Testar Download
                    </a>
                    <button
                      type="button"
                      onClick={handleRemovePdf}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 rounded-lg transition-colors cursor-pointer"
                      title="Remover este arquivo PDF"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-stone-50 dark:bg-slate-800/60 rounded-xl border border-dashed border-stone-300 dark:border-slate-700 text-center space-y-1">
                <FileText className="w-8 h-8 text-stone-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                  Nenhum arquivo PDF anexado para esta lição ainda
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Faça o upload do arquivo PDF ou informe um link abaixo.
                </p>
              </div>
            )}

            {/* Opções de Upload ou Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              
              {/* Opção A: Upload do Computador */}
              <div className="p-4 bg-stone-50 dark:bg-slate-800/80 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                <strong className="block text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  Opção A: Upload do Computador
                </strong>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Envie o arquivo PDF direto do seu dispositivo (até 800 KB):
                </p>
                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white dark:bg-slate-700 border border-stone-300 dark:border-slate-600 hover:bg-stone-50 dark:hover:bg-slate-600 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors shadow-2xs">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Escolher Arquivo PDF</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Opção B: Link Direto / Nuvem */}
              <div className="p-4 bg-stone-50 dark:bg-slate-800/80 rounded-xl border border-stone-200 dark:border-slate-700 space-y-3">
                <strong className="block text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  Opção B: Link Google Drive / Nuvem
                </strong>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Cole o link público do Google Drive, Dropbox ou URL:
                </p>
                <input
                  type="url"
                  value={pdfInputUrl.startsWith('data:') ? '' : pdfInputUrl}
                  onChange={(e) => {
                    setPdfInputUrl(e.target.value);
                    if (!pdfFileName) {
                      setPdfFileName(`Licao-${selectedLesson}-Material.pdf`);
                    }
                  }}
                  placeholder="https://drive.google.com/..."
                  className="w-full p-2.5 bg-white dark:bg-slate-700 border border-stone-300 dark:border-slate-600 rounded-lg text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

            </div>

            {/* Nome do Arquivo para o Aluno */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Nome de Exibição do Arquivo para o Aluno (Opcional):
              </label>
              <input
                type="text"
                value={pdfFileName}
                onChange={(e) => setPdfFileName(e.target.value)}
                placeholder={`Ex: Licao-${selectedLesson}-Parabolas.pdf`}
                className="w-full p-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-slate-800">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Salvando...' : 'Salvar Conteúdo da Lição'}
          </button>
        </div>
      </div>
    </div>
  );
};
