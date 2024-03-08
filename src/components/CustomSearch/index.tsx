import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { theme } from '../../theme';

function CustomSearch() {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
            />
            <View style={styles.searchIconBox}>
                <AntDesign
                    name='search1'
                    color={theme.colors.black[1000]}
                    size={25}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.appWhite[100],
    },
    input: {
        fontSize: 16,
        color: theme.colors.black[0],
        height: 40,
        flex: 11,
    },
    searchIconBox: {
        flex: 1,
        alignItems: 'center',
    },
});

export default CustomSearch;
