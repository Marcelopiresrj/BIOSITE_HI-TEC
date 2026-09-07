import React from 'react';

interface InstagramFilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const InstagramFilterBar: React.FC<InstagramFilterBarProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'videos', label: 'Vídeos / Reels 🎬' },
    { id: 'smartphones', label: 'Smartphones 📱' },
    { id: 'acessorios', label: 'Acessórios 🎧' },
  ];

  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2 px-4 mb-1 flex items-center gap-2 snap-x">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`snap-start whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
