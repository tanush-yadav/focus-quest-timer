import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Pause, XCircle, CheckCircle2 } from "lucide-react";
import FocusExercise from "@/components/FocusExercise";
import QuizExercise from "@/components/QuizExercise";

type SessionState = "not_started" | "focus_exercise" | "quiz" | "completed" | "paused";

const Session = () => {
  const [sessionState, setSessionState] = useState<SessionState>("not_started");
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startSession = () => {
    setSessionState("focus_exercise");
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          completeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "Session Started!",
      description: "Your 50-minute training session has begun",
    });
  };

  const pauseSession = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Pause
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleExerciseComplete = () => {
    // Increment the current exercise index
    setCurrentExercise(prev => {
      const next = prev + 1;
      // If we've completed all exercises, move to the quiz
      if (next >= 3) { // Assuming there are 3 exercises
        switchToQuiz();
      }
      return next;
    });
  };

  const switchToQuiz = () => {
    setSessionState("quiz");
    toast({
      title: "Starting Quiz Module",
      description: "Well done on the focus exercises! Now let's test your knowledge",
    });
  };

  const completeSession = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setSessionState("completed");
    toast({
      title: "Session Completed!",
      description: "Great job completing today's training session",
    });
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getProgressColor = () => {
    const percentLeft = (timeLeft / (50 * 60)) * 100;
    if (percentLeft > 66) return "bg-green-500";
    if (percentLeft > 33) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Auto-switch between focus and quiz modules at midpoint
  useEffect(() => {
    if (sessionState === "focus_exercise" && timeLeft <= 25 * 60) {
      switchToQuiz();
    }
  }, [timeLeft, sessionState]);

  const renderSessionContent = () => {
    switch (sessionState) {
      case "not_started":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Ready for Today's Session?</h2>
            <p className="mb-8 text-gray-600 max-w-md mx-auto">
              Your 50-minute session includes focus exercises and knowledge quizzes designed to improve ADHD management skills.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mx-auto">
              <Button 
                onClick={startSession}
                className="px-8 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <Play className="h-5 w-5" />
                <span>Begin Session</span>
              </Button>
            </motion.div>
          </motion.div>
        );
        
      case "focus_exercise":
      case "paused":
        return (
          <motion.div 
            key="focus-exercise"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-xl"
          >
            <FocusExercise 
              isPaused={isPaused} 
              currentExercise={currentExercise} 
              onComplete={handleExerciseComplete} 
            />
          </motion.div>
        );
        
      case "quiz":
        return (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-xl"
          >
            <QuizExercise />
          </motion.div>
        );
        
      case "completed":
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Session Complete!</h2>
            <p className="mb-6 text-gray-600">
              Great job on completing today's training session. Take a 10-minute break before continuing with your day.
            </p>
            
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Today's Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Completion</p>
                  <p className="font-bold text-lg">100%</p>
                </div>
                <div>
                  <p className="text-gray-600">Accuracy</p>
                  <p className="font-bold text-lg">82%</p>
                </div>
                <div>
                  <p className="text-gray-600">Response</p>
                  <p className="font-bold text-lg">+5%</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1 py-6 rounded-xl"
              >
                Home
              </Button>
              <Button 
                onClick={() => navigate('/progress')}
                className="flex-1 py-6 rounded-xl"
              >
                View Progress
              </Button>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Timer header */}
      {sessionState !== "not_started" && sessionState !== "completed" && (
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100">
          <div className="container py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={pauseSession}
                className="rounded-full"
              >
                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-mono text-xl font-medium">{formatTime(timeLeft)}</span>
                </div>
                <Progress 
                  className="w-36 h-1.5 mt-1.5"
                  value={(timeLeft / (50 * 60)) * 100}
                >
                  <div className={`h-full ${getProgressColor()}`} style={{ width: `${(timeLeft / (50 * 60)) * 100}%` }} />
                </Progress>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full text-gray-500"
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {renderSessionContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Session;
