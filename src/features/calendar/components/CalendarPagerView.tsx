import React, { useEffect, useRef } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { CalendarPage } from '../types';
import CalendarPageAnimatedView from './CalendarPageAnimatedView';
import { type SharedValue } from 'react-native-reanimated';
import { monthWeeksCount, weekIndexOf } from '../utils/dateUtils';

type Props = {
    pages: CalendarPage[];
    modeProgress: SharedValue<number>;
    selectedDate: Date;
    onSelectDate: (d: Date) => void;
    goPrevPage: () => void;
    goNextPage: () => void;
    getMonthDays: (startDate: Date) => Date[];
    getWeekDays: (startDate: Date) => Date[];
    showWeekOverlay: boolean;
};

export default function CalendarPagerView({
    pages,
    modeProgress,
    selectedDate,
    onSelectDate,
    goPrevPage,
    goNextPage,
    getMonthDays,
    getWeekDays,
    showWeekOverlay,
}: Props) {
    const { width } = useWindowDimensions();
    const ref = useRef<FlatList<CalendarPage>>(null);

    useEffect(() => {
        requestAnimationFrame(() => {
            ref.current?.scrollToIndex({ index: 1, animated: false });
        });
    }, [pages]);

    return (
        <FlatList
            ref={ref}
            data={pages}
            horizontal
            pagingEnabled
            keyExtractor={(p) => p.key}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                const rows = monthWeeksCount(item.startDate);
                let selectedRow = weekIndexOf(item.startDate, selectedDate);
                if (selectedRow < 0) selectedRow = 0;
                if (selectedRow >= rows) selectedRow = rows - 1;

                return (
                    <View style={{ width }}>
                        <CalendarPageAnimatedView
                            page={item}
                            selectedDate={selectedDate}
                            onSelectDate={onSelectDate}
                            getMonthDays={getMonthDays}
                            getWeekDays={getWeekDays}
                            modeProgress={modeProgress}
                            cellSize={Math.floor(width / 7)}
                            rows={rows}
                            selectedRow={selectedRow}
                            showWeekOverlay={showWeekOverlay}
                        />
                    </View>
                );
            }}
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