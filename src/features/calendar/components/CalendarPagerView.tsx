import React, { useEffect, useRef } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import CalendarPageAnimatedView from './CalendarPageAnimatedView';
import { type SharedValue } from 'react-native-reanimated';
import type { RenderPage } from '../types';


type Props = {
    pages: RenderPage[];              
    modeProgress: SharedValue<number>;
    selectedDate: Date;
    onSelectDate: (d: Date) => void;
    goPrevPage: () => void;
    goNextPage: () => void;
};

export default function CalendarPagerView({
    pages,
    modeProgress,
    selectedDate,
    onSelectDate,
    goPrevPage,
    goNextPage,
}: Props) {
    const { width } = useWindowDimensions();
    const ref = useRef<FlatList<RenderPage>>(null);

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
                return (
                    <View style={{ width }}>
                        <CalendarPageAnimatedView
                            page={item}
                            monthDays={item.monthDays}
                            weekDays={item.weekDays}
                            rows={item.rows}
                            selectedRow={item.selectedRow}
                            modeProgress={modeProgress}
                            cellSize={Math.floor(width / 7)}
                            selectedDate={selectedDate}
                            onSelectDate={onSelectDate}
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