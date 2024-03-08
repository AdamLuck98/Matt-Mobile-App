import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import { navTheme } from "../theme";
import UnSplash from "../screens/Auth/UnSplash";
import DrawerMenu from "./DrawerMenu";
import useUserInfo from "../hooks/useUserInfo";
import { navigationRef } from "./navigationRef";
import LanguageSelectorScreen from "../screens/LanguageSelectorScreen";
import AddProduct from "../screens/AddProduct";
import ProfileScreen from "../screens/Profile";
import OrdersList from "../screens/OrdersList/index";
import Search from "../screens/SererchProduct";
import OrderProductDetail from "../screens/OrdersList/Component/OrderProductDetail";
import EditScreen from "../screens/EditScreen";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import Homescreen from "../screens/Home";
import OrderList from "../screens/OrdersList/Component/OrderList";
import Allocation from "../screens/SererchProduct/components/Allocation";
import Thislocation from "../screens/SererchProduct/components/ThisLocation";
import OutStock from "../screens/SererchProduct/components/OutStock";
import CreateBarcode from "../screens/Barcode/index";
import ImageCropperPage from "../../src/components/Avatar/Rotator";

export type RootStackParamList = {
  Login: undefined;
  UnSplash: undefined;
  Home: undefined;
  DrawerMenu: undefined;
  LanguageSelectorScreen: undefined;
  AddProduct: undefined;
  ProfileScreen: undefined;
  OrdersList: undefined;
  OrderProductDetail: undefined;
  SearchProduct: undefined;
  EditScreen: undefined;
  OrderList: undefined;
  OrderDetails: undefined;
  ForgetPassword: undefined;
  Allocation: undefined;
  Thislocation: undefined;
  OutStock: undefined;
  CreateBarcode: undefined;
  ImageCropperPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

function NavContainer() {
  const { isLoggedIn } = useUserInfo();

  return (
    <NavigationContainer independent ref={navigationRef} theme={navTheme}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              component={LanguageSelectorScreen}
              name="LanguageSelectorScreen"
            />
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={ForgetPassword} name="ForgetPassword" />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen component={UnSplash} name="UnSplash" />
            <Stack.Screen component={DrawerMenu} name="DrawerMenu" />
            <Stack.Screen component={Homescreen} name="Home" />
            <Stack.Screen component={AddProduct} name="AddProduct" />
            <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
            <Stack.Screen component={OrdersList} name="OrdersList" />
            <Stack.Screen component={Search} name="SearchProduct" />
            <Stack.Screen
              component={OrderProductDetail}
              name="OrderProductDetail"
            />
            <Stack.Screen component={EditScreen} name="EditScreen" />
            <Stack.Screen component={OrderList} name="OrderList" />
            <Stack.Screen component={Allocation} name="Allocation" />
            <Stack.Screen component={Thislocation} name="Thislocation" />
            <Stack.Screen component={CreateBarcode} name="CreateBarcode" />
            <Stack.Screen
              component={ImageCropperPage}
              name="ImageCropperPage"
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
