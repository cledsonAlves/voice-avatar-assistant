import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ isSpeaking, isListening }) => {
  return (
    <motion.div
      className="w-64 h-96 relative"
      animate={{
        scale: isSpeaking ? [1, 1.02, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        repeat: isSpeaking ? Infinity : 0,
      }}
    >
      <motion.svg
        viewBox="0 0 100 160"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cabeça Robótica */}
        <motion.path
          d="M30 10 L70 10 L70 40 L30 40 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />
        
        {/* Antenas */}
        <motion.path
          d="M40 10 L35 0 M60 10 L65 0"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />

        {/* Pescoço Mecânico */}
        <motion.path
          d="M40 40 L40 50 L60 50 L60 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Corpo Robótico */}
        <motion.path
          d="M30 50 L70 50 L75 100 L25 100 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Detalhes do Corpo */}
        <motion.path
          d="M35 60 L65 60 M35 70 L65 70 M35 80 L65 80"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
        />

        {/* Braços Robóticos */}
        <motion.path
          d="M25 55 L15 70 L20 90 M75 55 L85 70 L80 90"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Pernas Robóticas */}
        <motion.path
          d="M35 100 L30 120 L35 140 M65 100 L70 120 L65 140"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Juntas das Pernas */}
        <motion.circle cx="30" cy="120" r="2" className="fill-current text-primary" />
        <motion.circle cx="70" cy="120" r="2" className="fill-current text-primary" />

        {/* Olhos LED */}
        <motion.g
          animate={{
            scale: isSpeaking ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
          }}
        >
          <rect x="38" y="20" width="8" height="4" className="fill-current text-primary" />
          <rect x="54" y="20" width="8" height="4" className="fill-current text-primary" />
        </motion.g>

        {/* Círculo de Energia */}
        {(isSpeaking || isListening) && (
          <motion.circle
            cx="50"
            cy="75"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary/30"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </motion.svg>

      {/* Indicador de status */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-primary/70">
        {isSpeaking ? "Falando" : isListening ? "Ouvindo" : "Aguardando"}
      </div>
    </motion.div>
  );
};