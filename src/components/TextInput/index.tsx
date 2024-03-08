import React, { useState, useRef } from "react";
import { Divider } from "native-base";
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
  KeyboardTypeOptions,
  Platform,
  Button,
  Alert,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { theme } from "../../theme";
import Icons from "../../components/iconss/index";
import { voiceStart } from "../../redux/reducers/VoiceToText/action";
import { VoiceKey } from "../../redux/reducers/VoiceKey/Action";
import {
  FONT_GOOGLE_BARLOW_REGULAR,
  FONT_GOOGLE_BARLOW_SEMIBOLD,
} from "../../constants/fonts";
import { SubTitle, Title } from "../Typography";
import AsyncStorage from "@react-native-community/async-storage";

interface IProps {
  propStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  isSecure?: boolean;
  isMultiLine?: boolean;
  onPressHandler: (text: string) => void;
  onBlurHandler?:
  | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
  | undefined;
  value: string;
  isNumberPad?: boolean;
  editable?: boolean;
  error?: string | undefined | boolean;
  icons?: string;
  Voicekey: string;
  heading?: string;
  lines?: any;
  headingStyle: any;
  passwordtype: boolean;
  keyboard?: KeyboardTypeOptions | undefined;
  err?: string;
  draftType: string;
  draftvalue: string;
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
    error,
    onBlurHandler,
    editable,
    icons,
    Voicekey,
    heading,
    lines,
    passwordtype,
    headingStyle,
    keyboard,
    err,
    draftType,
    draftvalue,
    isTextArea,
  } = props;

  function handleDrafts(draft: string, item: string) {
    if (draft == "titledraft") {
      AsyncStorage.setItem("titl-edraft", item);
    } else if (draft == "descriptiondraft") {
      AsyncStorage.setItem("description-draft", item);
    } else if (draft == "quantitydraft") {
      AsyncStorage.setItem("quantity-draft", item);
    } else if (draft == "pricedraft") {
      AsyncStorage.setItem("price-draft", item);
    } else if (draft == "costdraft") {
      AsyncStorage.setItem("cost-draft", item);
    } else if (draft == "wholesaledraft") {
      AsyncStorage.setItem("wholesale-draft", item);
    } else if (draft == "notesdraft") {
      AsyncStorage.setItem("notes-draft", item);
    } else if (draft == "unitdraft") {
      AsyncStorage.setItem("unit-draft", item);
    }
  }

  const discloser = useDispatch();
  const [pasword, setpasword] = useState(true);

  const handleChange = (text: string) => {

    console.log("text changed --> ", JSON.stringify(text))
    onPressHandler(text);
    handleDrafts(draftType, text);
  };

  const textInput = useRef(null);

  return (
    <>
      <View style={[styles.inputWrapper, propStyle]}>
        <TouchableOpacity
          onPress={() => textInput.current.focus()}
          activeOpacity={0.9}
        >
          <SubTitle style={[headingStyle]}> {heading}</SubTitle>
        </TouchableOpacity>
        <View style={styles.subcontainer}>
          <View
            style={[
              styles.textinput,
              { borderBottomColor: err ? err : theme.colors.gray[800] },
            ]}
          >
            <View style={styles.flex10}>
              <TextInput
                style={[styles.input, { height: isTextArea ? 85 : 40 }]}
                editable={editable}
                ref={textInput}
                autoCapitalize={
                  Voicekey == "ProductTitile" ? "words" : "sentences"
                }
                keyboardType={keyboard}
                maxLength={isNumberPad ? 10 : undefined}
                multiline={isMultiLine}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.gray[200]}
                secureTextEntry={isSecure}
                value={value ? value : draftvalue}
                onBlur={onBlurHandler}
                onChangeText={handleChange}
                numberOfLines={lines}
              />
            </View>

            <View style={styles.flex2}>
              <TouchableOpacity
                onPress={() => {
                  pasword ? setpasword(false) : setpasword(true);
                  if (!passwordtype) {
                    discloser(voiceStart(true));
                    discloser(VoiceKey(Voicekey));
                  }
                  Keyboard.dismiss();
                }}
              >
                <Icons name={icons} value={pasword} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <Divider
        bg={theme.colors.black[600]}
        orientation="horizontal"
        width="100%"
      /> */}

        {error && (
          <Text numberOfLines={1} style={styles.err_title}>
            {error}
          </Text>
        )}
      </View>
      {/* <Button title="click" onPress={() => Alert.alert(value)} /> */}
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
  draftType: null,
  draftvalue: null,
  placeholder: null,
  passwordtype: false,
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
    textAlignVertical: "top",
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
  flex2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    right: 5,
  },
});
