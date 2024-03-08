import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Actionsheet, Box } from "native-base";
import { theme } from "../../theme";
import { SubTitle } from "../Typography/index";
import {
  FONT_GOOGLE_BARLOW_REGULAR as FONT_GOOGLE_BARLOW,
  FONT_GOOGLE_BARLOW_SEMIBOLD,
} from "../../constants/fonts";


interface IProps {
  label: string;
  color: string;
  list: any;
  value: string;
  id: string;
  onSelect: (text: string) => void;
  onIdSelect: (text: string) => void;
  err?: string;
}

function AddProfileState(props: IProps) {
  const {
    label,
    color,
    list,
    value,
    id,
    onSelect,
    onIdSelect,
    err,
  } = props;
  const [showSheet, setShowSheet] = useState(false);

  function HandleMasterSelect(item: string, index: any) {
    onSelect(item);
    onIdSelect(index);
    setShowSheet(false);

  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setShowSheet(true)}>
        <View>
          <SubTitle
            style={[styles.droptitle, { marginLeft: 10, color: color }]}
          >{label}</SubTitle>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: err ? err : theme.colors.gray[800],
              marginLeft: 5,
            }}
          >
            <SubTitle style={[styles.drop]}>
              <Text style={styles.selected}>{value}</Text>
            </SubTitle>
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
              <View style={styles.list}>
                <ScrollView
                  contentContainerStyle={{ width: 300, alignItems: "center" }}
                  showsVerticalScrollIndicator={false}
                >
                  {list &&
                    list.map((item: any, index: any) => {
                      return item !== "" ? (
                        <View key={index} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5 }}>
                          <TouchableOpacity style={[styles.listBtn,]}
                            onPress={() => { HandleMasterSelect(item.title, item.id) }}
                          >
                            <View style={styles.listBlock}>
                              <SubTitle style={styles.listText}>{item.title}</SubTitle>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null;
                    })}
                </ScrollView>
              </View>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}

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
    height: "95%",
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
    fontSize: 20,
    color: theme.colors.black[700],
    fontWeight: "500",

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
  addinput: {
    borderWidth: 1,
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
    color: theme.colors.darkBlue[700],
    fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
  },
  plusBtn: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 360,
    backgroundColor: theme.colors.skyblue[200],
  },
});

export default AddProfileState;
