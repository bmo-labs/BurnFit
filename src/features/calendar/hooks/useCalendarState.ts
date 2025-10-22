import { useMemo, useState, useCallback } from 'react';
import {
    getPrevMonthStart,
    getNextMonthStart,
    getPrevWeekStart,
    getNextWeekStart,
    stripToDay,
    firstDayOfMonth,
    monthWeeksCount,
    startOfWeek,
    fmtYM,
    fmtYW
} from '../utils/dateUtils';
import type { CalendarMode, CalendarPage } from '../types';

export function useCalendarState() {
    const [mode, setMode] = useState<CalendarMode>('month');
    const [anchorDate, setAnchorDate] = useState<Date>(stripToDay(new Date()));
    const [selectedDate, setSelectedDate] = useState<Date>(anchorDate);

    const currentPage: CalendarPage = useMemo(() => {
        return mode === 'month'
            ? {
                key: fmtYM(anchorDate),
                startDate: firstDayOfMonth(anchorDate),
                spanWeeks: monthWeeksCount(anchorDate)
            }
            : {
                key: fmtYW(anchorDate),
                startDate: startOfWeek(anchorDate),
                spanWeeks: 1
            };
    }, [anchorDate, mode]);

    const pages: CalendarPage[] = useMemo(() => {
        const prev = mode === 'month'
            ? {
                key: fmtYM(getPrevMonthStart(anchorDate)),
                startDate: firstDayOfMonth(getPrevMonthStart(anchorDate)),
                spanWeeks: monthWeeksCount(getPrevMonthStart(anchorDate))
            }
            : {
                key: fmtYW(getPrevWeekStart(anchorDate)),
                startDate: startOfWeek(getPrevWeekStart(anchorDate)),
                spanWeeks: 1
            };

        const next = mode === 'month'
            ? {
                key: fmtYM(getNextMonthStart(anchorDate)),
                startDate: firstDayOfMonth(getNextMonthStart(anchorDate)),
                spanWeeks: monthWeeksCount(getNextMonthStart(anchorDate))
            }
            : {
                key: fmtYW(getNextWeekStart(anchorDate)),
                startDate: startOfWeek(getNextWeekStart(anchorDate)),
                spanWeeks: 1
            };
        return [prev, currentPage, next];
    }, [anchorDate, mode, currentPage]);

    const goPrevPage = useCallback(() => {
        setAnchorDate(d => (mode === 'month' ? getPrevMonthStart(d) : getPrevWeekStart(d)));
    }, [mode]);

    const goNextPage = useCallback(() => {
        setAnchorDate(d => (mode === 'month' ? getNextMonthStart(d) : getNextWeekStart(d)));
    }, [mode]);

    const switchMode = useCallback(
        (target: CalendarMode, opts?: { anchor?: Date }) => {
            setMode(target);
            if (opts?.anchor) {
                setAnchorDate(stripToDay(opts.anchor));
            }
        },
        []
    );

    return {
        mode,
        anchorDate,
        selectedDate,
        setSelectedDate,
        pages,
        goPrevPage,
        goNextPage,
        switchMode
    };
}
