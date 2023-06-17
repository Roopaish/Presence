export interface CalendarData {
  startDay: number;
  endDay: number;
  totalDays: number;
}

export function getCalendarData(month: number, year: number): CalendarData {
  const date = new Date(year, month - 1, 1);
  const startDay = date.getDay();
  const totalDays = new Date(year, month, 0).getDate();
  const endDate = new Date(year, month - 1, totalDays);
  const endDay = endDate.getDay();

  return {
    startDay,
    endDay,
    totalDays,
  };
}
