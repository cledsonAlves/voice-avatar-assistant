import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ isSpeaking, isListening }) => {
  return (
    <motion.div
      className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
      animate={{
        scale: isSpeaking ? [1, 1.1, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        repeat: isSpeaking ? Infinity : 0,
      }}
    >
      <div className="relative">
        {/* Base circle */}
        <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20" />
        </div>
        
        {/* Animation rings */}
        {(isSpeaking || isListening) && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/30"
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
      </div>
    </motion.div>
  );
};