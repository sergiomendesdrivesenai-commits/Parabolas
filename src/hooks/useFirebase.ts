import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export interface LessonOverride {
  youtubeLink?: string;
  teacherMessage?: string;
  pdfUrl?: string;
  pdfFileName?: string;
}

export interface AppSettings {
  headerImageUrl?: string;
}

export function useFirebase() {
  const [isTeacher, setIsTeacher] = useState(() => {
    return localStorage.getItem('ebd_is_teacher') === 'true';
  });

  const [overrides, setOverrides] = useState<Record<number, LessonOverride>>({});
  const [appSettings, setAppSettings] = useState<AppSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeOverrides = onSnapshot(collection(db, 'lesson_overrides'), (snapshot) => {
      const data: Record<number, LessonOverride> = {};
      snapshot.forEach(doc => {
        data[Number(doc.id)] = doc.data() as LessonOverride;
      });
      setOverrides(data);
      setLoading(false);
    });

    const unsubscribeSettings = onSnapshot(doc(db, 'app_settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setAppSettings(docSnap.data() as AppSettings);
      } else {
        setAppSettings({});
      }
    });

    return () => {
      unsubscribeOverrides();
      unsubscribeSettings();
    };
  }, []);

  const login = (password: string) => {
    if (password === 'ipaebd') {
      setIsTeacher(true);
      localStorage.setItem('ebd_is_teacher', 'true');
      return true;
    } else {
      alert("Senha incorreta!");
      return false;
    }
  };

  const logout = () => {
    setIsTeacher(false);
    localStorage.removeItem('ebd_is_teacher');
  };

  const saveOverride = async (semana: number, data: LessonOverride) => {
    if (!isTeacher) return;
    try {
      await setDoc(doc(db, 'lesson_overrides', semana.toString()), data, { merge: true });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar alterações.");
    }
  };

  const saveHeaderImage = async (headerImageUrl: string) => {
    if (!isTeacher) return;
    try {
      await setDoc(doc(db, 'app_settings', 'global'), { headerImageUrl }, { merge: true });
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      alert("Erro ao salvar a imagem do cabeçalho.");
    }
  };

  return { isTeacher, overrides, appSettings, loading, login, logout, saveOverride, saveHeaderImage };
}
