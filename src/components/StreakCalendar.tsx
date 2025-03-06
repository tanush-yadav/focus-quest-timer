
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Days of the week
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Mock completion data (empty for now)
const COMPLETED_DAYS: string[] = [];

const StreakCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };
  
  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Generate calendar days for current month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Generate array of day objects
    const days = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: 0, isCurrentMonth: false });
    }
    
    // Add days of the current month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: today.getFullYear() === year && today.getMonth() === month && today.getDate() === i,
        isCompleted: COMPLETED_DAYS.includes(formatDate(date)),
        isPast: date < new Date(today.setHours(0, 0, 0, 0)),
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </h3>
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToPreviousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Day of week headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayObj, i) => (
          <motion.div 
            key={i}
            whileHover={dayObj.isCurrentMonth ? { scale: 1.05 } : {}}
            className={`aspect-square flex flex-col items-center justify-center rounded-md ${
              dayObj.isCurrentMonth 
                ? dayObj.isToday
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-gray-50'
                : 'text-gray-300'
            }`}
          >
            {dayObj.day > 0 && (
              <>
                <span className="text-sm">{dayObj.day}</span>
                {dayObj.isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                ) : dayObj.isPast ? (
                  <Circle className="h-4 w-4 text-gray-300 mt-1" />
                ) : null}
              </>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center mt-4 gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <Circle className="h-3 w-3 text-gray-300" />
          <span>Missed</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
