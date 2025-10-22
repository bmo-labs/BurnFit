import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';

import CalendarHeader from '../components/CalendarHeader';
import WeekLabels from '../components/WeekLabels';
import CalendarPager from '../components/CalendarPagerView';

import { useCalendarState } from '../hooks/useCalendarState';
import { useCalendarData } from '../hooks/useCalendarData';
import { useCalendarModeGesture } from '../hooks/useCalendarModeGesture';
import { startOfWeek, firstDayOfMonth } from '../utils/dateUtils';

export default function CalendarScreen() {
    const {
        mode,
        anchorDate,
        selectedDate,
        setSelectedDate,
        pages,
        goPrevPage,
        goNextPage,
        switchMode,
    } = useCalendarState();

    const { getMonthDays, getWeekDays } = useCalendarData();
    const [showWeekOverlay, setShowWeekOverlay] = useState(false);
    const modeProgress = useSharedValue(mode === 'month' ? 0 : 1);

    const switchToWeekWithTs = useCallback((ts: number) => {
        const anchor = new Date(ts);
        switchMode('week', { anchor });
    }, [switchMode]);

    const switchToMonthWithTs = useCallback((ts: number) => {
        const anchor = new Date(ts);
        switchMode('month', { anchor });
    }, [switchMode]);

    const collapseToWeek = useCallback(() => {
        const weekStartTs = startOfWeek(selectedDate).getTime();
        setShowWeekOverlay(true);
        modeProgress.value = withTiming(1, { duration: 500 }, (finished) => {
            if (!finished) return;
            runOnJS(switchToWeekWithTs)(weekStartTs);
            runOnJS(setShowWeekOverlay)(false);
        });
    }, [modeProgress, switchMode]);


    const expandToMonth = useCallback(() => {
        const monthStartTs = firstDayOfMonth(selectedDate).getTime();
        setShowWeekOverlay(false);
        modeProgress.value = withTiming(0, { duration: 500 }, (finished) => {
            if (!finished) return;
            runOnJS(switchToMonthWithTs)(monthStartTs);
        });
    }, [modeProgress, switchMode]);

    const gesture = useCalendarModeGesture({
        mode,
        onSwitch: (target) => {
            if (target === 'week') collapseToWeek();
            else expandToMonth();
        },
    });

    return (
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
            <View style={styles.container}>
                {/* 년/월 타이틀 */}
                <CalendarHeader
                    year={anchorDate.getFullYear()}
                    month={anchorDate.getMonth() + 1}
                    onLeftPress={goPrevPage}
                    onRightPress={goNextPage}
                />

                {/* 요일 라벨 */}
                <WeekLabels />

                {/* 캘린더 페이지 뷰 (월/주 접힘/펼침 애니) */}
                <GestureDetector gesture={gesture}>
                    <Animated.View >
                        <Animated.View >
                            <CalendarPager
                                pages={pages}
                                modeProgress={modeProgress}
                                selectedDate={selectedDate}
                                onSelectDate={setSelectedDate}
                                goPrevPage={goPrevPage}
                                goNextPage={goNextPage}
                                getMonthDays={getMonthDays}
                                getWeekDays={getWeekDays}
                                showWeekOverlay={showWeekOverlay}
                            />
                        </Animated.View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1 },
});