import React, { useEffect, useRef } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { CalendarPage } from '../types';
import CalendarPageRenderer from './CalendarPageRenderer';

type Props = {
    pages: CalendarPage[]; 
    mode: 'month' | 'week';
    selectedDate: Date;
    onSelectDate: (d: Date) => void;
    goPrevPage: () => void;
    goNextPage: () => void;
    getMonthDays: (startDate: Date) => Date[]; 
    getWeekDays: (startDate: Date) => Date[]; 
};

export default function CalendarPager({
    pages, mode, selectedDate, onSelectDate,
    goPrevPage, goNextPage, getMonthDays, getWeekDays,
}: Props) {
    const { width } = useWindowDimensions();
    const ref = useRef<FlatList<CalendarPage>>(null);

    useEffect(() => {
        requestAnimationFrame(() => ref.current?.scrollToIndex({ index: 1, animated: false }));
    }, [pages, mode]);

    return (
        <FlatList
            ref={ref}
            data={pages}
            horizontal
            pagingEnabled
            keyExtractor={(p) => p.key}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={{ width }}>
                    <CalendarPageRenderer
                        mode={mode}
                        page={item}
                        selectedDate={selectedDate}
                        onSelectDate={onSelectDate}
                        getMonthDays={getMonthDays}
                        getWeekDays={getWeekDays}
                    />
                </View>
            )}
            getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
            initialScrollIndex={1}
            onMomentumScrollEnd={(e) => {
                const page = Math.round(e.nativeEvent.contentOffset.x / width);
                if (page === 0) goPrevPage();
                if (page === 2) goNextPage();
            }}
        />
    );
}