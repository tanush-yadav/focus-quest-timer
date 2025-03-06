
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Brain, Clock, ActivitySquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 max-w-lg mx-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full"
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative h-24 w-24 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 bg-blue-100 rounded-full"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                }}
              />
              <Brain className="h-12 w-12 text-primary relative z-10" />
            </div>
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ADHD Training & Quiz
          </motion.h1>
          <motion.p 
            className="text-gray-600 mb-8 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your daily 50-minute structured session to improve focus and executive function
          </motion.p>
        </motion.div>

        <motion.div 
          className="w-full space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center"
          >
            <Button 
              onClick={() => navigate('/session')}
              className="w-full max-w-md py-6 text-lg font-medium rounded-xl bg-primary text-white shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Start Today's Session</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 pt-2 max-w-md mx-auto w-full">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1"
            >
              <Button 
                onClick={() => navigate('/progress')}
                variant="outline"
                className="w-full py-5 rounded-xl border-2 hover:bg-secondary/50 transition-all duration-300 flex flex-col items-center justify-center text-foreground"
              >
                <ActivitySquare className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Progress</span>
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1"
            >
              <Button 
                onClick={() => navigate('/history')}
                variant="outline"
                className="w-full py-5 rounded-xl border-2 hover:bg-secondary/50 transition-all duration-300 flex flex-col items-center justify-center text-foreground"
              >
                <Clock className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">History</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-auto pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-sm text-gray-600">Current streak: 0 days</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
