import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../theme';

interface IProps {
    onPress?: (event: GestureResponderEvent) => void
}

const CustomAddBtn = (props: IProps) => {
    const { onPress } = props
    return (
        <TouchableOpacity style={styles.plusBtn} onPress={onPress}>
            <Feather name='plus' color={theme.colors.appWhite[100]} size={20} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    plusBtn: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 360,
        backgroundColor: theme.colors.skyblue[200]
    }
});

export default CustomAddBtn;
