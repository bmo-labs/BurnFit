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
    return `${d.getFullYear()}-${d.getMonth()+1}`; 
}

export function fmtYW(d: Date) {
    return `${d.getFullYear()}-W${getWeekNumber(d)}`; 
}

export function getWeekNumber(d: Date) { 
    return 1; 
}

export function getPrevMonthStart(d: Date) { 
    return new Date(d.getFullYear(), d.getMonth()-1, 1); 
}

export function getNextMonthStart(d: Date) { 
    return new Date(d.getFullYear(), d.getMonth()+1, 1); 
}

export function getPrevWeekStart(d: Date) { 
    const w = startOfWeek(d); 
    w.setDate(w.getDate()-7); 
    return w; 
}

export function getNextWeekStart(d: Date) { 
    const w = startOfWeek(d); 
    w.setDate(w.getDate()+7);
    return w; 
}

export function startOfSunday(d: Date) {
    const base = stripToDay(d);
    const day = base.getDay(); // 0: Sun
    base.setDate(base.getDate() - day);
    return base;
}
