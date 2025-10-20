import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyPageScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>마이페이지</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#222',
    },
});