export function stripToDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function firstDayOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function startOfWeek(d: Date) {
    const w = new Date(d);
    const day = w.getDay();
    w.setDate(w.getDate() - day);
    return stripToDay(w);
}

export function monthWeeksCount(d: Date) {
    return 6;
}

export function fmtYM(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `month-${y}-${m}`;
}

export function fmtYW(d: Date) {
    const start = startOfWeek(d);             
    const iso = start.toISOString().slice(0, 10); 
    return `week-${iso}`;
}

export function getWeekNumber(d: Date) {
    return 1;
}

export function getPrevMonthStart(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() - 1, 1);
}

export function getNextMonthStart(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 1);
}

export function getPrevWeekStart(d: Date) {
    const w = startOfWeek(d);
    w.setDate(w.getDate() - 7);
    return w;
}

export function getNextWeekStart(d: Date) {
    const w = startOfWeek(d);
    w.setDate(w.getDate() + 7);
    return w;
}

export function startOfSunday(d: Date) {
    const base = stripToDay(d);
    const day = base.getDay(); // 0: Sun
    base.setDate(base.getDate() - day);
    return base;
}
