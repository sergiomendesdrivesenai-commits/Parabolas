export interface Lesson {
  semana: number;
  data: string;
  titulo: string;
  referencia: string;
  bloco: 'revista' | 'consolidação';
  doutrina: string;
  doutrinaDesc: string;
  foco: string;
  introducao: string;
  esboco: string;
  perguntas: string;
  aplicacao: string;
  verdadeCentral: string;
  iconName: string;
  textoBiblicoCompleto?: string;
  versaoBiblica?: string;
}

export type TabType = 'cronograma' | 'timeline' | 'conceitos' | 'roteiro' | 'pitch' | 'jornal' | 'professor' | 'midia' | 'ebook';

export type FilterType = 'todos' | 'revista' | 'consolidação' | 'favoritos';

export interface LessonSlide {
  title: string;
  conceptTitle: string;
  bullets: string[];
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  number: number;
  verses: BibleVerse[];
}

export interface BibleBookMeta {
  id: number;
  code: string;
  name: string;
  abbrev: string;
  testament: 'AT' | 'NT';
  category: string;
  chapters: number;
}

export interface BibleBookData {
  id: number;
  code: string;
  name: string;
  abbrev: string;
  chapters: BibleChapter[];
}

