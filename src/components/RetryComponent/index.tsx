import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';
import { SubTitle } from '../Typography';

interface IProps {
    onPress: () => void
}

function RetryComponent(props: IProps) {
    const { onPress } = props
    return (
        <View style={styles.container}>
            <Ionicons name='cloud-offline-outline' color={theme.colors.gray[500]} size={100} />
            <SubTitle style={styles.textRetry1}>Oops, looks like there's no</SubTitle>
            <SubTitle style={styles.textRetry2}>Internet Connection</SubTitle>
            <TouchableOpacity onPress={onPress} style={styles.retryBtn}>
                <SubTitle style={styles.retryText}>Retry</SubTitle>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40
    },
    textRetry1: { fontSize: 20, textAlign: 'center', marginVertical: 10, },
    textRetry2: { fontSize: 20, textAlign: 'center', marginBottom: 30 },
    retryBtn: { borderWidth: 0.6, borderRadius: 5, borderColor: theme.colors.gray[300], width: 80, height: 35, alignItems: 'center', justifyContent: 'center' },
    retryText: { color: theme.colors.green[800] },
});

export default RetryComponent;
