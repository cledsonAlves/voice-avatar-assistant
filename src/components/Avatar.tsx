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
      {/* Cabeça */}
      <motion.svg
        viewBox="0 0 100 160"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Crânio */}
        <motion.circle
          cx="50"
          cy="30"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Pescoço */}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="60"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Corpo */}
        <motion.path
          d="M30 60 L50 100 L70 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Braços */}
        <motion.path
          d="M30 65 L20 85 M70 65 L80 85"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Pernas */}
        <motion.path
          d="M50 100 L40 140 M50 100 L60 140"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Círculo de energia */}
        {(isSpeaking || isListening) && (
          <motion.circle
            cx="50"
            cy="30"
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

        {/* Olhos */}
        <motion.g
          animate={{
            scale: isSpeaking ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
          }}
        >
          <circle cx="43" cy="25" r="2" className="fill-current text-primary" />
          <circle cx="57" cy="25" r="2" className="fill-current text-primary" />
        </motion.g>
      </motion.svg>

      {/* Indicador de status */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-primary/70">
        {isSpeaking ? "Falando" : isListening ? "Ouvindo" : "Aguardando"}
      </div>
    </motion.div>
  );
};