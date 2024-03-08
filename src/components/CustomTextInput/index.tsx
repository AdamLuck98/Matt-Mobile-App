import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from "react-native";
import { theme } from "../../theme";
import {
  FONT_GOOGLE_BARLOW_SEMIBOLD,
} from "../../constants/fonts";
import { SubTitle } from "../Typography";

interface IProps {
  propStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  isSecure?: boolean;
  isMultiLine?: boolean;
  onPressHandler: ((text: string) => void);
  onBlurHandler?:
  | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
  | undefined;
  value: string;
  isNumberPad?: boolean;
  editable?: boolean;
  heading?: string;
  lines?: any;
  headingStyle: any;
  passwordtype: boolean;
  keyboard?: KeyboardTypeOptions | undefined;
  err?: string
  isTextArea?: boolean;
}

function CustomTextInput(props: IProps) {
  const {
    propStyle,
    placeholder,
    isSecure,
    isMultiLine,
    onPressHandler,
    value,
    isNumberPad,
    onBlurHandler,
    editable,
    heading,
    lines,
    headingStyle,
    keyboard,
    err,
    isTextArea,
  } = props;


  const handleChange = (text: string) => {
    onPressHandler(text);
  }
  return (
    <>
      <View style={[styles.inputWrapper, propStyle]}>
        <SubTitle style={[headingStyle]}> {heading}</SubTitle>
        <View style={styles.subcontainer}>

          <View style={[styles.textinput, { borderBottomColor: err ? err : theme.colors.gray[800] }]}>

            <View style={styles.flex10}>
              <TextInput
                style={[styles.input, { height: isTextArea ? 70 : 40 }]}
                editable={editable}
                keyboardType={keyboard}
                maxLength={isNumberPad ? 10 : undefined}
                multiline={isMultiLine}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.gray[200]}
                secureTextEntry={isSecure}
                value={value}
                onBlur={onBlurHandler}
                onChangeText={handleChange}
                numberOfLines={lines}
              />
            </View>

          </View>
        </View>

      </View>
    </>

  );
}

CustomTextInput.defaultProps = {
  isMultiLine: false,
  propStyle: null,
  isSecure: false,
  isNumberPad: false,
  error: null,
  editable: true,
  onBlurHandler: null,
};
export default CustomTextInput;

const styles = StyleSheet.create({
  subcontainer: {
    flexDirection: "row",
  },
  inputWrapper: {
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  input: {
    textAlignVertical: 'top',
    color: theme.colors.black[0],
    fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
    fontSize: 16,
    padding: 5,
  },
  err_title: {
    color: theme.colors.red[900],
    opacity: 0.6,
    letterSpacing: 1,
    fontSize: 12,
  },
  textinput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  flex10: { flex: 10 },
  flex2: { flex: 2, justifyContent: "center", alignItems: "center" },
});
