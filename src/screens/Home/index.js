// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView } from "react-native";

import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  ListItem,
  Button,
  Icon
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import CustomHeader from "../../components/CustomHeader";
import { connect } from "react-redux";

import styles from "./styles";

type Props = {
  navigation: () => void
};
class Home extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Image
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >
          <CustomHeader hasTabs navigation={navigation} />

          <View style={styles.profileInfoContainer}>
            <View style={{ alignSelf: "center" }}>
              <Thumbnail
                source={require("../../../assets/Contacts/book.png")}
                style={styles.profilePic}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileUser}>Welcome</Text>
              <Text note style={styles.profileUserInfo}>
               { this.props.userInfo.email || 'Guest'}
              </Text>
            </View>
          </View>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
          >

         
              <View style={styles.linkTabs}>
               
                </View>
              
          </Content>
        </Image>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAnonymous: state.login.isAnonymous,
  userInfo: state.login.userInfo
});

export default connect(mapStateToProps)(Home);