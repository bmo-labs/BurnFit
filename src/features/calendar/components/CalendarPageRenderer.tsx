import React from 'react';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import { CalendarPage } from '../types';

type Props = {
  mode: 'month'|'week';
  page: CalendarPage;
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  getMonthDays: (startDate: Date) => Date[];
  getWeekDays: (startDate: Date) => Date[];
};

export default function CalendarPageRenderer({
  mode, page, selectedDate, onSelectDate, getMonthDays, getWeekDays
}: Props) {
  if (mode === 'month') {
    const days = getMonthDays(page.startDate);
    return <CalendarMonthView monthStart={page.startDate} days={days} selectedDate={selectedDate} onSelect={onSelectDate} />;
  } else {
    const days = getWeekDays(page.startDate);
    return <CalendarWeekView weekStart={page.startDate} days={days} selectedDate={selectedDate} onSelect={onSelectDate} />;
  }
}