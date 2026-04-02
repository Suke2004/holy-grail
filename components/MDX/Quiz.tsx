'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuizProps {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export function Quiz({ question, answers, correctAnswer }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="my-10 border border-zinc-800 bg-[#09090b] rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10">
        <h3 className="font-semibold text-lg text-white mb-2 tracking-tight">Quick Check</h3>
        <p className="mb-6 text-zinc-400 text-[15px]">{question}</p>
        
        <div className="flex flex-col gap-3">
          {answers.map((answer, index) => {
            const isSelected = selected === index;
            const isCorrect = isSelected && index === correctAnswer;
            const isWrong = isSelected && index !== correctAnswer;
            const isRevealedCorrect = selected !== null && index === correctAnswer;
            
            return (
              <motion.button 
                key={index}
                whileHover={selected === null ? { scale: 1.01 } : {}}
                whileTap={selected === null ? { scale: 0.99 } : {}}
                disabled={selected !== null}
                onClick={() => setSelected(index)}
                className={cn(
                  "relative p-4 rounded-lg text-left transition-all duration-300 border outline-none text-sm font-medium",
                  {
                    "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700": selected === null,
                    "bg-emerald-950/30 border-emerald-900/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]": isCorrect || isRevealedCorrect,
                    "bg-red-950/30 border-red-900/60 text-red-300": isWrong,
                    "opacity-50 grayscale select-none": selected !== null && !isCorrect && !isWrong && !isRevealedCorrect
                  }
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{answer}</span>
                  <AnimatePresence>
                    {(isCorrect || isRevealedCorrect) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-emerald-500"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    )}
                    {isWrong && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-red-500"
                      >
                        <XCircle className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
