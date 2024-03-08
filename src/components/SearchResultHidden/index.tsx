import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';
import { Modal, NativeBaseProvider } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { SubTitle, Caption } from '../Typography';
import { FONT_GOOGLE_BARLOW_SEMIBOLD } from '../../constants/fonts';
import CustomAddBtn from '../CustomAddBtn';
import useSetPriceQtyLoc from "./Queries/useSetPriceQualityLocation";
import useSetLocations from '../../screens/SererchProduct/Queries/useSetLocation';
import { useGetLocations } from '../../screens/SererchProduct/Queries/useGetLocation';
import useDeleteLocations from '../../screens/SererchProduct/Queries/useDeleteLocation';


function SearchResultHiddin(prop: any) {
    const { t, i18n } = useTranslation();
    const { p, q, l, cost, userid, listingid } = prop
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationModalContent, setLocationModalContent] = useState(true);
    const { editPriceQtyLoc } = useSetPriceQtyLoc();
    const { setLocations } = useSetLocations();
    const { deleteLocations } = useDeleteLocations();

    const { data: locationData, refetch: locrefetch } = useGetLocations({
        userid: userid,
        suball: 1
    });

    const arrLocations = locationData?.LocData;
    const arrtemp = arrLocations?.split(',')


    const [arrlabel, setArrLabel] = useState([
        {
            id: 1,
            name: t('common:Price'),
            value: p,
        },
        {
            id: 2,
            name: t('common:Quantity_Available'),
            value: parseInt(q),

        },
        {
            id: 3,
            name: t('common:LOCATION'),
            value: l,

        }
    ]);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stateLocation, setStateLocation] = useState('');

    useEffect(() => {
        setPrice(p);
    }, [p]);
    useEffect(() => {
        setQuantity(q);
    }, [q]);
    useEffect(() => {
        setStateLocation(l);
    }, [l]);

    function check(id: number) {
        if (id == 1) {
            setShowPriceModal(true);
        } else if (id == 2) {
            CheckQuantity();
        } else {
            setShowLocationModal(true);
        }
    }

    function CheckQuantity() {
        setShowQuantityModal(true);
        setQuantity(arrlabel[1].value);

    }

    function handleMinus() {

        if (parseInt(quantity) > 0) {
            var qty = parseInt(quantity);
            qty = qty - 1;
            // arrlabel[1].value = quantity - 1;
            setQuantity(qty.toString())
        }
    }

    function handlePlus() {
        if (parseInt(quantity) < 100) {
            var qty = parseInt(quantity);
            qty = qty + 1;
            // arrlabel[1].value = quantity + 1;
            setQuantity(qty.toString())
        }
    }

    function handleAdd() {
        setLocationModalContent(false)
    }

    function handleCancleLocation() {
        setLocationModalContent(true);
        setShowLocationModal(false);
    }

    function ChangePrice() {
        arrlabel[0].value = price;
        updatePQL(1);
        setShowPriceModal(false)
    }

    function ChangeQuantity() {
        arrlabel[1].value = quantity;
        updatePQL(2);
        setShowQuantityModal(false);
    }

    function ChangeLocation(item: string) {
        arrlabel[2].value = item;
        setStateLocation(item);
        updatePQL(3, item);
        setShowPriceModal(false)
    }

    function updateloc() {
        const data: any = {
            do: 'SetLocation',
            userid: userid,
            location: stateLocation,
        }
        setLocations(data)
        arrlabel[2].value = stateLocation;
        setLocationModalContent(true);
        setShowLocationModal(false);
        reload();
    }

    function deleteLoc(item: string) {
        const data: any = {
            do: 'DelLocation',
            userid: userid,
            location: item,
        }
        deleteLocations(data);
        reload();
    }

    function reload() {
        setTimeout(() => {
            locrefetch()
        }, 1200)
    }

    const updatePQL = async (type: number, loc?: string) => {
        if (type == 1) {
            if (price != '') {
                var data: any = {
                    do: "SetPCQL",
                    userid: userid,
                    listingid: listingid.toLowerCase(),
                    qty: q,
                    price: price,
                    cost: cost,
                    location: l,
                }
                const response = await editPriceQtyLoc(data)

            } else if (price == '') {
                var data: any = {
                    do: "SetPCQL",
                    userid: userid,
                    listingid: listingid,
                    qty: q,
                    price: p,
                    cost: cost,
                    location: l,
                }
                const response = await editPriceQtyLoc(data)
            }
        } else if (type == 2) {
            if (quantity != '') {
                var data: any = {
                    do: "SetPCQL",
                    userid: userid,
                    listingid: listingid,
                    qty: quantity,
                    price: price,
                    cost: cost,
                    location: l,
                }
                const response = await editPriceQtyLoc(data)

            } else if (quantity == '') {
                var data: any = {
                    do: "SetPCQL",
                    userid: userid,
                    listingid: listingid,
                    qty: q,
                    price: p,
                    cost: cost,
                    location: l,
                }
                const response = await editPriceQtyLoc(data)

            }
        } else if (type == 3) {
            if (loc != '') {
                var data: any = {
                    do: "SetPCQL",
                    userid: userid,
                    listingid: listingid.toLowerCase(),
                    qty: quantity,
                    price: price,
                    cost: cost,
                    location: loc,
                }
                const response = await editPriceQtyLoc(data)
            } else if (loc == '') {
                var data: any = {
                    do: "SetPCQL",
                    userid: userid,
                    listingid: listingid.toLowerCase(),
                    qty: q,
                    price: p,
                    cost: cost,
                    location: l,
                }
                const response = await editPriceQtyLoc(data)
            }
        }
    }

    return (
        <NativeBaseProvider>
            {arrlabel.map((item) => {
                return (
                    <TouchableOpacity key={item.id} style={[styles.block, styles.block2]} onPress={() => check(item.id)}>
                        <View style={styles.flex1}>
                            <SubTitle style={styles.productname}>{item.name}</SubTitle>
                        </View>
                        <View style={styles.flex2}>
                            {item.name == t('common:Price') ? <SubTitle style={styles.productStock}>{p}</SubTitle> : null}
                            {item.name == t('common:Quantity_Available') ? <SubTitle style={styles.productStock}>{parseInt(q)}</SubTitle> : null}
                            {item.name == t('common:LOCATION') ? <SubTitle style={styles.productStock}>{l ? l : ''}</SubTitle> : null}
                            {/* {item.name !== 'location' ?
                                <SubTitle style={styles.productStock}>{item.value}</SubTitle> : <SubTitle style={styles.productStock}>{item.value}</SubTitle>} */}
                        </View>
                        <View style={styles.flex3}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => check(item.id)}>
                                <FontAwesome name='pencil' size={25} color={theme.colors.skyblue[200]} />
                            </TouchableOpacity>

                            <Modal isOpen={showPriceModal} onClose={() => setShowPriceModal(false)}>
                                <Modal.Content maxWidth="400px">
                                    <View style={styles.padding}>
                                        <TextInput
                                            style={styles.modalInput}
                                            // placeholder='1.00'
                                            placeholderTextColor={theme.colors.black[0]}
                                            keyboardType='numeric'
                                            onChangeText={(text) => setPrice(text)}
                                        />
                                        <View style={styles.block}>
                                            <TouchableOpacity activeOpacity={0.9} style={styles.modalBtn} onPress={() => ChangePrice()}>
                                                <Caption style={styles.modalBtnText}>{t('common:ADD')}</Caption>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.9} style={styles.modalBtn} onPress={() => { setShowPriceModal(false) }}>
                                                <Caption style={styles.modalBtnText}>{t('common:CANCEL')}</Caption>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal.Content>
                            </Modal>

                            <Modal isOpen={showQuantityModal} onClose={() => setShowQuantityModal(false)}>
                                <Modal.Content maxWidth="400px">
                                    <View style={styles.padding}>
                                        <View style={[styles.block, styles.evenly]}>
                                            <TouchableOpacity activeOpacity={0.9} onPress={handleMinus}>
                                                <SimpleLineIcons name='minus' color={theme.colors.black[0]} size={30} />
                                            </TouchableOpacity>
                                            <SubTitle style={styles.quantityModalText}>{quantity}</SubTitle>
                                            <TouchableOpacity activeOpacity={0.9} onPress={handlePlus}>
                                                <SimpleLineIcons name='plus' color={theme.colors.black[0]} size={30} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.block}>
                                            <TouchableOpacity activeOpacity={0.9} style={styles.modalBtn} onPress={() => ChangeQuantity()}>
                                                <Caption style={styles.modalBtnText}>{t('common:ADD')}</Caption>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.9} style={styles.modalBtn} onPress={() => { setShowQuantityModal(false) }}>
                                                <Caption style={styles.modalBtnText}>{t('common:CANCEL')}</Caption>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal.Content>
                            </Modal>

                            <Modal isOpen={showLocationModal} onClose={() => setShowLocationModal(false)}>
                                <Modal.Content maxWidth="400px">
                                    <View style={styles.padding}>
                                        {locationModalContent ? (arrtemp?.map((item) => {

                                            return item != '' ? (
                                                <View key={item}>
                                                    <View style={styles.block}>
                                                        <TouchableOpacity activeOpacity={0.9} onPress={() => { ChangeLocation(item); setShowLocationModal(false); }}>
                                                            <SubTitle style={styles.productname}>{item}</SubTitle>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => deleteLoc(item)}>
                                                            <Ionicons name='trash-outline' color={theme.colors.red[500]} size={19} />
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>
                                            ) : null
                                        })) : (<View>
                                            <TextInput
                                                style={styles.modalInput}
                                                placeholder='Location in Shop'
                                                placeholderTextColor={theme.colors.black[0]}
                                                onChangeText={text => setStateLocation(text)}
                                            />
                                            <View style={styles.block}>
                                                <TouchableOpacity activeOpacity={0.9} style={styles.modalBtn} onPress={updateloc}>
                                                    <Caption style={styles.modalBtnText}>{t('common:ADD')}</Caption>
                                                </TouchableOpacity>
                                                <TouchableOpacity activeOpacity={0.9} style={styles.modalBtn} onPress={handleCancleLocation}>
                                                    <Caption style={styles.modalBtnText}>{t('common:CANCEL')}</Caption>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )}

                                        <View style={styles.addBtnBox}>
                                            <CustomAddBtn onPress={handleAdd} />
                                        </View>
                                    </View>
                                </Modal.Content>
                            </Modal>
                        </View>
                    </TouchableOpacity>
                )
            })}

        </NativeBaseProvider>
    );

};


const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    block2: {
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    flex1: {
        flex: 5,
    },
    flex2: {
        flex: 4,
        alignItems: 'flex-end',
        paddingRight: 15
    },
    flex3: {
        flex: 3,
        alignItems: 'center'
    },
    productname: {
        fontSize: 14,
        textTransform: 'capitalize',
        color: theme.colors.primary[900]
    },
    productStock: {
        fontSize: 15,
        color: theme.colors.skyblue[200]
    },
    padding: {
        padding: 10
    },
    modalInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.black[0],
        marginBottom: 10,
        fontSize: 16,
        fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
        color: theme.colors.black[600]
    },
    modalBtn: {
        flex: 6,
        marginHorizontal: 5,
        padding: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: theme.colors.primary[500],
    },
    modalBtnText: {
        textTransform: 'uppercase',
        color: theme.colors.appWhite[100],
    },
    evenly: {
        justifyContent: 'space-evenly'
    },
    quantityModalText: {
        width: 150,
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 5,
        color: theme.colors.black[600],
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.black[0],
    },
    addBtnBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    }

});

export default SearchResultHiddin;
