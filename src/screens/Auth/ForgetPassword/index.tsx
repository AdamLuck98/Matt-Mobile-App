import React from "react";
import {
    StyleSheet,
    ImageBackground,
    TextInput,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import { Actionsheet, useDisclose, Box, NativeBaseProvider, Spinner } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import images from "../../../assets/images";
import { theme } from "../../../theme";
import { SubTitle, Caption } from "../../../components/Typography/index";
import CustomeButton from "../../../components/CustomeButton";
import { useTranslation } from 'react-i18next';
import { useCodeData } from "./Queries/GetCountryCode";
import useSetForgetPassword from './Queries/useSetForgetPassword';
import RetryComponent from "../../../components/RetryComponent";

function ForgetPassword({ navigation }: { navigation: any }) {
    const { isLoading, data: dashData, isError, refetch } = useCodeData({
    });
    const { setNewPassword } = useSetForgetPassword()
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const { t, i18n } = useTranslation();

    const [firstname, setfirstname] = React.useState("");
    const [countryCode, setCountryCode] = React.useState("");
    const [countryCodeId, setCountryCodeId] = React.useState("");
    const [cellNumber, setCellNumber] = React.useState("");
    const [error, setError] = React.useState(false);
    const lang = t("common:lang")
    const massage = "An Text Massage Has Been Sent To Your Number " + cellNumber;

    const onSubmit = async () => {
        if (firstname == '' || countryCode == "" || cellNumber == '') {
            setError(true);
        } else {
            setError(false)
            const detaReset: any = {
                do: "forgotpassword",
                firstname: firstname,
                prephone: countryCodeId,
                cellphone: cellNumber,
                osname: Platform.OS === "android" ? "and" : "ios",
                lang: lang === "English" ? "en" : "es"
            }
            const response: any = await setNewPassword(detaReset)

            if (response?.ResponseMsg === "Password recovery") {
                Alert.alert(
                    "Kizbin.com",
                    massage,
                    [

                        { text: "OK", onPress: () => navigation.goBack() }
                    ]
                );

            }
            else {
                Alert.alert(
                    "Kizbin.com",
                    "Your search did not return any results. Please try again with other information.",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                    ]
                );
            }
        }
    }
    if (isLoading) {
        return (
            <View style={styles.loadingcontainer}>
                <Spinner size={30} />
            </View>
        )
    }

    if (isError) {
        return (
            <RetryComponent onPress={() => refetch()} />
        )
    }
    return (
        <ImageBackground source={images.LOGIN_BACKGROUND} style={styles.bgImg}>
            <NativeBaseProvider>
                <SafeAreaView style={styles.safeAreaView}>
                    <View style={styles.mainContainer}>

                        <KeyboardAwareScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <View style={styles.hight20} />

                                <Image source={images.ICONS} style={styles.headlogo} />
                                <>

                                    <View style={[styles.inputBox, { borderBottomColor: error ? theme.colors.red[400] : theme.colors.gray[800] }]}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={t('common:FIRST_NAME1')}
                                            placeholderTextColor={theme.colors.black[0]}
                                            keyboardType="email-address"
                                            defaultValue={firstname}
                                            onChangeText={text => setfirstname(text)}
                                        />
                                        <View style={styles.icon}>
                                            <Feather name="user" color={theme.colors.blue[50]} size={20} />
                                        </View>
                                    </View>
                                    <View style={styles.hight20} />
                                    <TouchableOpacity onPress={onOpen}>
                                        <View style={[styles.inputBox, { borderBottomColor: error ? theme.colors.red[400] : theme.colors.gray[800] }]}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={t('common:COUNTRY_CODE')}
                                                placeholderTextColor={theme.colors.black[0]}
                                                defaultValue={countryCode}
                                                editable={false}
                                            />
                                            <View style={styles.icon}>
                                                <Feather name="arrow-down" color={theme.colors.blue[50]} size={20} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                                        <Actionsheet.Content>
                                            <Box w="100%" h={500} px={4} justifyContent="center">
                                                <ScrollView>
                                                    {dashData?.data.map((item: any) => {
                                                        return (
                                                            <View key={item.id}>
                                                                <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => { setCountryCode(item.country); setCountryCodeId(item.dial_code); onClose() }}>
                                                                    <SubTitle style={{ color: theme.colors.black[0] }}>{item.country} ({item.dial_code})</SubTitle>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    })}
                                                </ScrollView>
                                            </Box>
                                        </Actionsheet.Content>
                                    </Actionsheet>

                                    <View style={styles.hight20} />
                                    <View style={[styles.inputBox, { borderBottomColor: error ? theme.colors.red[400] : theme.colors.gray[800] }]}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={t('common:CELL_NUM')}
                                            placeholderTextColor={theme.colors.black[0]}
                                            keyboardType='numeric'
                                            defaultValue={cellNumber}
                                            onChangeText={text => setCellNumber(text)}
                                        />
                                        <View style={styles.icon}>
                                            <Ionicons name="call-outline" color={theme.colors.blue[50]} size={20} />
                                        </View>
                                    </View>
                                    <View style={styles.hight20} />
                                    <CustomeButton value={t("common:SUBMIT")} onPressHandler={() => onSubmit()} />
                                    <View style={styles.hight10} />
                                    <CustomeButton value={t("common:CANCEL")} onPressHandler={() => navigation.goBack()} />
                                </>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </SafeAreaView>
            </NativeBaseProvider >

        </ImageBackground >
    );
}

export default ForgetPassword;

const styles = StyleSheet.create({
    safeAreaView: {
        flexGrow: 1,
        flex: 1,
    },
    mainContainer: {
        flex: 1
    },
    scroll: {
        justifyContent: 'center',
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    bgImg: {
        flex: 1,
    },
    headlogo: {
        width: "40%",
        height: 135,
        alignSelf: "center",
        resizeMode: "contain",
        marginVertical: "17%",
    },
    inputBox: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 5,
        width: '100%',
    },
    input: {
        flex: 11,
        fontSize: 16,
        color: theme.colors.black[0]
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hight20: {
        height: 20
    },
    hight10: {
        height: 10
    },
    buttomlogo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: 30,
        marginVertical: 40,
    },
    emtydive: {
        height: 200,
        borderWidth: 1
    },
    contain: {
        padding: 40,
    },
    emtysecond: {
        height: 30
    },
    createText: {
        fontSize: 16,
        color: theme.colors.gray[600]
    },
    loadingcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
