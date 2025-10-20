import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import CalendarDayView from './CalendarDayView';

export default function CalendarMonthView({
  monthStart, days, selectedDate, onSelect,
}: { monthStart: Date; days: Date[]; selectedDate: Date; onSelect: (d: Date)=>void; }) {
  const { width } = useWindowDimensions();
  const size = Math.floor(width / 7);
  const month = monthStart.getMonth();

  return (
    <View style={styles.grid}>
      {days.map(d => (
        <CalendarDayView
          key={d.toDateString()}
          date={d}
          inMonth={d.getMonth() === month}
          selected={isSameDay(d, selectedDate)}
          isToday={isSameDay(d, new Date())}
          size={size}
          onPress={onSelect}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create(
    { 
        grid: { 
            flexDirection:'row', 
            flexWrap:'wrap' 
        }
    }
);

function isSameDay(a: Date, b: Date){ return a.toDateString() === b.toDateString(); }