import { CalendarData, getCalendarData } from '@/utils/getCalendarData'; // Assume you have the getCalendarData function defined in a separate file
import { useEffect, useState } from 'react';
import Button from './Button';

const Calendar = ({ month, year, handleChange,attendance }: { month: number; year: number, handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,attendance:any}) => {
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
        <div key={`empty-${i}`} className="border border-gray-300 aspect-square pl-3 pt-3" />
      );
    }

    // Render squares for the days in the month
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date();
      const isCurrentMonth = month === currentDate.getMonth()+1;

      const isCurrentDay = isCurrentMonth && day === currentDate.getDate();
      const isPastDay = (month < currentDate.getMonth()+1) || (isCurrentMonth && day < currentDate.getDate());
      const isSaturday = new Date(year, month - 1, day).getDay() === 6;
    
      const dayClassNames = `border border-gray-300 ${
        (isCurrentDay) ? 'bg-blue-500 text-white' : isPastDay ? 'text-gray-400' : ''
      }`;
    
      const isPresent = !isSaturday && (isPastDay || isCurrentDay) && attendance?.data?.attendance_days.includes(day);
    
      days.push(
        <div key={`day-${day}`} className={dayClassNames + ' aspect-square' + ' pl-3 pt-3'}>
          {day}
          {!isSaturday && (isPastDay || isCurrentDay) && (
            <h2 className={`${isPresent ? 'text-green-600' : 'text-red-600'}`}>
              {isPresent ? 'Present' : 'Absent'}
            </h2>
          )}
        </div>
      );
    }
    
    





    // Render empty squares for days after the end day
    for (let i = 0; i < 6 - endDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="border border-gray-300 aspect-square" />
      );
    }

    return days;
  };

  return (<section className='grid border grid-cols-7 rounded-md '>
    <div className='col-span-7 border px-5 py-6'>
      <div className='flex justify-between'>
        <h1>{month}</h1>
        <div className='flex gap-3'>
          <Button variant='outline' type='button'>Today</Button>
          <select onChange={(event) => handleChange(event)} className='text-2xl rounded-md font-semibold flex items-center border h-12'
            value={month.toString()}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
    </div>
    {daysOfWeek.map((day) => (
      <div key={day} className="text-center font-bold border py-2">
        {day}
      </div>
    ))}
    {renderCalendarDays()}

  </section>
  );


};

export default Calendar;
1