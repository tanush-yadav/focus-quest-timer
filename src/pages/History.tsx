
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Calendar, Check, X } from "lucide-react";

const History = () => {
  const navigate = useNavigate();
  
  // Empty state for now - will be populated with actual history data in future
  const sessions: any[] = [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Session History</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 container py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Aug 15, 2023</span>
                        </div>
                        <h3 className="font-medium">Daily Training Session</h3>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1 justify-end">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">50:00</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-green-600">Completed</span>
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-center py-16 px-4"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Session History</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-6">
                Complete your first session to see your history here
              </p>
              
              <Button 
                onClick={() => navigate('/session')}
              >
                Start a Session
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default History;
