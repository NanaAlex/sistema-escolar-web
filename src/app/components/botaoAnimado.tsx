'use client';

import { useState } from 'react';

type BotaoAnimadoProps = {
  texto: string;
  className?: string;
  corNormal?: string;
  corHover?: string;
  corClicado?: string;
  corOnda?: string;
  onClick?: () => void;
};

export default function BotaoAnimado({
  texto,
  className = '',
  corNormal = 'bg-black',
  corHover = 'hover:bg-[#BAE8F4]',
  corClicado = 'bg-[#66C6F1]',
  corOnda = 'bg-white/40',
  onClick,
}: BotaoAnimadoProps) {
  const [clicado, setClicado] = useState(false);

  function clicarBotao() {
    setClicado(true);

    if (onClick) {
      onClick();
    }

    setTimeout(() => {
      setClicado(false);
    }, 500);
  }

  return (
    <button
      onClick={clicarBotao}
      className={`
        relative overflow-hidden
        rounded-[22px]
        text-white font-bold
        transition-all duration-300

        ${clicado ? corClicado : `${corNormal} ${corHover}`}
        ${className}
      `}
    >
      <span
        className={`
          absolute left-1/2 top-1/2
          h-full w-15/100
          -translate-x-1/2 -translate-y-1/2
          rounded-10/100
          transition-all duration-500

          ${corOnda}
          ${clicado ? 'left-[12px] opacity-100' : 'opacity-0'}
        `}
      />

      <span
        className={`
          absolute left-1/2 top-1/2
          h-full w-15/100
          -translate-x-1/2 -translate-y-1/2
          rounded-10/100
          transition-all duration-500

          ${corOnda}
          ${clicado ? 'left-[calc(100%-12px)] opacity-100' : 'opacity-0'}
        `}
      />

      <span className="relative z-10">
        {texto}
      </span>
    </button>
  );
}