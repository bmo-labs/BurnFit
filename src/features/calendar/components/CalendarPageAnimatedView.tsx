import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import { startOfWeek, isSameMonth } from '../utils/dateUtils';

type Props = {
    page: { startDate: Date; spanWeeks: number };
    selectedDate: Date;
    onSelectDate: (d: Date) => void;
    getMonthDays: (startDate: Date) => Date[];
    getWeekDays: (startDate: Date) => Date[];
    modeProgress: SharedValue<number>;
    cellSize: number;
    rows: number;
    selectedRow: number;
    showWeekOverlay: boolean;
};

export default function CalendarPageAnimatedView({
    page,
    selectedDate,
    onSelectDate,
    getMonthDays,
    getWeekDays,
    modeProgress,
    cellSize,
    rows,
    selectedRow,
    showWeekOverlay
}: Props) {
    const monthDays = useMemo(() => getMonthDays(page.startDate), [page.startDate, getMonthDays]);

    const weekStart = useMemo(
        () => startOfWeek(selectedDate),
        [selectedDate]
    );

    const weekDays = useMemo(
        () => getWeekDays(weekStart),
        [weekStart, getWeekDays]
    );

    const canShowOverlayHere = showWeekOverlay && isSameMonth(page.startDate, selectedDate);

    const isWeekVisible = modeProgress.value > 0.99;

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

    const monthShiftStyle = useAnimatedStyle(() => {
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
            opacity
        };
    }, [cellSize, selectedRow]);

    const weekHiddenStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            modeProgress.value,
            [0.99, 1],
            [0, 1]
        );
        return { opacity };
    }, [canShowOverlayHere])

    return (
        <Animated.View style={containerStyle}>
            <Animated.View
                style={monthShiftStyle}
                pointerEvents={isWeekVisible ? 'none' : 'auto'}
            >
                <CalendarMonthView
                    monthStart={page.startDate}
                    days={monthDays}
                    selectedDate={selectedDate}
                    onSelect={onSelectDate}
                />
            </Animated.View>

            <Animated.View
                style={[StyleSheet.absoluteFill, weekHiddenStyle]}
                pointerEvents={isWeekVisible ? 'auto' : 'none'}
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