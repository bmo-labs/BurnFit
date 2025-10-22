import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import CalendarHeader from '../components/CalendarHeader';
import WeekLabels from '../components/WeekLabels';
import CalendarPager from '../components/CalendarPagerView';
import { useCalendarState } from '../hooks/useCalendarState';
import { useCalendarModeGesture } from '../hooks/useCalendarModeGesture';
import { startOfWeek, firstDayOfMonth } from '../utils/dateUtils';
import { scheduleOnRN } from 'react-native-worklets';

export default function CalendarScreen() {
    const {
        mode,
        anchorDate,
        selectedDate,
        setSelectedDate,
        renderPages,
        goPrevPage,
        goNextPage,
        switchMode,
    } = useCalendarState();

    const modeProgress = useSharedValue(mode === 'month' ? 0 : 1);

    // Week Animation
    const switchToWeekWithTs = useCallback((ts: number) => {
        const anchor = new Date(ts);
        switchMode('week', { anchor });
    }, [switchMode]);

    const collapseToWeek = useCallback(() => {
        const weekStartTs = startOfWeek(selectedDate).getTime();
        modeProgress.value = withTiming(1, { duration: 500 }, (finished) => {
            if (!finished) return;
            scheduleOnRN(switchToWeekWithTs, weekStartTs);
        });
    }, [selectedDate, modeProgress, switchMode]);

    // Month Animation
    const switchToMonthWithTs = useCallback((ts: number) => {
        const anchor = new Date(ts);
        switchMode('month', { anchor });
    }, [switchMode]);

    const expandToMonth = useCallback(() => {
        const monthStartTs = firstDayOfMonth(selectedDate).getTime();
        scheduleOnRN(switchToMonthWithTs, monthStartTs);

        requestAnimationFrame(() => {
            modeProgress.value = withTiming(0, { duration: 500 });
        });

    }, [selectedDate, modeProgress, switchMode]);

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
                    <CalendarPager
                        pages={renderPages}
                        modeProgress={modeProgress}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                        goPrevPage={goPrevPage}
                        goNextPage={goNextPage}
                    />
                </GestureDetector>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1
    },
});