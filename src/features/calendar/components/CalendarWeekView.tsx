import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import CalendarDayView from './CalendarDayView';

export default function CalendarWeekView({
    days,
    selectedDate,
    onSelect,
}: {
    weekStart: Date;
    days: Date[];
    selectedDate: Date;
    onSelect: (d: Date) => void;
}) {
    const { width } = useWindowDimensions();
    const size = Math.floor(width / 7);

    return (
        <View style={styles.row}>
            {days.map(d => (
                <CalendarDayView
                    key={d.toDateString()}
                    date={d}
                    inMonth={true}
                    selected={isSameDay(d, selectedDate)}
                    isToday={isSameDay(d, new Date())}
                    size={size}
                    onPress={onSelect}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: 'yellow'
    }
});

function isSameDay(a: Date, b: Date) {
    return a.toDateString() === b.toDateString();
}