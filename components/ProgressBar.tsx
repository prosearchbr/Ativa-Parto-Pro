
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-rose-600">Seu Progresso</span>
        <span className="text-sm font-semibold text-gray-500">{current} de {total} passos</span>
      </div>
      <div className="w-full bg-rose-100 rounded-full h-2.5">
        <div
          className="bg-rose-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
