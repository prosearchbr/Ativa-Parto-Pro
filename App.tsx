import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Phase, PhaseState, Exercise } from './types';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import ProgressBar from './components/ProgressBar';

// --- Ícones para Fases e Exercícios ---
const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const ExerciseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const PlateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12.75a9.75 9.75 0 01-9.75 9.75A9.75 9.75 0 012.25 12.75m19.5 0V9a2.25 2.25 0 00-2.25-2.25H15M2.25 12.75V9a2.25 2.25 0 012.25-2.25H9m12.75 0a2.25 2.25 0 012.25 2.25v3.75m0 0a2.25 2.25 0 01-2.25 2.25H15m-12.75 0a2.25 2.25 0 00-2.25 2.25v3.75m0 0a2.25 2.25 0 002.25 2.25H9" />
    </svg>
);
const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);
const BodyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const GalleryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);


const WalkingVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /><path d="M12.293 11.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z" /></svg></div>;

const PelvicMovementsVisual = () => <div className="text-rose-400 w-24 h-24 flex items-center justify-center"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0, 5)"><path d="M36,92 L64,92" fill="none" stroke="#7F8C8D" strokeWidth="2" strokeLinecap="round"/><path d="M43,26 C43,22 47,20 50,20 C53,20 57,22 57,26 L57,32 L43,32 Z" fill="#4A4A4A"/><path d="M50,4 C54,4 57,7 57,11 L57,14 C60,16 62,18 62,21 L62,25 L38,25 L38,21 C38,18 40,16 43,14 L43,11 C43,7 46,4 50,4 Z" fill="#E6A3A3"/><path d="M57,32 C62,32 66,35 66,45 L66,55 C66,58 63,60 60,60 L57,60 L57,32 Z" fill="#E6A3A3"/><path d="M43,32 C38,32 34,35 34,45 L34,55 C34,58 37,60 40,60 L43,60 L43,32 Z" fill="#E6A3A3"/><path d="M60,60 C60,68 56,72 50,72 C44,72 40,68 40,60 L60,60 Z" fill="#333D46"/><path d="M43,32 L57,32 L57,50 C57,58 54,64 50,64 C46,64 43,58 43,50 Z" fill="#DB7093"/><circle cx="50" cy="50" r="10" fill="#E6A3A3" opacity="0.4"/><path d="M34,48 L34,70 L28,74 L28,88 L34,84 L34,92" fill="none" stroke="#333D46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M66,48 L66,70 L72,74 L72,88 L66,84 L66,92" fill="none" stroke="#333D46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="50" cy="82" r="14" fill="#1ABC9C"/><g transform="translate(15, 10)"><circle cx="15" cy="15" r="12" fill="white" stroke="#95A5A6" strokeWidth="1.5"/><path d="M15,8 L15,22 M11,12 L15,8 L19,12 M11,18 L15,22 L19,18" fill="none" stroke="#95A5A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g></g></svg></div>;
const BridgeOnBallVisual = () => <div className="text-rose-400 w-24 h-24 flex items-center justify-center"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="translate(5, 15)"><path d="M22,80 L88,80" fill="none" stroke="#7F8C8D" strokeWidth="2" strokeLinecap="round"/><path d="M72,26 C75,26 78,29 78,32 C78,35 75,38 72,38 C69,38 66,35 66,32 C66,29 69,26 72,26 Z" fill="#E6A3A3"/><path d="M72,38 L50,46 L40,60 L24,56 L24,50 L40,54 L50,42 L72,38 Z" fill="#4A4A4A"/><path d="M24,56 L24,66 L30,68 L30,76 L22,76" fill="none" stroke="#333D46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M50,46 L40,60 L48,70 L60,60 L50,46 Z" fill="#DB7093"/><circle cx="54" cy="56" r="10" fill="#E6A3A3" opacity="0.4"/><path d="M78,32 L82,32 L82,24 L74,22 L72,26" fill="none" stroke="#E6A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="58" cy="68" r="16" fill="#1ABC9C"/><path d="M48,70 L40,78 L32,74" fill="none" stroke="#333D46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></g></svg></div>;
const PelvicTiltVisual = () => <div className="text-rose-400 w-24 h-24 flex items-center justify-center"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="translate(5, 15)"><path d="M22,80 L88,80" fill="none" stroke="#7F8C8D" strokeWidth="2" strokeLinecap="round"/><path d="M72,26 C75,26 78,29 78,32 C78,35 75,38 72,38 C69,38 66,35 66,32 C66,29 69,26 72,26 Z" fill="#E6A3A3"/><path d="M72,38 L50,46 L40,60 L24,56 L24,50 L40,54 L50,42 L72,38 Z" fill="#4A4A4A"/><path d="M32,78 L26,78 L24,70" fill="none" stroke="#333D46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M50,46 L40,60 L48,70 L60,60 L50,46 Z" fill="#DB7093"/><circle cx="54" cy="56" r="10" fill="#E6A3A3" opacity="0.4"/><path d="M78,32 L82,32 L82,24 L74,22 L72,26" fill="none" stroke="#E6A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M48,70 L42,78" fill="none" stroke="#333D46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="42" cy="68" r="16" fill="#1ABC9C"/><g transform="translate(68, 8)"><circle cx="15" cy="15" r="12" fill="white" stroke="#95A5A6" strokeWidth="1.5"/><path d="M19,11 L11,19 M11,11 L11,14 L14,11 Z M19,19 L19,16 L16,19 Z" fill="none" stroke="#95A5A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g></g></svg></div>;

const MassageVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg></div>;
const FreeBackVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>;
const ShowerVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 005-5V7a2 2 0 00-2-2h-1a2 2 0 00-2 2v1a2 2 0 002 2h3m-3-9V3a2 2 0 00-2-2h-3a2 2 0 00-2 2v2" /></svg></div>;

const FourPointsVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a1 1 0 100-2 1 1 0 000 2z"/><path d="M19 12h-2l-2 4-3-6-3 4h-2"/><path d="M6 12h-2"/><path d="M4.2 16.2l-1.4 1.4"/><path d="M19.8 16.2l1.4 1.4"/><path d="M19 8l-2-2"/><path d="M5 8l2-2"/></svg></div>;
const VerticalPositionsVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a1 1 0 100-2 1 1 0 000 2z"/><path d="M7 21v-5"/><path d="M12 21v-7"/><path d="M17 21v-9"/><path d="M5 11l7-4 7 4"/></svg></div>;
const BirthingPoolVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a1 1 0 100-2 1 1 0 000 2z"/><path d="M19.6 19.6a9 9 0 01-15.2 0"/><path d="M5 21v-2.3c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2V21"/><path d="M3.5 17.5c.6.6 1.4 1 2.3 1.1"/><path d="M20.5 17.5c-.6.6-1.4 1-2.3 1.1"/><path d="M10 13c.6-1.4 2-2 3.5-2 .9 0 1.7.3 2.3.8"/></svg></div>;
const LyingDownVisual = () => <div className="text-red-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a1 1 0 100-2 1 1 0 000 2z"/><path d="M5 12h14"/><path d="M15 12v5"/><path d="M9 12v5"/><path d="M12 17h.01"/></svg></div>;

const SupportVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" transform="translate(-4)" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" transform="translate(-4)" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" transform="translate(4)" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" transform="translate(4)" /></svg></div>;
const WaterReliefVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.001 13.5c2.666-1 5.333-1 8 0 2.666 1 5.333 1 8 0M4.001 18c2.666-1 5.333-1 8 0 2.666 1 5.333 1 8 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>;
const FirstMeetingVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /><circle cx="12" cy="12" r="2" transform="translate(0, 2)" /></svg></div>;
const BreathingVisual = () => <div className="text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 8c0-3.314 2.686-6 6-6v16c-3.314 0-6-2.686-6-6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 8c0-3.314-2.686-6-6-6v16c3.314 0 6-2.686 6-6z" /></svg></div>;

// --- Dados Estáticos do Protocolo ---
const PHASES_DATA: Phase[] = [
  {
    id: 1,
    title: 'Orientações Essenciais',
    subtitle: 'O ponto de partida seguro.',
    Icon: BookOpenIcon,
    content: (
        <div className="space-y-4 text-gray-700">
            <p className="text-lg">Bem-vinda ao AtivaPartoPro! Este é o seu guia gamificado para uma preparação ativa e consciente para o parto. Antes de começar, leia cada ponto com atenção.</p>
            <ul className="list-disc list-inside space-y-3 pl-2 bg-rose-50 p-4 rounded-lg">
                <li><strong>Aprovação Médica é INEGOCIÁVEL:</strong> Este protocolo é um complemento, não um substituto. Converse com seu médico ou obstetra sobre cada fase antes de iniciar.</li>
                <li><strong>Idade Gestacional:</strong> Inicie as atividades físicas e alimentares apenas <strong>após completar 37 semanas</strong> de uma gestação sem complicações.</li>
                <li><strong>Ouça seu Corpo:</strong> Você é a maior especialista em si mesma. Se sentir qualquer dor, tontura, sangramento ou desconforto anormal, <strong>pare imediatamente</strong> e contate seu médico.</li>
                <li><strong>Ritmo Individual:</strong> Não existe competição. O objetivo é bem-estar, conexão e preparação. Vá no seu ritmo, celebre cada passo e adapte o que for preciso para sua realidade.</li>
            </ul>
            <Disclaimer text="Segurança em primeiro lugar. Sua saúde e a do seu bebê são a prioridade máxima." level="critical" />
        </div>
    ),
  },
  {
    id: 2,
    title: 'Fase 1: Movimento é Vida',
    subtitle: 'Exercícios para preparar o corpo.',
    Icon: ExerciseIcon,
    exercises: [
        { id: 'ex1', name: 'Caminhada Leve', description: 'Uma caminhada de 30 minutos em ritmo confortável. A gravidade é sua aliada, ajudando o bebê a descer e se encaixar na pelve.', image: <WalkingVisual />, effectiveness: 70 },
        { id: 'ex2a', name: 'Movimentos Pélvicos na Bola', description: 'Sentada na bola, realize quiques suaves e movimentos circulares com o quadril. Isso promove a flexibilidade pélvica e alivia a pressão na lombar.', image: <PelvicMovementsVisual />, effectiveness: 90 },
        { id: 'ex2b', name: 'Ponte com Pernas na Bola', description: 'Deitada de costas, apoie os pés na bola e eleve o quadril para fortalecer o assoalho pélvico e os glúteos.', image: <BridgeOnBallVisual />, effectiveness: 80 },
        { id: 'ex2c', name: 'Báscula Pélvica com Apoio', description: 'Com as pernas flexionadas sobre a bola, realize movimentos suaves para mobilizar a pelve e aliviar a tensão lombar.', image: <PelvicTiltVisual />, effectiveness: 85 },
        { id: 'ex3', name: 'Massagem nas Costas', description: 'Peça para seu parceiro(a) aplicar uma pressão firme e contínua na região lombar, especialmente durante as contrações de treinamento. Isso alivia a dor e promove o relaxamento.', image: <MassageVisual />, effectiveness: 85 },
        { id: 'ex4', name: 'Costas Livres (Free Back)', description: 'Evite deitar de barriga para cima. Prefira posições que liberam o sacro (osso no final da coluna), como ficar de quatro, de lado ou inclinada para frente. Isso dá mais espaço para o bebê se mover.', image: <FreeBackVisual />, effectiveness: 95 },
        { id: 'ex5', name: 'Dica: Chuveiro Terapêutico', description: 'Leve a bola de pilates para o chuveiro! A água morna caindo nas costas enquanto você se move na bola é uma ferramenta poderosa para alívio da dor e relaxamento profundo.', image: <ShowerVisual />, effectiveness: 80 },
    ]
  },
  {
    id: 3,
    title: 'Fase 2: Nutrindo o Corpo',
    subtitle: 'Alimentos que podem ajudar.',
    Icon: PlateIcon,
    content: (
        <div className="space-y-4 text-gray-700">
            <p>A nutrição nas semanas finais pode dar ao seu corpo a energia e os componentes necessários para o grande dia. Lembre-se: moderação e liberação médica são fundamentais.</p>
             <ul className="list-disc list-inside space-y-3 pl-2">
                <li><strong>Tâmaras:</strong> Consideradas um "superalimento" para gestantes. Estudos sugerem que consumir tâmaras diariamente nas últimas 4 semanas pode estar associado a uma maior dilatação na chegada ao hospital e menor necessidade de indução.</li>
                <li><strong>Abacaxi (fresco):</strong> Contém a enzima bromelina, que acredita-se ajudar a "amaciar" o colo do útero, facilitando a dilatação. Consuma a fruta fresca, pois o calor do cozimento destrói a enzima.</li>
                <li><strong>Chá de Folhas de Framboesa:</strong> Um tônico uterino tradicional. Não induz o parto, mas ajuda a fortalecer e tonificar os músculos do útero, tornando as contrações mais eficientes. Comece com 1 xícara por dia e aumente gradualmente se liberado pelo seu médico.</li>
                <li><strong>Hidratação Constante:</strong> Água é essencial! Um útero bem hidratado funciona de forma mais eficaz. Beba água, água de coco e chás de ervas permitidos.</li>
            </ul>
           <Disclaimer text="Cada organismo é único. Alimentos picantes ou outros métodos populares devem ser discutidos com seu profissional de saúde." level="warning" />
        </div>
    )
  },
  {
    id: 4,
    title: 'Fase 3: Posições para o Parto',
    subtitle: 'Encontre o que funciona para você.',
    Icon: BodyIcon,
    exercises: [
        { id: 'pos1', name: 'Quatro Apoios', description: 'Alivia a pressão nas costas, usa a gravidade e ajuda na rotação do bebê. Ótima para o conforto e progresso.', image: <FourPointsVisual />, effectiveness: 95 },
        { id: 'pos2', name: 'Posições Verticais (De pé, Agachada)', description: 'A gravidade é sua maior aliada para a descida do bebê. Movimente-se, dance, apoie-se no(a) parceiro(a).', image: <VerticalPositionsVisual />, effectiveness: 90 },
        { id: 'pos3', name: 'Imersão em Água Morna', description: 'A água morna relaxa os músculos, alivia a dor e proporciona uma sensação de leveza e controle.', image: <BirthingPoolVisual />, effectiveness: 85 },
        { id: 'pos4', name: 'Posição Deitada (A ser evitada)', description: 'Conhecida como litotômica. Pode comprimir vasos, diminuir o espaço na pelve e dificultar a expulsão. Converse sobre alternativas!', image: <LyingDownVisual />, effectiveness: 10, isWarning: true },
    ]
  },
  {
    id: 5,
    title: 'Fase 4: O Poder das Emoções',
    subtitle: 'A ocitocina como sua aliada.',
    Icon: HeartIcon,
    content: (
        <div className="space-y-4 text-gray-700">
          <p>Seu estado emocional é talvez o fator mais crucial. O trabalho de parto é uma dança hormonal regida pela <strong>Ocitocina</strong>, o hormônio do amor, do prazer e da conexão.</p>
          <p>Para que a ocitocina flua livremente, você precisa se sentir <strong>segura, calma, amada e sem medo</strong>. O principal inimigo da ocitocina é a <strong>Adrenalina</strong> (hormônio do estresse e do medo), que pode retardar ou até parar o trabalho de parto.</p>
          <p className="font-bold text-rose-600">Sua tarefa é criar um "ninho de ocitocina". O que te faz feliz?</p>
           <ul className="list-disc list-inside space-y-2 pl-2 bg-rose-50 p-4 rounded-lg">
            <li>Assista sua comédia favorita que te faz gargalhar.</li>
            <li>Ouça playlists que elevam seu espírito e te fazem dançar.</li>
            <li>Receba massagens, abraços e beijos do seu parceiro(a).</li>
            <li>Converse com pessoas que te apoiam e te fazem sentir bem.</li>
            <li>Pratique a gratidão, focando nas coisas boas da sua vida.</li>
            <li>Desconecte-se de notícias ruins e evite ambientes ou conversas estressantes.</li>
          </ul>
          <p className="font-semibold text-center mt-4">Sua felicidade e relaxamento são os aceleradores mais potentes e naturais do parto!</p>
        </div>
    )
  },
  {
    id: 6,
    title: 'Fase 5: Galeria de Inspiração',
    subtitle: 'Visualize a força do parto.',
    Icon: GalleryIcon,
    exercises: [
        { id: 'gal1', name: 'Apoio e Conexão', description: 'O apoio contínuo de um(a) parceiro(a) ou doula é comprovadamente benéfico, reduzindo a ansiedade e a dor.', image: <SupportVisual />, effectiveness: 100 },
        { id: 'gal2', name: 'Alívio na Água', description: 'A imersão em água morna é uma ferramenta poderosa para o relaxamento muscular e alívio natural da dor durante o trabalho de parto.', image: <WaterReliefVisual />, effectiveness: 100 },
        { id: 'gal3', name: 'O Primeiro Encontro', description: 'Manter o foco no momento mágico de conhecer seu bebê pode ser a maior motivação para atravessar os desafios do parto.', image: <FirstMeetingVisual />, effectiveness: 100 },
        { id: 'gal4', name: 'Respiração e Calma', description: 'A respiração consciente e profunda é sua âncora. Ela oxigena seu corpo e seu bebê, e mantém sua mente centrada e calma.', image: <BreathingVisual />, effectiveness: 100 },
    ]
  },
  {
    id: 7,
    title: 'Fase 6: Mentalização para o Parto',
    subtitle: 'Visualizando o sucesso.',
    Icon: BrainIcon,
    content: (
       <div className="space-y-6 text-gray-700">
          <p>A mente é uma ferramenta poderosa. Onde a mente vai, o corpo tende a seguir. Dedique um tempo diário para visualizar seu parto de forma positiva. Isso não é sobre ignorar os desafios, mas sobre treinar sua mente para a confiança e a calma.</p>
          <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-300">
            <h4 className="font-bold text-rose-800">Guia 1: Confiança no Meu Corpo</h4>
            <p className="mt-2 italic">"Eu respiro fundo e sinto a força que reside em mim. Meu corpo foi perfeitamente desenhado para este momento. Cada contração é uma onda de energia, poderosa e produtiva, que me aproxima do meu bebê. Eu não luto contra ela, eu a acolho. Eu sou forte, sou resiliente, sou capaz. Meu corpo sabe o que fazer, e eu me entrego a esse processo com calma e confiança. A cada onda, meu colo se abre suavemente, como uma flor desabrochando para o sol."</p>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-300">
            <h4 className="font-bold text-teal-800">Guia 2: Encontro com Meu Bebê</h4>
            <p className="mt-2 italic">"Eu me conecto com meu bebê. Sinto sua presença, sua força. Estamos trabalhando juntos, como a melhor equipe que já existiu. Eu envio amor e calma para ele(a), e sinto sua confiança em mim. Visualizo o momento mágico em que o terei em meus braços, o calor da sua pele na minha, o som da sua primeira respiração. Essa imagem é minha âncora, minha motivação. Cada passo desta jornada vale a pena por este encontro sagrado. Estamos prontos. Estamos quase lá."</p>
          </div>
        </div>
    )
  },
];

// --- Componentes da UI ---

const Checkbox: React.FC<{ checked: boolean; onChange: () => void; label?: string }> = ({ checked, onChange, label }) => (
  <label onClick={(e) => { e.preventDefault(); onChange(); }} className="flex items-center space-x-3 cursor-pointer">
    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${ checked ? 'bg-rose-500 border-rose-500' : 'bg-white border-gray-300'}`}>
      <svg className={`w-5 h-5 text-white ${checked ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    {label && <span className={`text-lg font-semibold ${checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{label}</span>}
  </label>
);

const ExerciseCard: React.FC<{ exercise: Exercise; completed: boolean; onToggle: () => void }> = ({ exercise, completed, onToggle }) => (
    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${exercise.isWarning ? 'border-red-300 bg-red-50' : completed ? 'border-rose-200 bg-rose-50/50' : 'border-gray-200 bg-white'}`}>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className={`flex-shrink-0 flex justify-center items-center h-24 w-24 rounded-full ${exercise.isWarning ? 'bg-red-100' : 'bg-rose-100'}`}>{exercise.image}</div>
            <div className="flex-grow text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                     <Checkbox checked={completed} onChange={onToggle} />
                    <h4 className={`text-xl font-bold ${exercise.isWarning ? 'text-red-800' : completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{exercise.name}</h4>
                </div>
                <p className={`mt-2 ${exercise.isWarning ? 'text-red-700' : 'text-gray-600'}`}>{exercise.description}</p>
            </div>
        </div>
        <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-semibold ${exercise.isWarning ? 'text-red-600' : 'text-rose-600'}`}>{exercise.isWarning ? 'Risco / Ineficácia*' : 'Potencial de Eficácia*'}</span>
                <span className={`text-sm font-bold ${exercise.isWarning ? 'text-red-500' : 'text-rose-500'}`}>{exercise.effectiveness}%</span>
            </div>
            <div className={`w-full rounded-full h-2.5 ${exercise.isWarning ? 'bg-red-100' : 'bg-rose-100'}`}>
                <div className={`h-2.5 rounded-full ${exercise.isWarning ? 'bg-red-500' : 'bg-rose-500'}`} style={{ width: `${exercise.effectiveness}%` }}></div>
            </div>
        </div>
    </div>
);

const PhaseCard: React.FC<{ phase: Phase; isCompleted: boolean; onSelect: () => void; }> = ({ phase, isCompleted, onSelect }) => (
    <button onClick={onSelect} className="w-full text-left p-5 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-5">
        <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-rose-500'}`}>
            <phase.Icon className="h-7 w-7 text-white" />
        </div>
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-800">{phase.title}</h3>
            <p className="text-gray-500">{phase.subtitle}</p>
        </div>
        <div>
            {isCompleted ? (
                 <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
            ) : (
                 <div className="w-7 h-7 rounded-full bg-gray-200"></div>
            )}
        </div>
    </button>
);


// --- Componente Principal ---

const App: React.FC = () => {
    
  const [userName, setUserName] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const appAlreadyStarted = localStorage.getItem('appStarted');
    if (storedName) {
        setUserName(storedName);
    }
    if (appAlreadyStarted) {
        setHasStarted(true);
    }
  }, []);


  const handleStart = (nameInput: string) => {
    const name = nameInput.trim();
    if (name) {
        setUserName(name);
        localStorage.setItem('userName', name);
    } else {
        setUserName(null);
        localStorage.removeItem('userName');
    }
    setHasStarted(true);
    localStorage.setItem('appStarted', 'true');
  };

  const initializeState = (): PhaseState[] => {
    return PHASES_DATA.map(phase => ({
      id: phase.id,
      completed: false,
      exercisesCompleted: phase.exercises ? phase.exercises.reduce((acc, ex) => ({ ...acc, [ex.id]: false }), {}) : {}
    }));
  };

  const [phasesState, setPhasesState] = useState<PhaseState[]>(() => {
    try {
        const savedState = localStorage.getItem('phasesState');
        return savedState ? JSON.parse(savedState) : initializeState();
    } catch (error) {
        console.error("Could not parse phases state from localStorage", error);
        return initializeState();
    }
  });
  
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
  
  useEffect(() => {
      localStorage.setItem('phasesState', JSON.stringify(phasesState));
  }, [phasesState]);


  const phaseIsComplete = useCallback((phase: Phase, state: PhaseState): boolean => {
      if (!state) return false;
      if (phase.exercises) {
          if (phase.exercises.length === 0) return true;
          return phase.exercises.every(ex => state.exercisesCompleted[ex.id]);
      }
      return state.completed;
  }, []);

  const completedPhasesCount = useMemo(() => {
    return PHASES_DATA.reduce((count, phase) => {
        const state = phasesState.find(s => s.id === phase.id);
        if (state && phaseIsComplete(phase, state)) {
            return count + 1;
        }
        return count;
    }, 0);
  }, [phasesState, phaseIsComplete]);

  const handleToggleSimplePhase = (phaseId: number) => {
      setPhasesState(prev => prev.map(s => s.id === phaseId ? { ...s, completed: !s.completed } : s));
  };
  
  const handleToggleExercise = (phaseId: number, exerciseId: string) => {
      setPhasesState(prev => prev.map(s => {
          if (s.id === phaseId) {
              const newExercisesCompleted = { ...s.exercisesCompleted, [exerciseId]: !s.exercisesCompleted[exerciseId] };
              return { ...s, exercisesCompleted: newExercisesCompleted };
          }
          return s;
      }));
  };

  const selectedPhaseData = useMemo(() => {
      if (selectedPhaseId === null) return null;
      return PHASES_DATA.find(p => p.id === selectedPhaseId) || null;
  }, [selectedPhaseId]);

  const selectedPhaseState = useMemo(() => {
      if (selectedPhaseId === null) return null;
      return phasesState.find(s => s.id === selectedPhaseId) || null;
  }, [selectedPhaseId, phasesState]);


  // --- Renderização ---

  if (!hasStarted) {
    return (
        <div className="min-h-screen bg-rose-50 text-gray-800 flex flex-col justify-center items-center p-4">
            <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-rose-500 mb-2">AtivaPartoPro</h1>
            <p className="text-gray-600 text-center mb-8">Protocolo para ativar e acelerar o parto de forma natural e segura.</p>
            
            <div className="w-full max-w-sm space-y-4">
                 <input 
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Qual o seu nome?"
                    className="w-full px-4 py-3 text-lg text-center border-2 border-rose-200 rounded-lg focus:ring-rose-400 focus:border-rose-400"
                />
                <button 
                    onClick={() => handleStart(tempName)}
                    className="w-full bg-rose-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-rose-600 transition-colors"
                >
                    Iniciar Protocolo
                </button>
                <button 
                    onClick={() => handleStart('')}
                    className="w-full text-rose-500 font-semibold py-2 px-4 rounded-lg hover:bg-rose-100 transition-colors"
                >
                    Pular
                </button>
            </div>
        </div>
    );
  }

  if (selectedPhaseId !== null && selectedPhaseData && selectedPhaseState) {
    const isThisPhaseComplete = phaseIsComplete(selectedPhaseData, selectedPhaseState);
    
    return (
        <div className="min-h-screen bg-rose-50 text-gray-800">
            <Header />
            <main className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
                <button onClick={() => setSelectedPhaseId(null)} className="flex items-center space-x-2 text-rose-500 font-semibold mb-6 hover:text-rose-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span>Voltar ao Protocolo</span>
                </button>
                 <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                    <div className="text-center border-b pb-4">
                         <h2 className="text-3xl font-bold text-gray-700">{selectedPhaseData.title}</h2>
                         <p className="text-gray-500 mt-1 text-lg">{selectedPhaseData.subtitle}</p>
                    </div>

                    {selectedPhaseData.content && (
                        <>
                          <div>{selectedPhaseData.content}</div>
                          <div className="pt-6 border-t">
                              <Checkbox checked={selectedPhaseState.completed} onChange={() => handleToggleSimplePhase(selectedPhaseData.id)} label="Marcar esta fase como concluída" />
                          </div>
                        </>
                    )}

                    {selectedPhaseData.exercises && (
                        <div className="space-y-4">
                            {selectedPhaseData.exercises.map(ex => (
                                <ExerciseCard 
                                    key={ex.id}
                                    exercise={ex}
                                    completed={!!selectedPhaseState.exercisesCompleted[ex.id]}
                                    onToggle={() => handleToggleExercise(selectedPhaseData.id, ex.id)}
                                />
                            ))}
                            <p className="text-xs text-gray-500 text-center pt-4">*O Potencial de Eficácia é uma estimativa ilustrativa para fins de motivação e não substitui a orientação médica profissional.</p>
                        </div>
                    )}
                    
                    {isThisPhaseComplete && (
                        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg text-center">
                            <h3 className="font-bold">Fase Concluída!</h3>
                            <p>Excelente trabalho{userName ? `, ${userName}`: ''}! Continue assim.</p>
                        </div>
                    )}

                    <div className="pt-6 mt-6 border-t flex justify-center">
                        <button 
                            onClick={() => setSelectedPhaseId(null)} 
                            className="px-6 py-3 bg-rose-500 text-white font-bold rounded-lg hover:bg-rose-600 transition-colors text-lg"
                        >
                            Voltar ao Protocolo
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
  }

  // TELA PRINCIPAL (DASHBOARD)
  return (
    <div className="min-h-screen bg-rose-50 text-gray-800">
      <Header />
      <main className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-700">{userName ? `Bem-vinda, ${userName}!` : 'Protocolo AtivaPartoPro'}</h2>
                <p className="text-gray-500 mt-1">Siga os passos para uma preparação consciente e ativa.</p>
            </div>
          
            <ProgressBar current={completedPhasesCount} total={PHASES_DATA.length} />
          
            <Disclaimer 
              text="IMPORTANTE: Este guia não substitui a orientação médica. SEMPRE consulte seu médico antes de iniciar qualquer atividade. Recomendado apenas para gestantes com 37+ semanas."
              level="critical"
            />
          
            <div className="space-y-4 pt-4">
              {PHASES_DATA.map((phase) => {
                  const state = phasesState.find(s => s.id === phase.id)!;
                  return (
                    <PhaseCard
                      key={phase.id}
                      phase={phase}
                      isCompleted={phaseIsComplete(phase, state)}
                      onSelect={() => setSelectedPhaseId(phase.id)}
                    />
                  )
              })}
            </div>

            {completedPhasesCount === PHASES_DATA.length && (
              <div className="mt-8 p-6 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg text-center">
                <h3 className="text-xl font-bold">Parabéns{userName ? `, ${userName}` : ''}!</h3>
                <p className="mt-2">Você completou todo o protocolo de preparação! Você está fazendo um trabalho incrível se conectando com seu corpo e seu bebê. Continue com as práticas que mais te fizeram bem e tenha uma ótima hora!</p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;