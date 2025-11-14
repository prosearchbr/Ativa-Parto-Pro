import React from 'react';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  image: React.ReactNode;
  effectiveness: number; // percentage 0-100
  isWarning?: boolean;
}

// Estrutura de dados estática para uma fase
export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  content?: React.ReactNode;
  exercises?: Exercise[];
}

// Estrutura de estado dinâmico para o progresso do usuário
export interface PhaseState {
    id: number;
    // Para fases de conteúdo simples
    completed: boolean; 
    // Para fases de exercícios, rastreia a conclusão de cada exercício
    exercisesCompleted: Record<string, boolean>;
}