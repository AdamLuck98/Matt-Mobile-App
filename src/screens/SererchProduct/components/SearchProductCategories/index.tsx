// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   ScrollView,
//   Keyboard,
// } from "react-native";
// import { Actionsheet, Box } from "native-base";
// import { useTranslation } from "react-i18next";
// import { theme } from "../../../../theme";
// import ScreensButton from "../../../../components/ScreenButtom";
// import { SubTitle } from "../../../../components/Typography";
// import useUserInfo from "../../../../hooks/useUserInfo";
// import { useDispatch } from "react-redux";
// import { voiceStart } from "../../../../redux/reducers/VoiceToText/action";
// import { VoiceKey } from "../../../../redux/reducers/VoiceKey/Action";
// import Icons from "../../../../components/iconss";

// interface IProps {
//   label: string;
//   color: string;
//   sheetlabel: String;
//   list: string[] | undefined;
//   subList?: string[];
//   subList2?: string[];
//   value: string;
//   onSelect: (text: string) => void;
//   isSubSheet: boolean;
//   isSubSheet2: boolean;
//   onSubSelect: (text: string) => void;
//   onSubSelect2: (text: string) => void;
//   subValue?: string;
//   subValue2?: string;
//   err?: string;
//   icons?: any;
//   voicekey?: string;
// }

// function SearchProductCategories(props: IProps) {
//   const userdata = useUserInfo();
//   const { t, i18n } = useTranslation();
//   const {
//     label,
//     color,
//     list,
//     subList,
//     subList2,
//     value,
//     subValue,
//     subValue2,
//     onSelect,
//     onSubSelect,
//     onSubSelect2,
//     isSubSheet,
//     isSubSheet2,
//     err,
//     icons,
//     voicekey,
//   } = props;
//   const [showSheet, setShowSheet] = useState(false);
//   const [setlected, setSelected] = useState("");
//   const [showSubSheet, setShowSubSheet] = useState(false);
//   const [subSetlected, setsubSetlected] = useState("");
//   const [showSubSheet2, setShowSubSheet2] = useState(false);
//   const [subSetlected2, setsubSetlected2] = useState("");

//   const [masterCategory, setMasterCategory] = useState("");
//   const [subCategory1, setSubCategory1] = useState("");
//   const [subCategory2, setSubCategory2] = useState("");
//   const [pasword, setpasword] = useState(true);
//   const discloser = useDispatch();

//   function HandleMasterSelect(item: string, index: any) {
//     setSelected(item);
//     onSelect(item);
//     setShowSheet(false);
//     if (isSubSheet == true) {
//       setShowSubSheet(true);
//     }
//   }

//   function HandleSubSelect(item: string, index: any) {
//     setsubSetlected(item);
//     onSubSelect(item);
//     setShowSubSheet(false);
//     if (isSubSheet2 == true) {
//       setShowSubSheet2(true);
//     }
//   }

//   const HandleSubSelect2 = (item: string, index: any) => {
//     setsubSetlected2(item);
//     onSubSelect2(item);
//     setShowSubSheet2(false);
//   };

//   function HandleCategoryCancel() {
//     setShowSheet(false);
//   }

//   function HandleSubCategoryCancel() {
//     setShowSubSheet(false);
//     setShowSheet(false);
//   }

//   function HandleSubCategory2Cancel() {
//     setShowSubSheet2(false);
//     setShowSubSheet(false);
//     setShowSheet(false);
//   }

//   return (
//     <View>
//       <TouchableWithoutFeedback
//         onPress={() => {
//           setShowSheet(true);
//           Keyboard.dismiss();
//         }}
//       >
//         <View>
//           <SubTitle
//             style={[styles.droptitle, { marginLeft: 10, color: color }]}
//           >
//             {label}
//           </SubTitle>

//           <View
//             style={{
//               borderBottomWidth: 1,
//               borderBottomColor: err ? err : theme.colors.gray[800],
//               marginLeft: 5,
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <SubTitle style={[styles.drop]}>
//               {value ? (
//                 <Text style={styles.selected}>
//                   {value} {subValue && ","} {subValue} {subValue2 && ","}{" "}
//                   {subValue2}
//                 </Text>
//               ) : (
//                 <Text style={styles.selected}>{""}</Text>
//               )}
//             </SubTitle>
//             {icons ? (
//               <View style={styles.flex2}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     pasword ? setpasword(false) : setpasword(true);
//                     discloser(voiceStart(true));
//                     discloser(VoiceKey(voicekey));
//                     Keyboard.dismiss();
//                   }}
//                 >
//                   <Icons name={icons} value={pasword} />
//                 </TouchableOpacity>
//               </View>
//             ) : null}
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//       <Actionsheet
//         isOpen={showSheet}
//         onClose={() => {
//           setShowSheet(false);
//         }}
//       >
//         <Actionsheet.Content style={styles.sheetstyle}>
//           <Box w="100%" h="100%">
//             <View style={styles.block}>
//               <SubTitle style={styles.label}>{props.sheetlabel}</SubTitle>
//               <View style={styles.list}>
//                 <ScrollView
//                   contentContainerStyle={{ width: 300, alignItems: "center" }}
//                   showsVerticalScrollIndicator={false}
//                 >
//                   {list &&
//                     list?.map((item: any, index: any) => {
//                       return item !== "" ? (
//                         <View
//                           key={index}
//                           style={{
//                             width: "100%",
//                             display: "flex",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             borderBottomWidth: 0.5,
//                           }}
//                         >
//                           <TouchableOpacity
//                             style={[
//                               styles.listBtn,
//                               {
//                                 backgroundColor:
//                                   value == item
//                                     ? theme.colors.yellow[400]
//                                     : "transparent",
//                                 flex: 11,
//                               },
//                             ]}
//                             onPress={() => {
//                               HandleMasterSelect(item, index);
//                             }}
//                           >
//                             <View style={styles.listBlock}>
//                               <SubTitle style={styles.listText}>
//                                 {item}
//                               </SubTitle>
//                             </View>
//                           </TouchableOpacity>
//                         </View>
//                       ) : null;
//                     })}
//                 </ScrollView>
//               </View>
//               <View style={styles.fullWidth}>
//                 <ScreensButton
//                   onPress={HandleCategoryCancel}
//                   btnTitle={t("common:CANCEL")}
//                   bgcolor={theme.colors.red[600]}
//                   iconName={""}
//                 />
//               </View>
//             </View>
//           </Box>
//         </Actionsheet.Content>
//       </Actionsheet>

//       <Actionsheet isOpen={showSubSheet} onClose={() => setShowSubSheet(false)}>
//         <Actionsheet.Content style={styles.sheetstyle}>
//           <Box w="100%" h="100%">
//             <View style={styles.block}>
//               <SubTitle style={styles.label}>
//                 {t("common:SELECT_SUB_CATEGORY")} 1
//               </SubTitle>
//               <View style={styles.list}>
//                 <ScrollView
//                   contentContainerStyle={{ width: 300, alignItems: "center" }}
//                   showsVerticalScrollIndicator={false}
//                 >
//                   {subList &&
//                     subList?.map((item: any, index: any) => {
//                       return item !== "" ? (
//                         <View key={index}>
//                           <View
//                             style={{
//                               width: "100%",
//                               display: "flex",
//                               flexDirection: "row",
//                               alignItems: "center",
//                               borderBottomWidth: 0.5,
//                             }}
//                           >
//                             <TouchableOpacity
//                               style={[
//                                 styles.listBtn,
//                                 {
//                                   backgroundColor:
//                                     subValue == item
//                                       ? theme.colors.yellow[400]
//                                       : "transparent",
//                                   flex: 11,
//                                 },
//                               ]}
//                               onPress={() => HandleSubSelect(item, index)}
//                             >
//                               <View style={styles.listBlock}>
//                                 <SubTitle style={styles.listText}>
//                                   {item}
//                                 </SubTitle>
//                               </View>
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       ) : null;
//                     })}
//                 </ScrollView>
//               </View>
//               <View style={styles.fullWidth}>
//                 <ScreensButton
//                   onPress={HandleSubCategoryCancel}
//                   btnTitle={t("common:CANCEL")}
//                   bgcolor={theme.colors.red[600]}
//                   iconName={""}
//                 />
//               </View>
//             </View>
//           </Box>
//         </Actionsheet.Content>
//       </Actionsheet>

//       <Actionsheet
//         isOpen={showSubSheet2}
//         onClose={() => setShowSubSheet2(false)}
//       >
//         <Actionsheet.Content style={styles.sheetstyle}>
//           <Box w="100%" h="100%">
//             <View style={styles.block}>
//               <SubTitle style={styles.label}>
//                 {t("common:SELECT_SUB_CATEGORY")} 2
//               </SubTitle>

//               <View style={styles.list}>
//                 <ScrollView
//                   contentContainerStyle={{ width: 300, alignItems: "center" }}
//                   showsVerticalScrollIndicator={false}
//                 >
//                   {subList2 &&
//                     subList2?.map((item: any, index: any) => {
//                       return item !== "" ? (
//                         <View key={index}>
//                           <View
//                             style={{
//                               width: "100%",
//                               display: "flex",
//                               flexDirection: "row",
//                               alignItems: "center",
//                               borderBottomWidth: 0.5,
//                             }}
//                           >
//                             <TouchableOpacity
//                               style={[
//                                 styles.listBtn,
//                                 {
//                                   backgroundColor:
//                                     subValue2 == item
//                                       ? theme.colors.yellow[400]
//                                       : "transparent",
//                                   flex: 11,
//                                 },
//                               ]}
//                               onPress={() => HandleSubSelect2(item, index)}
//                             >
//                               <View style={styles.listBlock}>
//                                 <SubTitle style={styles.listText}>
//                                   {item}
//                                 </SubTitle>
//                               </View>
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       ) : null;
//                     })}
//                 </ScrollView>
//               </View>
//               <View style={styles.fullWidth}>
//                 <ScreensButton
//                   onPress={HandleSubCategory2Cancel}
//                   btnTitle={t("common:CANCEL")}
//                   bgcolor={theme.colors.red[600]}
//                   iconName={""}
//                 />
//               </View>
//             </View>
//           </Box>
//         </Actionsheet.Content>
//       </Actionsheet>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sheetstyle: {
//     backgroundColor: theme.colors.appWhite[800],
//   },
//   droptitle: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   drop: {
//     height: 45,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     justifyContent: "flex-end",
//   },
//   selected: {
//     fontSize: 16,
//     padding: 20,
//     textTransform: "capitalize",
//     fontWeight: "700",
//   },
//   block: {
//     width: "100%",
//     alignItems: "center",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: theme.colors.black[0],
//   },
//   sublabel: {
//     textAlign: "center",
//     fontSize: 16,
//     marginTop: 10,
//   },
//   search: {
//     width: "90%",
//   },
//   list: {
//     width: "90%",
//     height: "70%",
//     backgroundColor: theme.colors.appWhite[100],
//     paddingVertical: 5,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   listBtn: {
//     paddingHorizontal: 5,
//   },
//   listBlock: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   listText: {
//     fontSize: 16,
//     color: theme.colors.darkBlue[700],
//     paddingVertical: 7,
//     textTransform: "capitalize",
//   },
//   addBtnBox: {
//     width: "80%",
//     marginTop: 10,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   fullWidth: {
//     width: "90%",
//   },
// });
// export default SearchProductCategories;

// new changes
import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { Actionsheet, Box } from "native-base";
import { useTranslation } from "react-i18next";
import { theme } from "../../../../theme";
import ScreensButton from "../../../../components/ScreenButtom";
import { SubTitle } from "../../../../components/Typography";
import useUserInfo from "../../../../hooks/useUserInfo";
import { useDispatch } from "react-redux";
import { voiceStart } from "../../../../redux/reducers/VoiceToText/action";
import { VoiceKey } from "../../../../redux/reducers/VoiceKey/Action";
import Icons from "../../../../components/iconss";

interface IProps {
  label: string;
  color: string;
  sheetlabel: String;
  list: string[] | undefined;
  subList?: string[];
  subList2?: string[];
  value: string;
  onSelect: (text: string) => void;
  isSubSheet: boolean;
  isSubSheet2: boolean;
  onSubSelect: (text: string) => void;
  onSubSelect2: (text: string) => void;
  subValue?: string;
  subValue2?: string;
  err?: string;
  icons?: any;
  voicekey?: string;
}

const SearchProductCategories = forwardRef((props: IProps, ref) => {
  const userdata = useUserInfo();
  const { t, i18n } = useTranslation();
  const {
    label,
    color,
    list,
    subList,
    subList2,
    value,
    subValue,
    subValue2,
    onSelect,
    onSubSelect,
    onSubSelect2,
    isSubSheet,
    isSubSheet2,
    err,
    icons,
    voicekey,
  } = props;
  const [showSheet, setShowSheet] = useState(false);
  const [setlected, setSelected] = useState("");
  const [showSubSheet, setShowSubSheet] = useState(false);
  const [subSetlected, setsubSetlected] = useState("");
  const [showSubSheet2, setShowSubSheet2] = useState(false);
  const [subSetlected2, setsubSetlected2] = useState("");

  const [masterCategory, setMasterCategory] = useState("");
  const [subCategory1, setSubCategory1] = useState("");
  const [subCategory2, setSubCategory2] = useState("");
  const [pasword, setpasword] = useState(true);
  const discloser = useDispatch();

  function HandleMasterSelect(item: string, index: any) {
    setSelected(item);
    onSelect(item);
    setShowSheet(false);
    if (isSubSheet == true) {
      setShowSubSheet(true);
    }
  }

  useImperativeHandle(ref, () => ({
    handleAdd() {
      setShowSheet(true);
    },
    handleClose() {
      setShowSheet(false);
    },
  }));

  function HandleSubSelect(item: string, index: any) {
    setsubSetlected(item);
    onSubSelect(item);
    setShowSubSheet(false);
    if (isSubSheet2 == true) {
      setShowSubSheet2(true);
    }
  }

  const HandleSubSelect2 = (item: string, index: any) => {
    setsubSetlected2(item);
    onSubSelect2(item);
    setShowSubSheet2(false);
  };

  function HandleCategoryCancel() {
    setShowSheet(false);
  }

  function HandleSubCategoryCancel() {
    setShowSubSheet(false);
    setShowSheet(false);
  }

  function HandleSubCategory2Cancel() {
    setShowSubSheet2(false);
    setShowSubSheet(false);
    setShowSheet(false);
  }

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowSheet(true);
          Keyboard.dismiss();
        }}
      >
        <View>
          <SubTitle
            style={[styles.droptitle, { marginLeft: 10, color: color }]}
          >
            {label}
          </SubTitle>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: err ? err : theme.colors.gray[800],
              marginLeft: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SubTitle style={[styles.drop]}>
              {value ? (
                <Text style={styles.selected}>
                  {value} {subValue && ","} {subValue} {subValue2 && ","}{" "}
                  {subValue2}
                </Text>
              ) : (
                <Text style={styles.selected}>{""}</Text>
              )}
            </SubTitle>
            {icons ? (
              <View style={styles.flex2}>
                <TouchableOpacity
                  onPress={() => {
                    pasword ? setpasword(false) : setpasword(true);
                    discloser(voiceStart(true));
                    discloser(VoiceKey(voicekey));
                    Keyboard.dismiss();
                  }}
                >
                  <Icons name={icons} value={pasword} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Actionsheet
        isOpen={showSheet}
        onClose={() => {
          setShowSheet(false);
        }}
      >
        <Actionsheet.Content style={styles.sheetstyle}>
          <Box w="100%" h="100%">
            <View style={styles.block}>
              <SubTitle style={styles.label}>{props.sheetlabel}</SubTitle>
              <View style={styles.list}>
                <ScrollView
                  contentContainerStyle={{ width: 300, alignItems: "center" }}
                  showsVerticalScrollIndicator={false}
                >
                  {list &&
                    list?.map((item: any, index: any) => {
                      return item !== "" ? (
                        <View
                          key={index}
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderBottomWidth: 0.5,
                          }}
                        >
                          <TouchableOpacity
                            style={[
                              styles.listBtn,
                              {
                                backgroundColor:
                                  value == item
                                    ? theme.colors.yellow[400]
                                    : "transparent",
                                flex: 11,
                              },
                            ]}
                            onPress={() => {
                              HandleMasterSelect(item, index);
                            }}
                          >
                            <View style={styles.listBlock}>
                              <SubTitle style={styles.listText}>
                                {item}
                              </SubTitle>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null;
                    })}
                </ScrollView>
              </View>
              <View style={styles.fullWidth}>
                <ScreensButton
                  onPress={HandleCategoryCancel}
                  btnTitle={t("common:CANCEL")}
                  bgcolor={theme.colors.red[600]}
                  iconName={""}
                />
              </View>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>

      <Actionsheet isOpen={showSubSheet} onClose={() => setShowSubSheet(false)}>
        <Actionsheet.Content style={styles.sheetstyle}>
          <Box w="100%" h="100%">
            <View style={styles.block}>
              <SubTitle style={styles.label}>
                {t("common:SELECT_SUB_CATEGORY")} 1
              </SubTitle>
              <View style={styles.list}>
                <ScrollView
                  contentContainerStyle={{ width: 300, alignItems: "center" }}
                  showsVerticalScrollIndicator={false}
                >
                  {subList &&
                    subList?.map((item: any, index: any) => {
                      return item !== "" ? (
                        <View key={index}>
                          <View
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              borderBottomWidth: 0.5,
                            }}
                          >
                            <TouchableOpacity
                              style={[
                                styles.listBtn,
                                {
                                  backgroundColor:
                                    subValue == item
                                      ? theme.colors.yellow[400]
                                      : "transparent",
                                  flex: 11,
                                },
                              ]}
                              onPress={() => HandleSubSelect(item, index)}
                            >
                              <View style={styles.listBlock}>
                                <SubTitle style={styles.listText}>
                                  {item}
                                </SubTitle>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : null;
                    })}
                </ScrollView>
              </View>
              <View style={styles.fullWidth}>
                <ScreensButton
                  onPress={HandleSubCategoryCancel}
                  btnTitle={t("common:CANCEL")}
                  bgcolor={theme.colors.red[600]}
                  iconName={""}
                />
              </View>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>

      <Actionsheet
        isOpen={showSubSheet2}
        onClose={() => setShowSubSheet2(false)}
      >
        <Actionsheet.Content style={styles.sheetstyle}>
          <Box w="100%" h="100%">
            <View style={styles.block}>
              <SubTitle style={styles.label}>
                {t("common:SELECT_SUB_CATEGORY")} 2
              </SubTitle>

              <View style={styles.list}>
                <ScrollView
                  contentContainerStyle={{ width: 300, alignItems: "center" }}
                  showsVerticalScrollIndicator={false}
                >
                  {subList2 &&
                    subList2?.map((item: any, index: any) => {
                      return item !== "" ? (
                        <View key={index}>
                          <View
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              borderBottomWidth: 0.5,
                            }}
                          >
                            <TouchableOpacity
                              style={[
                                styles.listBtn,
                                {
                                  backgroundColor:
                                    subValue2 == item
                                      ? theme.colors.yellow[400]
                                      : "transparent",
                                  flex: 11,
                                },
                              ]}
                              onPress={() => HandleSubSelect2(item, index)}
                            >
                              <View style={styles.listBlock}>
                                <SubTitle style={styles.listText}>
                                  {item}
                                </SubTitle>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : null;
                    })}
                </ScrollView>
              </View>
              <View style={styles.fullWidth}>
                <ScreensButton
                  onPress={HandleSubCategory2Cancel}
                  btnTitle={t("common:CANCEL")}
                  bgcolor={theme.colors.red[600]}
                  iconName={""}
                />
              </View>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
});

const styles = StyleSheet.create({
  sheetstyle: {
    backgroundColor: theme.colors.appWhite[800],
  },
  droptitle: {
    fontSize: 16,
    marginTop: 5,
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
    textTransform: "capitalize",
    fontWeight: "700",
  },
  block: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: theme.colors.black[0],
  },
  sublabel: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  search: {
    width: "90%",
  },
  list: {
    width: "90%",
    height: "70%",
    backgroundColor: theme.colors.appWhite[100],
    paddingVertical: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  listBtn: {
    paddingHorizontal: 5,
  },
  listBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listText: {
    fontSize: 16,
    color: theme.colors.darkBlue[700],
    paddingVertical: 7,
    textTransform: "capitalize",
  },
  addBtnBox: {
    width: "80%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  fullWidth: {
    width: "90%",
  },
});

export default SearchProductCategories;
