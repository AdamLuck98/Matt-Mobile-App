import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native';
import { useNavigation }  from '@react-navigation/native';
import { RootNavigationType } from '../../screens/Home';
import { theme } from '../../theme';
interface IProps {
    color: string;
    label: string;
    placeholder: string;
    textarea: boolean;
    lines: number;
    keyboard: KeyboardTypeOptions | undefined;
}

function AddProductInputs(props: IProps) {
    // const {keyboard} = props
    const navigation = useNavigation<RootNavigationType>();
    const [text, setText] = useState("");
    return (
        <>
            <Text style={[styles.label, { color: props.color }]}>{props.label}</Text>
            <TextInput
                style={styles.input}
                multiline={props.textarea}
                numberOfLines={props.lines}
                placeholder={props.placeholder}
                keyboardType={props.keyboard}
                // keyboardType='default'
                onChangeText={newText => setText(newText)}
                defaultValue={text}
            />
        </>
    )
}

export default AddProductInputs;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        textTransform: 'capitalize',
        marginLeft: 10,
        // fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
    },
    input: {
        height: 50,
        borderBottomWidth: 1.5,
        borderBottomColor: "#b4b4b4",
        marginBottom: 25,
        marginHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "flex-end",
    },
    selected: {
        fontSize: 16,
    }
});
