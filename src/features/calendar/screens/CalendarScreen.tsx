import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarPager from '../components/CalendarPager';
import { useCalendarState } from '../hooks/useCalendarState';
import { useCalendarData } from '../hooks/useCalendarData';
import { useCalendarModeGesture } from '../hooks/useCalendarModeGesture';
import { GestureDetector } from 'react-native-gesture-handler';

export default function CalendarScreen() {
    const {
        mode,
        anchorDate,
        selectedDate,
        setSelectedDate,
        pages,
        goPrevPage,
        goNextPage,
        switchMode
    } = useCalendarState();

    const { getMonthDays, getWeekDays } = useCalendarData();

    const gesture = useCalendarModeGesture({ mode, onSwitch: switchMode });

    const weekLabels = ['일', '월', '화', '수', '목', '금', '토'];

    const onToggleMode = () => {
        switchMode(mode === 'month' ? 'week' : 'month');
    };

    return (
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']} >
            <View style={styles.container}>
                {/* 년 월 타이틀 */}
                <TouchableOpacity
                    onPress={onToggleMode}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                    style={styles.header}
                >
                    <Text style={styles.title}>
                        {`${anchorDate.getFullYear()}년 ${anchorDate.getMonth() + 1}월`}
                    </Text>
                </TouchableOpacity>

                {/* 요일 라벨 */}
                <View style={styles.weekRow}>
                    {weekLabels.map((w) => <Text key={w} style={styles.weekLabel}>{w}</Text>)}
                </View>

                {/* 캘린더 페이지 뷰 */}
                <GestureDetector gesture={gesture}>
                    <CalendarPager
                        pages={pages}
                        mode={mode}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                        goPrevPage={goPrevPage}
                        goNextPage={goNextPage}
                        getMonthDays={getMonthDays}
                        getWeekDays={getWeekDays}
                    />
                </GestureDetector>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
    },
    modeBadge: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    weekLabel: {
        fontWeight: '600',
        color: '#555',
    },
});