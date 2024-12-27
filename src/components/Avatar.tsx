import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
  assistantId: string;
}

const getAvatarColors = (assistantId: string) => {
  switch (assistantId) {
    case "9sFroVSgPhgpGak8Jygu":
      return "from-blue-500 to-purple-500";
    case "another_assistant_id_1":
      return "from-green-500 to-teal-500";
    case "another_assistant_id_2":
      return "from-orange-500 to-red-500";
    default:
      return "from-primary to-secondary";
  }
};

export const Avatar: React.FC<AvatarProps> = ({ isSpeaking, isListening, assistantId }) => {
  const gradientColors = getAvatarColors(assistantId);
  
  return (
    <motion.div
      className={cn(
        "w-32 h-32 rounded-full bg-gradient-to-r flex items-center justify-center",
        gradientColors
      )}
      animate={{
        scale: isSpeaking ? [1, 1.1, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        repeat: isSpeaking ? Infinity : 0,
      }}
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center">
          <div className={cn(
            "w-16 h-16 rounded-full bg-gradient-to-r",
            gradientColors.replace("500", "200")
          )} />
        </div>
        
        {(isSpeaking || isListening) && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full border-4",
              gradientColors.replace("500", "300")
            )}
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