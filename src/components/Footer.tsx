import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#004b3c] dark:bg-[#002f25] text-slate-400 border-t-4 border-[#059669] dark:border-emerald-500 py-8 text-center text-xs mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 space-y-2">
        <p className="font-sans">
          © 2027 Igreja Presbiteriana de Anápolis. Evangelização e Edificação Comunitária.
        </p>
        <p className="text-stone-400 font-serif italic text-[11px]">
          Desenvolvido em fidelidade às Sagradas Escrituras e aos símbolos de fé reformada histórica (Confissão de Fé e Catecismos de Westminster).
        </p>
      </div>
    </footer>
  );
};
