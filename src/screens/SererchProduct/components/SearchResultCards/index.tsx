import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Share,
  Alert,
  ScrollView,
} from "react-native";
import { Modal, Spinner } from "native-base";
import { useTranslation } from "react-i18next";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

import images from "../../../../assets/images";
import { theme } from "../../../../theme";
import ScreensButton from "../../../../components/ScreenButtom";
import { Caption, SubTitle } from "../../../../components/Typography";
import CustomAddBtn from "../../../../components/CustomAddBtn";
import CustomMinusBtn from "../../../../components/CustomMinusBtn";
import { FONT_GOOGLE_BARLOW_SEMIBOLD } from "../../../../constants/fonts";
import useUserInfo from "../../../../hooks/useUserInfo";
import { useGetLocations } from "../../Queries/useGetLocation";
import useSetLocations from "../../Queries/useSetLocation";
import useDeleteLocations from "../../Queries/useDeleteLocation";
import useSetPriceQtyLoc from "../../Queries/useSetPriceQualityLocation";
import useDeleteProduct from "./Queries/useDeleteProduct";
import { showSnackbar } from "../../../../utils/SnackBar";
import { useQueryClient } from "react-query";
import { QueryKeys } from "../../../../utils/QueryKeys";
import { useSelector } from "react-redux";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface IProps {
  item: any;
  refatch: () => void;
  previousScreen: string;
  navigation: any;
  loading: boolean;
}

function SearchResultCards(props: IProps) {
  const { t, i18n } = useTranslation();
  const userdata = useUserInfo();
  const { item, navigation, refatch, previousScreen, loading } = props;
  const [showHiden, setShowHIdden] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [price, setPrice] = useState(item?.price);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState(item?.qty);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLocationList, setShowLocationList] = useState(true);
  const [stateLocation, setStateLocation] = useState(item?.location);
  const isFocused = useIsFocused();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const refInput = React.useRef(null);
  const refInput2 = React.useRef(null);

  const serchdata = useSelector((state) => state?.SerchScreenSort);
  // console.log("item", JSON.stringify(item, null, 2));

  const { editPriceQtyLoc } = useSetPriceQtyLoc();
  const { setLocations } = useSetLocations();
  const { deleteLocations } = useDeleteLocations();
  const { deleteProduct } = useDeleteProduct();
  const userShop = userdata.userInfo?.UserName;

  const queries = useQueryClient();
  const { data: locationData, refetch: locrefetch } = useGetLocations({
    userid: item?.userid,
    suball: 1,
  });

  // console.log("userdata>>", JSON.stringify(userdata, null, 2))

  useEffect(() => {
    if (serchdata?.showDetail === 0) {
      setShowHIdden(false);
    }
  }, [serchdata?.showDetail]);

  const reload = () => {
    setTimeout(() => {
      locrefetch();
    }, 1200);
  };

  useEffect(() => {
    setPrice(item?.price);
    setQuantity(item?.qty);
    setStateLocation(item?.location);
    setImage1(item?.image_1);
    setImage2(item?.image_2);
    setImage3(item?.image_3);
    setImage4(item?.image_4);
  }, [item]);

  const arrLocations = locationData?.LocData;
  const arrtemp = arrLocations?.split(",");

  const ChangePrice = () => {
    updatePQL(1);
    setShowPriceModal(false);
  };

  const handleMinus = () => {
    if (parseInt(quantity) > 0) {
      var qty = parseInt(quantity);
      qty = qty - 1;
      setQuantity(qty.toString());
    }
  };
  const handlePlus = () => {
    let qty = parseInt(quantity);
    setQuantity(qty + 1);
  };
  const ChangeQuantity = () => {
    updatePQL(2);
    setShowQuantityModal(false);
  };

  const ChangeLocation = (item: string) => {
    setStateLocation(item);
    updatePQL(3, item);
    setShowPriceModal(false);
  };

  const deleteLoc = (loc: string) => {
    const data: any = {
      do: "DelLocation",
      userid: item?.userid,
      location: loc,
    };
    deleteLocations(data);
    reload();
  };
  const updateloc = () => {
    const data: any = {
      do: "SetLocation",
      userid: item?.userid,
      location: stateLocation,
    };
    setLocations(data);
    setShowLocationList(true);
    setShowLocationModal(false);
    reload();
  };
  const handleCancleLocation = () => {
    // setStateLocation("");
    // updatePQL(3);
    setShowLocationList(true);
    setShowLocationModal(false);
  };
  const handleAdd = () => {
    setShowLocationList(false);
  };

  const updatePQL = async (type: number, loc?: string) => {
    if (type == 1) {
      if (price != "") {
        var data: any = {
          do: "SetPCQL",
          userid: item?.userid,
          listingid: item?.listingid.toLowerCase(),
          qty: item?.qty,
          price: price,
          cost: item?.cost,
          location: item?.location,
        };
        const response = await editPriceQtyLoc(data);
        queries.invalidateQueries([QueryKeys.useAllLocation]);
        queries.invalidateQueries([QueryKeys.useOutStock]);
        queries.invalidateQueries([QueryKeys.thilocation]);
      } else if (price == "") {
        var data: any = {
          do: "SetPCQL",
          userid: item?.userid,
          listingid: item?.listingid,
          qty: item?.qty,
          price: item?.price,
          cost: item?.cost,
          location: item?.location,
        };
        const response = await editPriceQtyLoc(data);
      }
    } else if (type == 2) {
      if (quantity != "") {
        var data: any = {
          do: "SetPCQL",
          userid: item?.userid,
          listingid: item?.listingid,
          qty: quantity,
          price: item?.price,
          cost: item?.cost,
          location: item?.location,
        };
        const response = await editPriceQtyLoc(data);
        if (response.ResponseMsg === "Records Updated") {
          refatch();
        }
        queries.removeQueries([QueryKeys.useOutStock]);
      } else if (quantity == "") {
        var data: any = {
          do: "SetPCQL",
          userid: item?.userid,
          listingid: item?.listingid,
          qty: item?.qty,
          price: item?.price,
          cost: item?.cost,
          location: item?.location,
        };
        const response = await editPriceQtyLoc(data);
      }
    } else if (type == 3) {
      if (loc != "") {
        var data: any = {
          do: "SetPCQL",
          userid: item?.userid,
          listingid: item?.listingid.toLowerCase(),
          qty: item?.qty,
          price: item?.price,
          cost: item?.cost,
          location: loc,
        };
        const response = await editPriceQtyLoc(data);
        // console.log(
        //   "search result hidden>>>",
        //   JSON.stringify(response, null, 2)
        // );
        queries.invalidateQueries([QueryKeys.useAllLocation]);
        queries.invalidateQueries([QueryKeys.useOutStock]);
        queries.invalidateQueries([QueryKeys.thilocation]);
      } else if (loc == "") {
        var data: any = {
          do: "SetPCQL",
          userid: item?.userid,
          listingid: item?.listingid.toLowerCase(),
          qty: item?.qty,
          price: item?.price,
          cost: item?.cost,
          location: item?.location,
        };
        const response = await editPriceQtyLoc(data);
        console.log(
          "search result hidden>>>",
          JSON.stringify(response, null, 2)
        );
      }
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          userdata?.userInfo?.CompanyName +
          t("common:SHAREPRODUCTMSG") +
          userdata?.userInfo?.UserName +
          `.kizbin.com/buyers/product-details.php?store.php&listingid=${item?.listingid}&tab=1`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handledeleteProduct = async () => {
    deleteProduct({
      do: "DeleteInventory",
      userid: item?.userid,
      listingid: item?.listingid,
    });

    const response = await deleteProduct(data);
    if (response.ResponseMsg === "Requested Record Successfully Deleted") {
      refatch();
    }
  };
  const queryClient = useQueryClient();

  const deletePopup = () =>
    Alert.alert("", t("common:DELETE_PRODUCT"), [
      {
        text: "Yes",
        onPress: () => {
          handledeleteProduct();
          refatch();
          setShowHIdden(!showHiden);
          // queryClient.invalidateQueries([QueryKeys.thilocation]);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size={30} />
      </View>
    );
  }
  let imageUrl = image1 && `${image1}?time+${new Date()}`;
  let imageUrl2 = image2 && `${image2}?time+${new Date()}`;
  let imageUrl3 = image3 && `${image3}?time+${new Date()}`;
  let imageUrl4 = image4 && `${image4}?time+${new Date()}`;

  // console.log("imageUrl", imageUrl);
  const handleQuantity = () => {
    refInput.current.focus();
    setShowQuantityModal(true);
  };

  const handlePrice = () => {
    refInput2.current.focus();
    setShowPriceModal(true);
  };

  return (
    <ImageBackground
      source={images.ORDER_BG}
      resizeMode="stretch"
      style={styles.order}
    >
      {/* <SubTitle>{userShop} {item?.listingid.substr(0, 4)}</SubTitle> */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setShowHIdden(!showHiden)}
      >
        <View style={styles.block}>
          <View style={[styles.block, { width: "77%", marginRight: 5 }]}>
            <Image
              source={
                imageUrl
                  ? { uri: imageUrl, cache: "reload" }
                  : images.LOGIN_LOGO
              }
              resizeMode="contain"
              style={styles.showImg}
            />
            <View style={styles.showText}>
              <SubTitle style={styles.productname}>{item?.prodtitle}</SubTitle>
              <Caption style={styles.productcategory}>
                {item?.cat_master || 0}
              </Caption>
              <Caption
                style={[styles.productcategory, { textTransform: "uppercase" }]}
              >
                {item?.listingid || 0}
              </Caption>
              <SubTitle style={styles.productStock}>
                {parseInt(item.qty)} {t("common:in_stock")}
              </SubTitle>
            </View>
          </View>
          <View style={styles.showRightContent}>
            {showHiden ? (
              <CustomMinusBtn onPress={() => setShowHIdden(false)} />
            ) : (
              <CustomAddBtn onPress={() => setShowHIdden(true)} />
            )}
          </View>
        </View>

        {showHiden ? (
          <View style={styles.hiddenContent}>
            <SubTitle style={styles.productDesc}>{item?.description}</SubTitle>

            <TouchableOpacity
              disabled={
                userdata?.userInfo?.UserType === 5 ||
                userShop != item?.listingid.substr(0, 4)
                  ? true
                  : false
              }
              style={[styles.block, styles.block2]}
              activeOpacity={0.9}
              onPress={() => setShowPriceModal(true)}
            >
              <View style={styles.flex1}>
                <SubTitle style={styles.label}>{t("common:Price")}</SubTitle>
              </View>
              <View style={styles.flex2}>
                <SubTitle style={styles.labelValue}>{price}</SubTitle>
              </View>
              <View style={styles.flex3}>
                {userdata?.userInfo?.UserType === 5 ||
                userShop != item?.listingid.substr(0, 4) ? null : (
                  <TouchableOpacity
                    disabled={userdata?.userInfo?.UserType === 5 ? true : false}
                    activeOpacity={0.9}
                    onPress={() => handlePrice()}
                  >
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={theme.colors.skyblue[200]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>

            <Modal
              isOpen={showPriceModal}
              onClose={() => setShowPriceModal(false)}
            >
              <Modal.Content maxWidth="400px">
                <View style={styles.padding}>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    ref={refInput2}
                    onChangeText={(text) => setPrice(text)}
                  />
                  <View style={styles.block}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.modalBtn}
                      onPress={() => ChangePrice()}
                    >
                      <Caption style={styles.modalBtnText}>
                        {t("common:ADD")}
                      </Caption>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.modalBtn}
                      onPress={() => {
                        // setPrice("");
                        // updatePQL(1);
                        setShowPriceModal(false);
                      }}
                    >
                      <Caption style={styles.modalBtnText}>
                        {t("common:CANCEL")}
                      </Caption>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </Modal.Content>
            </Modal>
            <TouchableOpacity
              disabled={
                userdata?.userInfo?.UserType === 5 ||
                userShop != item?.listingid.substr(0, 4)
                  ? true
                  : false
              }
              style={[styles.block, styles.block2]}
              activeOpacity={0.9}
              onPress={() => setShowQuantityModal(true)}
            >
              <View style={styles.flex1}>
                <SubTitle style={styles.label}>
                  {t("common:Quantity_Available")}
                </SubTitle>
              </View>
              <View style={styles.flex2}>
                <SubTitle style={styles.labelValue}>{quantity}</SubTitle>
              </View>
              <View style={styles.flex3}>
                {userdata?.userInfo?.UserType === 5 ||
                userShop != item?.listingid.substr(0, 4) ? null : (
                  <TouchableOpacity
                    disabled={userdata?.userInfo?.UserType === 5 ? true : false}
                    activeOpacity={0.9}
                    onPress={() => handleQuantity()}
                  >
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={theme.colors.skyblue[200]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
            <Modal
              isOpen={showQuantityModal}
              onClose={() => setShowQuantityModal(false)}
            >
              <Modal.Content maxWidth="400px">
                <View style={styles.padding}>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    ref={refInput}
                    onChangeText={(text) => setQuantity(text)}
                  />
                  <View style={styles.block}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.modalBtn}
                      onPress={() => ChangeQuantity()}
                    >
                      <Caption style={styles.modalBtnText}>
                        {t("common:ADD")}
                      </Caption>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.modalBtn}
                      onPress={() => {
                        // setQuantity("");
                        // updatePQL(2);
                        setShowQuantityModal(false);
                      }}
                    >
                      <Caption style={styles.modalBtnText}>
                        {t("common:CANCEL")}
                      </Caption>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </Modal.Content>
            </Modal>

            <TouchableOpacity
              disabled={
                userdata?.userInfo?.UserType === 5 ||
                userShop != item?.listingid.substr(0, 4)
                  ? true
                  : false
              }
              style={[styles.block, styles.block2]}
              activeOpacity={0.9}
              onPress={() => setShowLocationModal(true)}
            >
              <View style={styles.flex1}>
                <SubTitle style={styles.label}>{t("common:LOCATION")}</SubTitle>
              </View>
              <View style={styles.flex2}>
                <SubTitle style={styles.labelValue}>{stateLocation}</SubTitle>
              </View>
              <View style={styles.flex3}>
                {userdata?.userInfo?.UserType === 5 ||
                userShop != item?.listingid.substr(0, 4) ? null : (
                  <TouchableOpacity
                    disabled={userdata?.userInfo?.UserType === 5 ? true : false}
                    activeOpacity={0.9}
                    onPress={() => setShowLocationModal(true)}
                  >
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={theme.colors.skyblue[200]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>

            <Modal
              isOpen={showLocationModal}
              onClose={() => setShowLocationModal(false)}
            >
              <Modal.Content maxWidth="400px">
                <View style={styles.padding}>
                  <ScrollView style={{ height: 200 }}>
                    {showLocationList ? (
                      arrtemp?.map((item) => {
                        return item != "" ? (
                          <View key={item}>
                            <View style={styles.block}>
                              <TouchableOpacity
                                style={{
                                  flex: 1,
                                  marginRight: 5,
                                  marginBottom: 10,
                                }}
                                activeOpacity={0.9}
                                onPress={() => {
                                  ChangeLocation(item);
                                  setShowLocationModal(false);
                                }}
                              >
                                <SubTitle style={styles.locationItems}>
                                  {item}
                                </SubTitle>
                              </TouchableOpacity>
                              {/* <TouchableOpacity onPress={() => deleteLoc(item)}>
                                <Ionicons
                                  name="trash-outline"
                                  color={theme.colors.red[500]}
                                  size={22}
                                />
                              </TouchableOpacity> */}
                            </View>
                          </View>
                        ) : null;
                      })
                    ) : (
                      <View>
                        <TextInput
                          style={styles.modalInput}
                          placeholder="Location in Shop"
                          placeholderTextColor={theme.colors.black[0]}
                          onChangeText={(text) => setStateLocation(text)}
                        />
                        <View style={styles.block}>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.modalBtn}
                            onPress={updateloc}
                          >
                            <Caption style={styles.modalBtnText}>
                              {t("common:ADD")}
                            </Caption>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.modalBtn}
                            onPress={handleCancleLocation}
                          >
                            <Caption style={styles.modalBtnText}>
                              {t("common:CANCEL")}
                            </Caption>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </ScrollView>

                  {showLocationList ? (
                    <View style={styles.addBtnBox}>
                      <CustomAddBtn onPress={handleAdd} />
                    </View>
                  ) : null}
                </View>
              </Modal.Content>
            </Modal>

            <View
              style={[
                styles.block,
                { marginBottom: 10, justifyContent: "space-between" },
              ]}
            >
              <Image
                source={
                  imageUrl
                    ? { uri: imageUrl, cache: "reload" }
                    : images.LOGIN_LOGO
                }
                resizeMode="contain"
                style={styles.productImg}
              />
              <Image
                source={
                  imageUrl2
                    ? { uri: imageUrl2, cache: "reload" }
                    : images.LOGIN_LOGO
                }
                resizeMode="contain"
                style={styles.productImg}
              />
              <Image
                source={
                  imageUrl3
                    ? { uri: imageUrl3, cache: "reload" }
                    : images.LOGIN_LOGO
                }
                resizeMode="contain"
                style={styles.productImg}
              />
              <Image
                source={
                  imageUrl4
                    ? { uri: imageUrl4, cache: "reload" }
                    : images.LOGIN_LOGO
                }
                resizeMode="contain"
                style={styles.productImg}
              />
            </View>
            <View style={styles.block}>
              {previousScreen === "Allocation" ? (
                userdata?.userInfo?.UserType === 5 ? (
                  <>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:SHARE")}
                        bgcolor={theme.colors.green[400]}
                        iconName={""}
                        onPress={onShare}
                      />
                    </View>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:VIEW_DETAIL")}
                        bgcolor={theme.colors.skyblue[200]}
                        iconName={""}
                        onPress={() =>
                          navigation.navigate("EditScreen", {
                            name: "Edit Inventory",
                            id: item?.listingid,
                            itempass: item,
                            previousScreen: previousScreen,
                          })
                        }
                      />
                    </View>
                  </>
                ) : userShop == item?.listingid.substr(0, 4) ? (
                  <>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:SHARE")}
                        bgcolor={theme.colors.green[400]}
                        iconName={""}
                        onPress={onShare}
                      />
                    </View>

                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:EDIT")}
                        bgcolor={theme.colors.skyblue[200]}
                        iconName={""}
                        onPress={() =>
                          navigation.navigate("EditScreen", {
                            name: "Edit Inventory",
                            id: item?.listingid,
                            itempass: item,
                            previousScreen: previousScreen,
                          })
                        }
                      />
                    </View>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:DELETE")}
                        bgcolor={theme.colors.red[500]}
                        iconName={""}
                        onPress={() => {
                          deletePopup();
                        }}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:SHARE")}
                        bgcolor={theme.colors.green[400]}
                        iconName={""}
                        onPress={onShare}
                      />
                    </View>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:VIEW_DETAIL")}
                        bgcolor={theme.colors.skyblue[200]}
                        iconName={""}
                        onPress={() =>
                          navigation.navigate("EditScreen", {
                            name: "Edit Inventory",
                            id: item?.listingid,
                            itempass: item,
                            previousScreen: previousScreen,
                          })
                        }
                      />
                    </View>
                  </>
                )
              ) : null}

              {previousScreen === "OutStock" ? (
                userdata?.userInfo?.UserType === 5 ? (
                  <View style={styles.flex4}>
                    <ScreensButton
                      btnTitle={t("common:VIEW_DETAIL")}
                      bgcolor={theme.colors.skyblue[200]}
                      iconName={""}
                      onPress={() =>
                        navigation.navigate("EditScreen", {
                          name: "Edit Inventory",
                          id: item?.listingid,
                          itempass: item,
                          previousScreen: previousScreen,
                        })
                      }
                    />
                  </View>
                ) : (
                  <>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:EDIT")}
                        bgcolor={theme.colors.skyblue[200]}
                        iconName={""}
                        onPress={() =>
                          navigation.navigate("EditScreen", {
                            name: "Edit Inventory",
                            id: item?.listingid,
                            itempass: item,
                            previousScreen: previousScreen,
                          })
                        }
                      />
                    </View>

                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:DELETE")}
                        bgcolor={theme.colors.red[500]}
                        iconName={""}
                        onPress={() => {
                          deletePopup();
                        }}
                      />
                    </View>
                  </>
                )
              ) : null}

              {previousScreen === "Thislocation" ? (
                userdata?.userInfo?.UserType === 5 ? (
                  <>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:SHARE")}
                        bgcolor={theme.colors.green[400]}
                        iconName={""}
                        onPress={onShare}
                      />
                    </View>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:VIEW_DETAIL")}
                        bgcolor={theme.colors.skyblue[200]}
                        iconName={""}
                        onPress={() =>
                          navigation.navigate("EditScreen", {
                            name: "Edit Inventory",
                            id: item?.listingid,
                            itempass: item,
                            previousScreen: previousScreen,
                          })
                        }
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:SHARE")}
                        bgcolor={theme.colors.green[400]}
                        iconName={""}
                        onPress={onShare}
                      />
                    </View>

                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:EDIT")}
                        bgcolor={theme.colors.skyblue[200]}
                        iconName={""}
                        onPress={() =>
                          navigation.navigate("EditScreen", {
                            name: "Edit Inventory",
                            id: item?.listingid,
                            itempass: item,
                            previousScreen: previousScreen,
                          })
                        }
                      />
                    </View>

                    <View style={styles.flex4}>
                      <ScreensButton
                        btnTitle={t("common:DELETE")}
                        bgcolor={theme.colors.red[500]}
                        iconName={""}
                        onPress={() => {
                          deletePopup();
                        }}
                      />
                    </View>
                  </>
                )
              ) : null}
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  order: {
    width: "100%",
    resizeMode: "contain",
    marginVertical: 10,
    elevation: 5,
    backgroundColor: theme.colors.appWhite[100],
    padding: 10,
  },
  block: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  showImg: {
    width: width * 0.25,
    height: height * 0.12,
    borderWidth: 0.2,
    borderColor: theme.colors.black[0],
    borderRadius: 8,
  },
  showText: {
    marginLeft: 10,
    width: "60%",
  },
  productname: {
    fontSize: 17,
    // textTransform: "capitalize",
    color: theme.colors.primary[900],
  },
  productcategory: {
    fontSize: 15,
    textTransform: "capitalize",
    color: theme.colors.gray[900],
  },
  productStock: {
    fontSize: 15,
    color: theme.colors.skyblue[200],
  },
  showRightContent: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    borderLeftWidth: 0.2,
    borderColor: theme.colors.gray[500],
  },
  hiddenContent: {
    marginTop: 8,
  },
  productDesc: {
    textTransform: "capitalize",
    color: theme.colors.gray[900],
    marginBottom: 10,
  },
  block2: {
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  flex1: {
    flex: 5,
  },
  flex2: {
    flex: 4,
    alignItems: "flex-end",
    paddingRight: 15,
  },
  flex3: {
    flex: 3,
    alignItems: "flex-end",
    paddingRight: 15,
  },
  label: {
    fontSize: 13,
    textTransform: "capitalize",
    color: theme.colors.primary[900],
  },
  labelValue: {
    fontSize: 15,
    color: theme.colors.skyblue[200],
  },
  padding: {
    padding: 10,
  },
  modalInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.black[0],
    marginBottom: 10,
    fontSize: 16,
    fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
    color: theme.colors.black[600],
  },
  modalBtn: {
    flex: 6,
    marginHorizontal: 5,
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: theme.colors.primary[500],
  },
  modalBtnText: {
    textTransform: "uppercase",
    color: theme.colors.appWhite[100],
  },
  evenly: {
    marginBottom: 10,
    justifyContent: "space-evenly",
  },
  quantityModalText: {
    width: 150,
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 5,
    color: theme.colors.black[600],
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.black[0],
  },
  addBtnBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  locationItems: {
    fontSize: 15,
    textTransform: "capitalize",
    color: theme.colors.primary[900],
  },
  productImg: {
    width: width * 0.2,
    height: width * 0.2,
    borderWidth: 0.1,
    borderRadius: 8,
  },
  flex4: {
    flex: 4,
    marginHorizontal: 5,
  },
  addToCart: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 100,
  },
});

export default SearchResultCards;
