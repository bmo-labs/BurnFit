import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeekLabels() {
    return (
        <View style={styles.row}>
            {LABELS.map(l => <Text key={l} style={styles.label}>{l}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        paddingHorizontal: 4
    },
    label: {
        fontWeight: '600',
        color: '#555'
    },
});