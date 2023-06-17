import { CalendarData, getCalendarData } from '@/utils/getCalendarData'; // Assume you have the getCalendarData function defined in a separate file
import { useEffect, useState } from 'react';

const Calendar = ({ month, year }: { month: number; year: number }) => {
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);

  useEffect(() => {
    const data = getCalendarData(month, year);
    setCalendarData(data);
  }, [month, year]);

  if (!calendarData) {
    return null;
  }

  const { startDay, endDay, totalDays } = calendarData;
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendarDays = () => {
    const days = [];

    // Render empty squares for days before the start day
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="border border-gray-300" />
      );
    }

    // Render squares for the days in the month
    for (let day = 1; day <= totalDays; day++) {
      const isCurrentMonth = day <= totalDays;
      const isCurrentDay = isCurrentMonth && day === new Date().getDate();
      const isPastDay = isCurrentMonth && day < new Date().getDate();

      const dayClassNames = `border border-gray-300 ${isCurrentDay ? 'bg-blue-500 text-white' : isPastDay ? 'text-gray-400' : ''
        }`;

      days.push(
        <div key={`day-${day}`} className={dayClassNames}>
          {day}
        </div>
      );
    }

    // Render empty squares for days after the end day
    for (let i = 0; i < 6 - endDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="border border-gray-300" />
      );
    }

    return days;
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center font-bold">
          {day}
        </div>
      ))}
      {renderCalendarDays()}
    </div>
  );
};

export default Calendar;
