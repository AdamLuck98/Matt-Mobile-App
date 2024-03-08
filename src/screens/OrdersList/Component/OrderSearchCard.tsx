import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Platform,
} from "react-native";
import images from "../../../assets/images";
import AntDesign from "react-native-vector-icons/AntDesign";
import { theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SubTitle } from "../../../components/Typography";
import setOrderOprations from "../Queries/setOrderOprations";
import useUserInfo from "../../../hooks/useUserInfo";
import { QueryKeys } from "../../../utils/QueryKeys";
import { useQueryClient } from "react-query";

function OrderSearchCard(Props: any) {
    const { renderItem, filterName, refetch, resetSearch } = Props;
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const [orderStatus, setOrderStatus] = React.useState("");
    useEffect(() => {
        switch (renderItem?.order_type) {
            case "1":
                setOrderStatus(t("common:PICKUP"));
                break;
            case "2":
                setOrderStatus(t("common:DELIVERY"));
                break;
            case "3":
                setOrderStatus(t("common:DINEIN"));
                break;
            case "4":
                setOrderStatus(t("common:RECEIPT"));
                break;
            default:
                break;
        }
    }, [renderItem?.order_type]);

    return (
        <TouchableOpacity
            onPress={() => {
                resetSearch("");
                navigation.navigate("OrderProductDetail", {
                    orderDetails: renderItem,
                });
            }}
        >
            <ImageBackground
                source={images.ORDER_BG}
                resizeMode="cover"
                style={styles.order}
            >
                <View style={styles.leftContent}>
                    {renderItem?.invoice_date ? <View style={styles.dateTimebox}>
                        <Text style={styles.datetime}>{renderItem?.invoice_date}</Text>
                    </View> : null}
                    <View style={styles.orderNoPickup}>
                        <Text style={styles.orderNo}>#{renderItem?.order_number}</Text>
                        <Text style={styles.pickup}>{orderStatus}</Text>
                    </View>
                </View>
                <View style={styles.rightContent}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("OrderProductDetail", {
                                orderDetails: renderItem,
                            });
                        }}
                    >
                        <AntDesign
                            name="pluscircle"
                            color={theme.colors.primary[400]}
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    leftContent: {
        paddingLeft: 10,
        paddingVertical: 10,
        width: "60%",
        justifyContent: 'center',
    },
    dateTimebox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "60%",
    },
    datetime: {
        fontSize: 13,
        fontWeight: "700",
        color: theme.colors.primary[500],
    },
    orderNoPickup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    orderNo: {
        fontSize: 12,
        backgroundColor: theme.colors.black[0],
        color: "#fff",
        fontWeight: "500",
        // borderRadius: 100,
        borderWidth: 0,
        ...Platform.select({
            ios: {
                borderRadius: 10,
                overflow: 'hidden',

            },
            android: {
                borderRadius: 10,
            },
        }),
        paddingVertical: 5,
        textAlign: "center",
        width: "57%",
    },
    pickup: {
        textTransform: "capitalize",
        color: theme.colors.black[0],
        fontWeight: "600",
        textAlign: "left",
        width: "40%",
        borderRadius: 10,

    },
    orderStatus: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "500",
        borderRadius: 100,
        paddingVertical: 5,
        textAlign: "center",
        width: "57%",
        marginVertical: 5,
        textTransform: "capitalize",
        borderWidth: 0,
        ...Platform.select({
            ios: {
                borderRadius: 10,
                overflow: 'hidden',

            },
            android: {
                borderRadius: 10,
            },
        }),
    },
    rightContent: {
        paddingRight: 20,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "flex-end",
        width: "40%",
    },
    order: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        elevation: 5,
        backgroundColor: theme.colors.appWhite[100],
    },
    sheetstyle: {
        backgroundColor: theme.colors.appWhite[800],
    },
    modaltext: {
        textAlign: "center",
        color: theme.colors.black[0],
        fontSize: 17,
    },
    space: {
        marginVertical: 5,
    },
    modalbtntext: {
        textAlign: "center",
        color: theme.colors.black[0],
        fontSize: 17,
        textTransform: "capitalize",
    },
    w100: { width: "100%" },
});

export default OrderSearchCard;
