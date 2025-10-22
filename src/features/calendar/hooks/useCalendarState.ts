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
    fmtYW,
    weekIndexOf,

} from '../utils/dateUtils';
import type { CalendarMode, CalendarPage, RenderPage } from '../types';
import { useCalendarData } from './useCalendarData';

export function useCalendarState() {
    const today = useMemo(() => stripToDay(new Date()), []);
    const [mode, setMode] = useState<CalendarMode>('month');
    const [anchorDate, setAnchorDate] = useState<Date>(stripToDay(new Date()));
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const { getMonthDays, getWeekDays } = useCalendarData();

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

    const renderPages: RenderPage[] = useMemo(() => {
        return pages.map(p => {
            if (mode === 'month') {
                const monthDays = getMonthDays(p.startDate);
                const rows = monthWeeksCount(p.startDate);
                let selectedRow = weekIndexOf(p.startDate, selectedDate);
                if (selectedRow < 0) selectedRow = 0;
                if (selectedRow >= rows) selectedRow = rows - 1;
                return {
                    ...p,
                    monthDays,
                    weekDays: getWeekDays(startOfWeek(selectedDate)),
                    rows,
                    selectedRow,
                };
            } else {
                const weekStart = startOfWeek(p.startDate);
                return {
                    ...p,
                    monthDays: [],                     
                    weekDays: getWeekDays(weekStart), 
                    rows: 1,
                    selectedRow: 0,
                };
            }
        });
    }, [pages, mode, selectedDate, getMonthDays, getWeekDays]);


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
        renderPages,
        goPrevPage,
        goNextPage,
        switchMode
    };
}
