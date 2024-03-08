import { t } from 'i18next';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SubTitle } from '../../../components/Typography';
import { theme } from '../../../theme';

function NoData() {
    return (
        <View style={styles.container}>
            <SubTitle style={styles.text}> {t("common:NO_ORDER")}</SubTitle>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 10,
        backgroundColor: theme.colors.appWhite[100],
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
        color: theme.colors.black[0]
    }
});

export default NoData;
