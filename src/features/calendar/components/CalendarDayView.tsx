import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

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

    const boxStyle: ViewStyle = {
        width: size,
        height: size,
        borderRadius: Math.floor(size / 2) - 6, 
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(date)}
            style={[styles.cell, { width: size, height: size }]}
        >
            <Text
                style={[
                    styles.text,
                    !inMonth && styles.dimmed,
                    isToday && styles.today,
                    selected && styles.selectedText,
                ]}
            >
                {day}
            </Text>

            {/* 선택 배경 */}
            {selected && <TouchableOpacity style={[styles.selectedBg, boxStyle]} disabled />}
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
    today: {
        textDecorationLine: 'underline',
    },
    selectedText: {
        color: '#fff',
        fontWeight: '700',
    },
    selectedBg: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#007AFF',
    },
});