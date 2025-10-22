import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type Props = {
    year: number;
    month: number;
    onLeftPress: () => void;
    onRightPress: () => void;
};

export default function CalendarHeader({
    year,
    month,
    onLeftPress,
    onRightPress
}: Props) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onLeftPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.arrow}>{'〈'}</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{`${year}년 ${month}월`}</Text>

            <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.arrow}>{'〉'}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
    },
    arrow: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: '800'
    },
});