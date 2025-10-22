export type CalendarMode = 'month' | 'week';

export type CalendarPage = {
    key: string;
    startDate: Date;
    spanWeeks: number;
};

export type RenderPage = CalendarPage & {
    monthDays: Date[];  
    weekDays: Date[];    
    rows: number;       
    selectedRow: number;
};