import { Divider } from "native-base";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Dimensions } from "react-native";
import { SubTitle, Title } from "../../../components/Typography";
import { theme } from "../../../theme";

function OrderStatus(pops: any) {
  const { dashData } = pops;
  const { t, i18n } = useTranslation();

  return (
    <>
      <View style={styles.panel}>
        <View style={styles.order}>
          <View style={[styles.center1, styles.rightBorder]}>
            {/* <Title style={styles.figure}>{dashData?.activeOrders || 0}</Title> */}
            <Title style={styles.figure}>{dashData?.inStock || 0}</Title>
          </View>
          <View style={[styles.center1]}>
            {/* <Title style={styles.figure}>{dashData?.inStock || 0}</Title> */}
            <Title style={styles.figure}>{dashData?.outstock || 0}</Title>
          </View>
          {/* <View style={styles.center1}>
            <Title style={styles.figure}>{dashData?.outstock || 0}</Title>
            <Title style={styles.figure}>{dashData?.activeOrders || 0}</Title>
          </View> */}
        </View>
        <View style={styles.order}>
          <View style={styles.center1}>
            {/* <SubTitle style={styles.figuremsg}>{t('common:Active_Orders')}</SubTitle> */}
            <SubTitle style={styles.figuremsg}>{t("common:in_stock")}</SubTitle>
          </View>
          <View style={styles.center1}>
            {/* <SubTitle style={styles.figuremsg}>{t('common:in_stock')}</SubTitle> */}
            <SubTitle style={styles.figuremsg}>
              {t("common:Out_Of_Stock")}
            </SubTitle>
          </View>
          {/* <View style={styles.center1}>
            <SubTitle style={styles.figuremsg}>{t('common:Out_Of_Stock')}</SubTitle>
            <SubTitle style={styles.figuremsg}>
              {t("common:Active_Orders")}
            </SubTitle>
          </View> */}
        </View>
      </View>
      {/* <View style={styles.data}>
                <View style={styles.asideLeft}>
                    <SubTitle
                        style={styles.viewingOrder}>{t('common:Kizbin_Viewing')}</SubTitle>
                    <View
                        style={[
                            styles.wrapper,
                            styles.block,
                        ]}>
                        <SubTitle style={styles.asidedata}>{dashData?.hit_week || 0}</SubTitle>
                        <SubTitle style={{ color: theme.colors.darkBlue[700] }}>{t('common:This_Week')}</SubTitle>
                    </View>
                    <Divider />
                    <View
                        style={[
                            styles.wrapper,
                            styles.block,
                        ]}>
                        <SubTitle style={styles.asidedata}>{dashData?.hit_total || 0}</SubTitle>
                        <SubTitle style={{ color: theme.colors.darkBlue[700] }}>{t('common:To_Date')}</SubTitle>
                    </View>
                </View>
                <View style={styles.asideRight}>
                    <SubTitle
                        style={styles.viewingOrder}>{t('common:Kizbin_Orders')}</SubTitle>
                    <View
                        style={[
                            styles.wrapper,
                            styles.block,
                        ]}>
                        <SubTitle style={styles.asidedata}>{dashData?.ord_week || 0}</SubTitle>
                        <SubTitle style={{ color: theme.colors.darkBlue[700] }}>{t('common:This_Week')}</SubTitle>
                    </View>
                    <Divider />
                    <View
                        style={[
                            styles.wrapper,
                            styles.block,
                        ]}>
                        <SubTitle style={styles.asidedata}>{dashData?.ord_total || 0}</SubTitle>
                        <SubTitle style={{ color: theme.colors.darkBlue[700] }}>{t('common:To_Date')}</SubTitle>
                    </View>
                </View>
            </View> */}
    </>
  );
}

export default OrderStatus;

const styles = StyleSheet.create({
  rightBorder: {
    borderRightColor: theme.colors.gray[400],
    borderRightWidth: 0.5,
  },
  panel: {
    backgroundColor: theme.colors.appWhite[900],
    marginTop: 15,
    padding: 20,
    width: "100%",
    height: 85,
    shadowColor: theme.colors.darkBlue[900],
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.11,
    elevation: 10,
    justifyContent: "space-between",
  },
  figuremsg: {
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
    color: theme.colors.blue[900],
  },
  center1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  order: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  figure: {
    fontSize: 25,
    lineHeight: 26,
    textAlign: "center",
    color: theme.colors.blue[1000],
    fontWeight: "600",
  },
  data: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    shadowColor: theme.colors.darkBlue[900],
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.11,
    elevation: 10,
  },
  asideLeft: {
    width: "48%",
    marginRight: (Dimensions.get("window").width / 100) * 1.5,
    backgroundColor: "snow",
    padding: 5,
    // paddingLeft: 10,
    shadowColor: theme.colors.darkBlue[800],
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.11,
    elevation: 10,
  },
  viewingOrder: {
    color: theme.colors.darkBlue[700],
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  block: {
    margin: 10,
    alignItems: "center",
  },
  asidedata: {
    color: theme.colors.blue[800],
    fontSize: 17,
    marginRight: 10,
  },
  asideRight: {
    width: "48%",
    marginLeft: (Dimensions.get("window").width / 100) * 1.5,
    backgroundColor: "snow",
    padding: 10,
    // paddingLeft: 10,
    shadowColor: theme.colors.darkBlue[800],
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.11,
    elevation: 10,
  },
});
