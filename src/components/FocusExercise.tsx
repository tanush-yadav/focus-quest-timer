
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Brain, RotateCw } from "lucide-react";

// Types of focus exercises
const EXERCISE_TYPES = [
  {
    id: "sustained",
    title: "Sustained Attention",
    description: "Track the moving object while ignoring distractions",
    icon: <Target className="h-5 w-5" />,
    durationSeconds: 60
  },
  {
    id: "selective",
    title: "Selective Attention",
    description: "Find specific items in the visual scene",
    icon: <Brain className="h-5 w-5" />,
    durationSeconds: 60
  },
  {
    id: "divided",
    title: "Divided Attention",
    description: "Complete two tasks simultaneously",
    icon: <RotateCw className="h-5 w-5" />,
    durationSeconds: 60
  }
];

interface FocusExerciseProps {
  isPaused: boolean;
  currentExercise: number;
  onComplete: () => void;
}

const FocusExercise = ({ isPaused, currentExercise, onComplete }: FocusExerciseProps) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISE_TYPES[0].durationSeconds);
  const [isCompleted, setIsCompleted] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [distractions, setDistractions] = useState<Array<{ id: number; x: number; y: number; }>>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    }))
  );

  // For demo purposes, we'll simulate the exercise with a moving target
  useEffect(() => {
    if (isPaused || isCompleted) return;

    const interval = setInterval(() => {
      // Move the target
      setTargetPosition({
        x: Math.min(Math.max(targetPosition.x + (Math.random() * 10) - 5, 10), 90),
        y: Math.min(Math.max(targetPosition.y + (Math.random() * 10) - 5, 10), 90)
      });

      // Move distractions
      setDistractions(prev => 
        prev.map(d => ({
          ...d,
          x: Math.min(Math.max(d.x + (Math.random() * 8) - 4, 5), 95),
          y: Math.min(Math.max(d.y + (Math.random() * 8) - 4, 5), 95)
        }))
      );

      // Decrease timer
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetPosition, isPaused, isCompleted]);

  // Reset when moving to a new exercise
  useEffect(() => {
    if (isCompleted && !isPaused) {
      const timer = setTimeout(() => {
        const nextIndex = exerciseIndex + 1;
        
        if (nextIndex < EXERCISE_TYPES.length) {
          setExerciseIndex(nextIndex);
          setTimeLeft(EXERCISE_TYPES[nextIndex].durationSeconds);
          setIsCompleted(false);
          setTargetPosition({ x: 50, y: 50 });
          setDistractions(Array.from({ length: 5 }, (_, i) => ({
            id: i,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          })));
        } else {
          // Call onComplete to signal that all exercises are done
          onComplete();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isCompleted, exerciseIndex, isPaused, onComplete]);

  // Current exercise data
  const currentExerciseData = EXERCISE_TYPES[exerciseIndex];

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="w-full">
      {/* Exercise header */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {exerciseIndex + 1}
          </span>
          <h2 className="text-xl font-semibold">{currentExerciseData.title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{currentExerciseData.description}</p>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-6">
          <span>Time remaining:</span>
          <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Exercise content */}
      <div className="relative w-full bg-gray-50 aspect-square rounded-xl overflow-hidden mb-4 border border-gray-200">
        {isPaused ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-medium text-gray-500">Paused</p>
          </div>
        ) : isCompleted ? (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-medium">Exercise Complete!</p>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* Distractions */}
            <AnimatePresence>
              {distractions.map((distraction) => (
                <motion.div
                  key={distraction.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 0.6, 
                    scale: 1,
                    x: `${distraction.x}%`,
                    y: `${distraction.y}%`,
                    transition: { 
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                      x: { duration: 2, ease: "easeInOut" },
                      y: { duration: 2, ease: "easeInOut" }
                    }
                  }}
                  className="absolute w-8 h-8 bg-gray-300 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${distraction.x}%`, top: `${distraction.y}%` }}
                />
              ))}
            </AnimatePresence>
            
            {/* Target */}
            <motion.div
              animate={{ 
                x: `${targetPosition.x}%`,
                y: `${targetPosition.y}%`,
                transition: { 
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
              className="absolute w-12 h-12 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
            >
              <div className="w-4 h-4 bg-white rounded-full" />
            </motion.div>
          </>
        )}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{exerciseIndex + 1}/{EXERCISE_TYPES.length}</span>
        </div>
        <Progress value={((exerciseIndex + (isCompleted ? 1 : 0)) / EXERCISE_TYPES.length) * 100} />
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 mb-2">
        {currentExerciseData.id === "sustained" && (
          <p>Follow the blue circle with your eyes, try to ignore the gray distractions.</p>
        )}
        {currentExerciseData.id === "selective" && (
          <p>Focus on finding patterns in the movements while maintaining concentration.</p>
        )}
        {currentExerciseData.id === "divided" && (
          <p>Mentally track both the position and the movement pattern simultaneously.</p>
        )}
      </div>
    </div>
  );
};

export default FocusExercise;
