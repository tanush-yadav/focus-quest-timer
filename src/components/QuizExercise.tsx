
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X, ChevronRight, Brain, Clock, Zap } from "lucide-react";

// Mock quiz questions
const QUIZ_QUESTIONS = [
  {
    id: 1,
    type: "knowledge",
    question: "Which part of the brain is often underdeveloped in people with ADHD?",
    options: [
      "Prefrontal cortex",
      "Temporal lobe",
      "Cerebellum",
      "Amygdala"
    ],
    correctAnswer: 0,
    explanation: "The prefrontal cortex, responsible for executive functions like planning and impulse control, is often underdeveloped in people with ADHD."
  },
  {
    id: 2,
    type: "knowledge",
    question: "Which of these is NOT an effective environmental strategy for ADHD?",
    options: [
      "Using noise-cancelling headphones",
      "Working in complete silence at all times",
      "Creating a dedicated workspace",
      "Using visual reminders"
    ],
    correctAnswer: 1,
    explanation: "Working in complete silence is not always best for everyone with ADHD. Many people with ADHD actually focus better with some background noise."
  },
  {
    id: 3,
    type: "strategy",
    question: "You have a big project due in two weeks. What's the most effective approach?",
    options: [
      "Wait until you feel motivated to start",
      "Break it into small tasks with deadlines",
      "Pull an all-nighter the day before",
      "Rely on the pressure of the deadline"
    ],
    correctAnswer: 1,
    explanation: "Breaking large projects into smaller, manageable tasks with specific deadlines helps overcome procrastination and overwhelm."
  },
  {
    id: 4,
    type: "strategy",
    question: "You keep forgetting important items when leaving home. What should you try?",
    options: [
      "Accept that forgetfulness is just part of ADHD",
      "Create a checklist by the door",
      "Buy duplicates of everything",
      "Leave earlier each day"
    ],
    correctAnswer: 1,
    explanation: "Creating a visual checklist by the door provides an external reminder system, which compensates for working memory challenges."
  }
];

const QuizExercise = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    
    setSelectedOption(index);
    
    // Check if correct and update score
    if (index === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Show explanation after selection
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Current question data
  const questionData = QUIZ_QUESTIONS[currentQuestion];
  
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isCompleted ? (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="relative h-20 w-20">
                <motion.div
                  className="absolute inset-0 bg-green-100 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-10 w-10 text-green-600" />
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2">Quiz Module Complete!</h2>
            <p className="text-gray-600 mb-6">
              Great job! You answered {score} out of {QUIZ_QUESTIONS.length} questions correctly.
            </p>
            
            <div className="inline-block bg-blue-50 rounded-lg px-4 py-3 text-blue-700 mb-4">
              <p className="text-sm">Continue with your session to complete today's training.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Quiz header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {questionData.type === "knowledge" ? (
                    <Brain className="h-5 w-5 text-primary mr-2" />
                  ) : (
                    <Zap className="h-5 w-5 text-amber-500 mr-2" />
                  )}
                  <span className="text-sm font-medium">
                    {questionData.type === "knowledge" ? "Knowledge Question" : "Strategy Application"}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1}/{QUIZ_QUESTIONS.length}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-6">{questionData.question}</h3>
            </div>
            
            {/* Options */}
            <div className="space-y-3 mb-6">
              {questionData.options.map((option, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: selectedOption === null ? 1.01 : 1 }}
                  whileTap={{ scale: selectedOption === null ? 0.99 : 1 }}
                >
                  <Button
                    onClick={() => handleSelectOption(index)}
                    variant="outline"
                    className={`w-full justify-start p-4 h-auto text-left ${
                      selectedOption === index 
                        ? index === questionData.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : ""
                    } ${selectedOption !== null && index === questionData.correctAnswer ? "border-green-500 bg-green-50" : ""}`}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 ${
                        selectedOption === index 
                          ? index === questionData.correctAnswer
                            ? "border-green-500 bg-green-100"
                            : "border-red-500 bg-red-100"
                          : "border-gray-300"
                      } ${selectedOption !== null && index === questionData.correctAnswer ? "border-green-500 bg-green-100" : ""}`}>
                        {selectedOption === index ? (
                          index === questionData.correctAnswer ? (
                            <Check className="h-3.5 w-3.5 text-green-600" />
                          ) : (
                            <X className="h-3.5 w-3.5 text-red-600" />
                          )
                        ) : (
                          selectedOption !== null && index === questionData.correctAnswer ? (
                            <Check className="h-3.5 w-3.5 text-green-600" />
                          ) : null
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-1">Explanation</h4>
                    <p className="text-sm text-blue-800">{questionData.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Next button */}
            {selectedOption !== null && (
              <div className="flex justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button onClick={handleNextQuestion} className="flex items-center gap-1">
                    <span>{currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Complete Quiz"}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            )}
            
            {/* Progress bar */}
            <div className="mt-8">
              <Progress value={((currentQuestion + (selectedOption !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizExercise;
