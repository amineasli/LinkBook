// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Sidebar from "./screens/Sidebar";
import Login from "./screens/Login/";
import Home from "./screens/Home/";
import ForgotPassword from "./screens/ForgotPassword";
import SignUp from "./screens/SignUp/"; 
//import Profile from "./screens/Profile/";
import Barcode from "./screens/Barcode/";
import Book from "./screens/Book/";
import GoogleCSE from "./screens/GoogleCSE";
import MyWeb from "./screens/MyWeb";
import YoutubeVideos from "./screens/YoutubeVideos";
import Favourites from "./screens/Favourites";
// import Feedback from "./screens/Feedback/";

import Settings from "./screens/Settings";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home }, 
    //Profile: { screen: Profile },
    // Feedback: { screen: Feedback },
     Settings: { screen: Settings },
     Barcode: { screen: Barcode }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Sidebar {...props} />
  }
);

const App = StackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    Favourites: { screen: Favourites },
    Book: { screen: Book },
    GoogleCSE: { screen: GoogleCSE },
    MyWeb: { screen: MyWeb },
    YoutubeVideos: { screen: YoutubeVideos },
    Drawer: { screen: Drawer }
  },
  {
    index: 0,
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;
