import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';

type Props = {
    page: { startDate: Date; spanWeeks: number };
    monthDays: Date[];
    weekDays: Date[];
    rows: number;
    selectedRow: number;
    modeProgress: SharedValue<number>;
    cellSize: number;
    selectedDate: Date;
    onSelectDate: (d: Date) => void;
};

export default function CalendarPageAnimatedView({
    page,
    monthDays,
    weekDays,
    rows,
    selectedRow,
    modeProgress,
    cellSize,
    selectedDate,
    onSelectDate,
}: Props) {
    const containerStyle = useAnimatedStyle(() => {
        const h = interpolate(
            modeProgress.value,
            [0, 1],
            [cellSize * rows, cellSize]
        );
        return {
            height: h,
            overflow: 'hidden' as const
        };
    }, [cellSize, rows]);

    const monthViewAnimatedStyle = useAnimatedStyle(() => {
        const shift = -(selectedRow * cellSize);
        const ty = interpolate(
            modeProgress.value,
            [0, 1],
            [0, shift]
        );
        const opacity = interpolate(
            modeProgress.value,
            [0, 0.99, 1],
            [1, 1, 0]
        );
        return {
            transform: [{ translateY: ty }],
            opacity,
            zIndex: 1
        };
    }, [cellSize, selectedRow]);

    const weekViewAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            modeProgress.value,
            [0.99, 1],
            [0, 1]
        );
        return { opacity, zIndex: 0 };
    }, [])

    return (
        <Animated.View style={containerStyle}>
            {/* 월 모드 */}
            <Animated.View
                style={monthViewAnimatedStyle}
            >
                <CalendarMonthView
                    monthStart={page.startDate}
                    days={monthDays}
                    selectedDate={selectedDate}
                    onSelect={onSelectDate}
                />
            </Animated.View>

            {/* 주 모드 */}
            <Animated.View
                style={[StyleSheet.absoluteFill, weekViewAnimatedStyle]}
            >
                <CalendarWeekView
                    weekStart={page.startDate}
                    days={weekDays}
                    selectedDate={selectedDate}
                    onSelect={onSelectDate}
                />
            </Animated.View>
        </Animated.View>
    );
}