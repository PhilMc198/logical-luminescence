import React, { useState, useEffect, useRef } from 'react';

interface Props {
  duration?: number; // in minutes
  title?: string;
}

const prompts = [
  "Notice your breath. Is your thinking scattered or focused?",
  "How many browser tabs do you have open? Simplify before continuing.",
  "Are you delegating thinking to AI or collaborating with it?",
  "Check your posture. Physical alignment supports mental clarity.",
  "What assumptions are you bringing to this AI interaction?",
  "Is your DMN active or quiet right now?",
  "Are you in a state to receive new information?"
];

export default function MindfulnessTimer({ duration = 5, title = "AI Collaboration Mindfulness Break" }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [prompt, setPrompt] = useState(prompts[0]);
  const intervalRef = useRef<number | null>(null);

  const totalSeconds = duration * 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
    setPrompt("Take a moment to reflect on your cognitive state before continuing your AI-assisted work.");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="my-8 p-8 bg-cosmic-blue/60 backdrop-blur-sm border border-neural-teal/20 rounded-2xl">
      <h3 className="text-2xl font-display font-semibold text-neural-teal mb-6 text-center">
        {title}
      </h3>

      {/* Timer Display */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Progress Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="rgba(45, 212, 191, 0.1)"
            strokeWidth="8"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.4))'
            }}
          />
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold font-mono text-slate-100">
              {String(minutes).padStart(2, '0')}
              <span className="text-neural-teal">:</span>
              {String(seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        {!isRunning && timeLeft === totalSeconds && (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-gradient-to-r from-golden-core to-golden-glow rounded-lg text-cosmic-deep font-semibold hover:shadow-glow-md transition-all duration-300"
          >
            Start
          </button>
        )}
        
        {!isRunning && timeLeft < totalSeconds && timeLeft > 0 && (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-gradient-to-r from-golden-core to-golden-glow rounded-lg text-cosmic-deep font-semibold hover:shadow-glow-md transition-all duration-300"
          >
            Resume
          </button>
        )}

        {isRunning && (
          <button
            onClick={handlePause}
            className="px-6 py-3 border-2 border-neural-teal text-neural-teal rounded-lg font-semibold hover:bg-neural-teal/10 transition-all duration-300"
          >
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="px-6 py-3 border-2 border-slate-500 text-slate-300 rounded-lg font-semibold hover:bg-slate-500/10 transition-all duration-300"
        >
          Reset
        </button>
      </div>

      {/* Prompt */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-slate-300 italic leading-relaxed">
          {timeLeft === 0 ? (
            <span className="text-neural-teal font-semibold">
              Mindfulness break complete. Return to your work with renewed focus.
            </span>
          ) : (
            prompt
          )}
        </p>
      </div>
    </div>
  );
}