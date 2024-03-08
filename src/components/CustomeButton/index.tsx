import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { SubTitle } from "../../components/Typography";

interface IProps {
  value: any;
  onPressHandler: (() => void) | undefined;
  textcolor?: undefined;
  disabled?: boolean;
}
function CustomeButton(props: IProps) {
  const {
    value,
    onPressHandler,
    disabled,
  } = props;

  return (
    <TouchableOpacity disabled={disabled} style={styles.btnstyle} onPress={onPressHandler}>
      <SubTitle style={styles.btnText}>{value}</SubTitle>
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  btnstyle: {
    backgroundColor: theme.colors.skyblue[200],
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 4
  },
  btnText: {
    color: theme.colors.appWhite[100],
    fontSize: 16
  }
})
export default CustomeButton;