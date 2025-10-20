import { startOfSunday } from '../utils/dateUtils';

export function useCalendarData() {
    const getMonthDays = (startOfMonth: Date): Date[] => {
        const y = startOfMonth.getFullYear();
        const m = startOfMonth.getMonth(); // 0-based

        const first = new Date(y, m, 1);
        const firstWeekday = first.getDay(); // 0: Sun
        const daysInMonth = new Date(y, m + 1, 0).getDate();

        // prev month tail
        const prevMonthDays = firstWeekday;
        const prevMonthLastDate = new Date(y, m, 0).getDate();

        const grid: Date[] = [];

        // 앞쪽(이전달)
        for (let i = prevMonthDays - 1; i >= 0; i--) {
            grid.push(new Date(y, m - 1, prevMonthLastDate - i));
        }
        // 이번달
        for (let d = 1; d <= daysInMonth; d++) {
            grid.push(new Date(y, m, d));
        }
        // 뒤쪽(다음달) 채워서 42칸
        while (grid.length < 42) {
            const nextIndex = grid.length - (prevMonthDays + daysInMonth) + 1;
            grid.push(new Date(y, m + 1, nextIndex));
        }
        return grid;
    };

    const getWeekDays = (startOfWeek: Date): Date[] => {
        const start = startOfSunday(startOfWeek);
        const arr: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            arr.push(d);
        }
        return arr;
    };

    return { getMonthDays, getWeekDays };
}

