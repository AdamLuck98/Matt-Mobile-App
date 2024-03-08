import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, ScrollView, Button, Alert, Platform, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actionsheet, Box } from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";
import { theme } from '../../theme';
import { useTranslation } from "react-i18next";
import ScreensButton from '../ScreenButtom/index';
import { SubTitle } from '../Typography/index'
import {
    FONT_GOOGLE_BARLOW_REGULAR as FONT_GOOGLE_BARLOW,
    FONT_GOOGLE_BARLOW_SEMIBOLD,
} from "../../constants/fonts";
import CustomAddBtn from '../CustomAddBtn';
import useUserInfo from "../../hooks/useUserInfo";
import useSetSubCategory from './Queries/useSetSubCategory';
import useSetSubCategory2 from './Queries/useSetSubCategory2';
import useSetMasterCatategory from './Queries/useSetMasterCategory';
import useSetSize from './Queries/useSetSize';
import useSetColor from './Queries/useSetColor';
import useSetSupplier from './Queries/useSupplier';

import useSetLocations from '../../screens/SererchProduct/Queries/useSetLocation';
import useSetUnit from './Queries/useSetUnit';


interface IProps {
    label: string;
    color: string;
    sheetlabel: String;
    toAdd: string;
    list: string[] | undefined;
    subList?: string[];
    subList2?: string[];
    deleletitem(item: any, type: any, index: any): any
    value: string;
    onSelect: (text: string) => void;
    isSubSheet: boolean;
    isSubSheet2: boolean;
    onSubSelect: (text: string) => void;
    onSubSelect2: (text: string) => void;
    subValue?: string;
    subValue2?: string;
    err?: string;
    type: string;
    delType: string;
    delSubType?: string;
    delSubType2?: string;
    draftType: string;
    draftvalue: string;
    reload: () => void;
    subreload: () => void;
    subreload2: () => void;
    input: string;
    inputSub1?: string;
    inputSub2?: string;
    setInput: (text: string) => void;
    setInput1?: (text: string) => void;
    setInput2?: (text: string) => void;
    editTable?: boolean;
}
AddProductCategories.defaultProps = {
    editTable: false
}


function AddProductCategories(props: IProps) {
    const userdata = useUserInfo()
    const { t, i18n } = useTranslation();
    const { label,
        color,
        sheetlabel,
        toAdd,
        list,
        subList,
        subList2,
        deleletitem,
        value,
        subValue,
        subValue2,
        onSelect,
        onSubSelect,
        onSubSelect2,
        isSubSheet,
        isSubSheet2,
        err,
        type,
        delType,
        delSubType,
        delSubType2,
        draftvalue,
        draftType,
        reload,
        subreload,
        subreload2,
        input,
        setInput,
        setInput1,
        setInput2,
        editTable } = props
    const [showForm, setShowForm] = useState(false);
    const [showSheet, setShowSheet] = useState(false);
    const [setlected, setSelected] = useState('');
    const [showSubSheet, setShowSubSheet] = useState(false);
    const [subSetlected, setsubSetlected] = useState('');
    const [showSubSheet2, setShowSubSheet2] = useState(false);
    const [subSetlected2, setsubSetlected2] = useState('');

    const [masterCategory, setMasterCategory] = useState('');
    const [subCategory1, setSubCategory1] = useState('');
    const [subCategory2, setSubCategory2] = useState('');


    const { setMasterCat } = useSetMasterCatategory();
    const { setSize } = useSetSize();
    const { setColor } = useSetColor();
    const { setSupplier } = useSetSupplier();
    const { setUnit } = useSetUnit();
    const { setLocations } = useSetLocations();
    const { setSubCat } = useSetSubCategory();
    const { setSubCat2 } = useSetSubCategory2();


    function handleAdd() {
        setShowForm(!showForm);
    };

    function refetch() {
        setTimeout(() => {
            reload()
        }, 1500);
    }

    function subRefetch() {
        setTimeout(() => {
            subreload()

        }, 1500);
    }

    function subRefetch2() {
        setTimeout(() => {
            subreload2()

        }, 1500);
    }

    function HandleMasterSelect(item: string, index: any) {
        // setSelectValue(index)
        setSelected(item);
        onSelect(item);
        setShowSheet(false);
        if (isSubSheet == true) {
            setShowSubSheet(true);
        }
    }

    function HandleSubSelect(item: string, index: any) {
        // setSelectSubCatvalue(index)
        setsubSetlected(item);
        onSubSelect(item);
        setShowSubSheet(false);
        if (isSubSheet2 == true) {
            subreload2();
            setShowSubSheet2(true);
        }
    }

    const HandleSubSelect2 = (item: string, index: any) => {
        setsubSetlected2(item);
        onSubSelect2(item);
        setShowSubSheet2(false);
    }

    function HandleCategoryCancel() {
        setShowSheet(false);
    }

    function HandleSubCategoryCancel() {
        setShowSubSheet(false);
        setShowSheet(false);
    }

    function HandleSubCategory2Cancel() {
        setShowSubSheet2(false)
        setShowSubSheet(false);
        setShowSheet(false);
    }

    function AddMoreMasterCategory(type: string) {
        setSelected(masterCategory);
        onSelect(masterCategory)
        setShowForm(false);
        setShowSheet(false);
        setInput(masterCategory)
        if (type == 'mCat') {
            const data: any = {
                do: 'CreateCategory',
                userid: userdata?.userInfo?.UserId || '',
                osname: Platform.OS === "android" ? "and" : "ios",
                mastercat: masterCategory,
            }
            setMasterCat(data);
        } else if (type == 'size') {
            const data: any = {
                do: 'SetSize',
                userid: userdata?.userInfo?.UserId || '',
                osname: Platform.OS === "android" ? "and" : "ios",
                size: masterCategory
            }
            setSize(data);

        } else if (type == 'clr') {
            const data: any = {
                do: 'SetColor',
                userid: userdata?.userInfo?.UserId || '',
                osname: Platform.OS === "android" ? "and" : "ios",
                color: masterCategory
            }
            setColor(data);
        } else if (type == 'loc') {
            const data: any = {
                do: 'SetLocation',
                userid: userdata?.userInfo?.UserId || '',
                osname: Platform.OS === "android" ? "and" : "ios",
                location: masterCategory
            }
            setLocations(data);
        } else if (type == 'supp') {
            const data: any = {
                do: 'SetSupplier',
                userid: userdata?.userInfo?.UserId || '',
                osname: Platform.OS === "android" ? "and" : "ios",
                supplier: masterCategory
            }
            setSupplier(data);
        } else if (type == 'unittt') {
            const data: any = {
                do: 'SetUnit',
                userid: userdata?.userInfo?.UserId || '',
                osname: Platform.OS === "android" ? "and" : "ios",
                unit: masterCategory
            }
            setUnit(data);
        }

        if (isSubSheet == true) {
            setShowSubSheet(true);
        }
    }

    function AddMoreSubCategory1() {
        setsubSetlected(subCategory1);
        onSubSelect(subCategory1);
        setShowForm(false);
        setShowSubSheet(false);
        setInput1(subCategory1);
        const data: any = {
            do: 'SetSubCat',
            userid: userdata?.userInfo?.UserId || '',
            osname: Platform.OS === "android" ? "and" : "ios",
            mastercat: setlected,
            subcat_1: subCategory1
        }
        setSubCat(data);

        if (isSubSheet2 == true) {
            setShowSubSheet2(true);
        }
    }

    function AddMoreSubCategory2() {
        setsubSetlected2(subCategory2);
        onSubSelect2(subCategory2);
        setShowForm(false);
        setShowSubSheet2(false);
        setInput2(subCategory2);
        const data: any = {
            do: 'SetSubCat',
            userid: userdata?.userInfo?.UserId || '',
            osname: Platform.OS === "android" ? "and" : "ios",
            mastercat: setlected,
            subcat_1: subSetlected,
            subcat_2: subCategory2,
        }
        setSubCat2(data);
    }


    function handleDrafts(draft: string, item: string) {
        if (draft == 'masterdraft') {
            AsyncStorage.setItem('master-draft', item);
        } else if (draft == 'sizedraft') {
            AsyncStorage.setItem('size-draft', item);
        } else if (draft == 'colordraft') {
            AsyncStorage.setItem('color-draft', item)
        } else if (draft == 'locationdraft') {
            AsyncStorage.setItem('location-draft', item)
        } else if (draft == 'supplierdraft') {
            AsyncStorage.setItem('supplier-draft', item)
        } else if (draft == 'unitdraft') {
            AsyncStorage.setItem('unit-draft', item)
        }
    }

    const deletePopup = (item: any, type: any, index: any) =>
        Alert.alert(
            '',
            // "Are you sure you want to delete this Item?",
            t('common:DELETE_PRODUCT'),
            [
                {
                    text: "Yes",
                    onPress: () => deleletitem(item, type, index),
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ]
        );

    return (
        <View>
            <TouchableWithoutFeedback
                onPress={() => { setShowSheet(true); Keyboard.dismiss() }}
            >
                <View>
                    <SubTitle style={[styles.droptitle, { marginLeft: 10, color: color }]}>
                        {label}
                    </SubTitle>

                    {/* <View style={{ borderBottomWidth: 1, borderBottomColor: err ? err : theme.colors.gray[800], marginLeft: 5 }}>
                        <SubTitle style={[styles.drop]}>
                            {setlected || value ? <Text style={styles.selected}>{setlected ? setlected : value} {subValue && ","} {subSetlected ? subSetlected : subValue}</Text> : <Text style={styles.selected}>{draftvalue}</Text>}
                        </SubTitle>
                    </View> */}

                    <View style={{ borderBottomWidth: 1, borderBottomColor: err ? err : theme.colors.gray[800], marginLeft: 5 }}>
                        <SubTitle style={[styles.drop]}>
                            {value ? <Text style={styles.selected}>{value} {subValue && ","} {subValue} {subValue2 && ","} {subValue2}</Text> : <Text style={styles.selected}>{draftvalue}</Text>}
                        </SubTitle>
                    </View>
                </View>
            </TouchableWithoutFeedback >
            <Actionsheet isOpen={showSheet} onClose={() => { setShowSheet(false); setShowForm(false) }}>
                <Actionsheet.Content style={styles.sheetstyle}>
                    <Box w='100%' h='100%'>
                        {showForm == true ? (
                            <View style={styles.block}>
                                <SubTitle style={styles.label}>{sheetlabel}</SubTitle>
                                <View style={styles.list}>
                                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} keyboardShouldPersistTaps='always'>
                                        <SubTitle style={[styles.label, styles.sublabel]}>{toAdd}</SubTitle>
                                        <TextInput
                                            placeholderTextColor={theme.colors.gray[400]}
                                            onChangeText={text => setMasterCategory(text)}
                                            style={styles.addinput}
                                        />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', flexWrap: 'wrap' }}>
                                            <View style={{ width: '48%' }}>
                                                {/* <ScreensButton btnTitle={t('common:ADD')} onPress={() => { AddMoreMasterCategory(type); refetch(); handleDrafts(draftType, masterCategory) }} bgcolor={theme.colors.skyblue[200]} iconName={''} /> */}
                                            </View>
                                            <View style={{ width: '48%' }}>
                                                {/* <ScreensButton btnTitle={t('common:CANCEL')} onPress={handleAdd} bgcolor={theme.colors.red[500]} iconName={''} /> */}
                                            </View>
                                        </View>
                                    </ScrollView>

                                </View>

                            </View>
                        ) : (
                            <View style={styles.block}>
                                <SubTitle style={styles.label}>{props.sheetlabel}</SubTitle>

                                <View style={styles.list}>
                                    <ScrollView contentContainerStyle={{ width: 300, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                                        {list && list?.map((item: any, index: any) => {
                                            let type = delType
                                            return item !== '' ? (
                                                <View key={index} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5 }}>
                                                    <TouchableOpacity style={[styles.listBtn, { backgroundColor: value == item ? theme.colors.yellow[400] : 'transparent', flex: 11 }]}
                                                        onPress={() => { HandleMasterSelect(item, index); handleDrafts(draftType, item) }}
                                                    >
                                                        <View style={styles.listBlock}>
                                                            <SubTitle style={styles.listText}>{item}</SubTitle>
                                                        </View>
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity onPress={() => { deleletitem(item, type, index) }} style={{ display: setlected == item ? 'none' : 'flex', flex: 1 }}>
                                                        <Ionicons name='trash-outline' color={theme.colors.red[400]} size={20} />
                                                    </TouchableOpacity> */}
                                                    <TouchableOpacity onPress={() => { deletePopup(item, type, index) }} style={{ display: setlected == item ? 'none' : 'flex', flex: 1 }}>
                                                    {editTable ? null : <Ionicons name='trash-outline' color={theme.colors.red[400]} size={20} /> }
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null
                                        })}
                                    </ScrollView>

                                    <View style={styles.addBtnBox}>
                                        {editTable ? null :<CustomAddBtn onPress={handleAdd} />}
                                    </View>
                                </View>
                                <View style={styles.fullWidth}>
                                    <ScreensButton onPress={HandleCategoryCancel} btnTitle={t('common:CANCEL')} bgcolor={theme.colors.red[600]} iconName={''} />
                                </View>
                            </View>
                        )}
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>

            <Actionsheet isOpen={showSubSheet} onClose={() => setShowSubSheet(false)}>
                <Actionsheet.Content style={styles.sheetstyle}>
                    <Box w='100%' h='100%'>
                        {showForm == true ? (
                            <View style={styles.block}>
                                <SubTitle style={styles.label}>{t('common:SELECT_SUB_CATEGORY')} 1</SubTitle>
                                <View style={styles.list}>
                                    <SubTitle style={[styles.label, styles.sublabel]}>{toAdd}</SubTitle>
                                    <TextInput
                                        style={styles.addinput}
                                        placeholderTextColor={theme.colors.gray[400]}
                                        onChangeText={text => setSubCategory1(text)}
                                    />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', flexWrap: 'wrap' }}>
                                        <View style={{ width: '48%' }}>
                                            <ScreensButton btnTitle={t('common:ADD')} onPress={() => { AddMoreSubCategory1(); subRefetch() }} bgcolor={theme.colors.skyblue[200]} iconName={''} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <ScreensButton btnTitle={t('common:CANCEL')} onPress={handleAdd} bgcolor={theme.colors.red[500]} iconName={''} />
                                        </View>
                                    </View>
                                </View>

                            </View>
                        ) : (
                            <View style={styles.block}>
                                <SubTitle style={styles.label}>{t('common:SELECT_SUB_CATEGORY')} 1</SubTitle>

                                <View style={styles.list}>
                                    <ScrollView contentContainerStyle={{ width: 300, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                                        {subList && subList?.map((item: any, index: any) => {
                                            let type = delSubType
                                            return item !== '' ? (
                                                <View key={index}>
                                                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5 }}>
                                                        <TouchableOpacity style={[styles.listBtn, { backgroundColor: subValue == item ? theme.colors.yellow[400] : 'transparent', flex: 11 }]}
                                                            onPress={() => HandleSubSelect(item, index)}
                                                        >
                                                            <View style={styles.listBlock}>
                                                                <SubTitle style={styles.listText}>{item}</SubTitle>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { deletePopup(item, type, index) }} style={{ display: subSetlected == item ? 'none' : 'flex', flex: 1 }}>
                                                            <Ionicons name='trash-outline' color={theme.colors.red[400]} size={20} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ) : null
                                        })}
                                    </ScrollView>

                                    <View style={styles.addBtnBox}>
                                        <CustomAddBtn onPress={handleAdd} />
                                    </View>
                                </View>
                                <View style={styles.fullWidth}>
                                    <ScreensButton onPress={HandleSubCategoryCancel} btnTitle={t('common:CANCEL')} bgcolor={theme.colors.red[600]} iconName={''} />
                                </View>
                            </View>
                        )}
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>

            <Actionsheet isOpen={showSubSheet2} onClose={() => setShowSubSheet2(false)}>
                <Actionsheet.Content style={styles.sheetstyle}>
                    <Box w='100%' h='100%'>
                        {showForm == true ? (
                            <View style={styles.block}>
                                <SubTitle style={styles.label}>{t('common:SELECT_SUB_CATEGORY')} 2</SubTitle>
                                <View style={styles.list}>
                                    <SubTitle style={[styles.label, styles.sublabel]}>{toAdd}</SubTitle>
                                    <TextInput
                                        style={styles.addinput}
                                        placeholderTextColor={theme.colors.gray[400]}
                                        onChangeText={text => setSubCategory2(text)}
                                    />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', flexWrap: 'wrap' }}>
                                        <View style={{ width: '48%' }}>
                                            <ScreensButton btnTitle={t('common:ADD')} onPress={() => { AddMoreSubCategory2(); subRefetch2() }} bgcolor={theme.colors.skyblue[200]} iconName={''} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <ScreensButton btnTitle={t('common:CANCEL')} onPress={handleAdd} bgcolor={theme.colors.red[500]} iconName={''} />
                                        </View>
                                    </View>
                                </View>

                            </View>
                        ) : (
                            <View style={styles.block}>
                                <SubTitle style={styles.label}>{t('common:SELECT_SUB_CATEGORY')} 2</SubTitle>

                                <View style={styles.list}>
                                    <ScrollView contentContainerStyle={{ width: 300, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                                        {subList2 && subList2?.map((item: any, index: any) => {
                                            let type = delSubType2
                                            return item !== '' ? (
                                                <View key={index}>
                                                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5 }}>
                                                        <TouchableOpacity style={[styles.listBtn, { backgroundColor: subValue2 == item ? theme.colors.yellow[400] : 'transparent', flex: 11 }]}
                                                            onPress={() => HandleSubSelect2(item, index)}
                                                        >
                                                            <View style={styles.listBlock}>
                                                                <SubTitle style={styles.listText}>{item}</SubTitle>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { deletePopup(item, type, index) }} style={{ display: subSetlected2 == item ? 'none' : 'flex', flex: 1 }}>
                                                            <Ionicons name='trash-outline' color={theme.colors.red[400]} size={20} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ) : null
                                        })}
                                    </ScrollView>

                                    <View style={styles.addBtnBox}>
                                        <CustomAddBtn onPress={handleAdd} />
                                    </View>
                                </View>
                                <View style={styles.fullWidth}>
                                    <ScreensButton onPress={HandleSubCategory2Cancel} btnTitle={t('common:CANCEL')} bgcolor={theme.colors.red[600]} iconName={''} />
                                </View>
                            </View>
                        )}
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>


        </View >
    );
};

AddProductCategories.defultProps = {
    type: null,
    delType: null,
    draftType: null,
    draftvalue: null,
}
export default AddProductCategories;

const styles = StyleSheet.create({
    sheetstyle: {
        backgroundColor: theme.colors.appWhite[800],
    },
    droptitle: {
        fontSize: 16,
        marginTop: 5
    },
    drop: {
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "flex-end",
    },
    selected: {
        fontSize: 16,
        padding: 20,
        textTransform: 'capitalize',
        fontWeight: "700"
    },
    block: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: theme.colors.black[0],
    },
    sublabel: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10
    },
    search: {
        width: '90%'
    },
    list: {
        width: '90%',
        height: '70%',
        backgroundColor: theme.colors.appWhite[100],
        paddingVertical: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    listBtn: {
        paddingHorizontal: 5,
    },
    listBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical: 7,
    },
    listText: {
        fontSize: 16,
        color: theme.colors.darkBlue[700],
        paddingVertical: 7,
        textTransform: 'capitalize',
    },
    addBtnBox: {
        width: '80%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fullWidth: {
        width: '90%'
    },
    addinput: {
        borderWidth: 1,
        width: '80%',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
        color: theme.colors.darkBlue[700],
        fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
    },
    plusBtn: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 360,
        backgroundColor: theme.colors.skyblue[200]
    }
});

