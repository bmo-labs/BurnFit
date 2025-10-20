export type CalendarMode = 'month' | 'week';

export type CalendarPage = {
  key: string;
  startDate: Date;
  spanWeeks: number;
};