import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
    date: Date;
    inMonth: boolean;
    selected: boolean;
    isToday: boolean;
    size: number;
    onPress: (d: Date) => void;
};

export default function CalendarDayView({
    date,
    inMonth,
    selected,
    isToday,
    size,
    onPress,
}: Props) {
    const day = date.getDate();
    const circleSize = size * 0.68;
    const circleStyle: ViewStyle = {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(date)}
            disabled={!inMonth}
            style={[styles.cell, { width: size, height: size }]}
        >
            {/* 선택 배경 */}
            {selected && <View style={[circleStyle, styles.selectedCircle]} />}

            {/* 오늘 표시 */}
            {isToday && !selected && <View style={[circleStyle, styles.todayBg]} />}

            {/* 날짜 텍스트 */}
            <Text style={[
                styles.text,
                !inMonth && styles.dimmed,
                selected && styles.selectedText,
                isToday && !selected && styles.todayText,
            ]}>
                {day}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    text: {
        zIndex: 2,
        fontSize: 16,
        fontWeight: '500',
    },
    dimmed: {
        opacity: 0.35,
    },
    selectedText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    selectedCircle: {
        borderWidth: 2,
        borderColor: '#007AFF',
        zIndex: 1,
    },
    todayText: {
        color: '#fff',
        fontWeight: '700',
    },
    todayBg: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#007AFF',
    },
});