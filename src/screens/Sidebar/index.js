// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";

import { NavigationActions } from "react-navigation";
import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { connect } from "react-redux";

import styles from "./style";

import { signOut } from "../../actions";
class SideBar extends Component {
  
  constructor () {
    super();
  }

  componentDidMount(){
    console.log('IS_ANONYMOUS', this.props.isAnonymous);
    console.log('userInfo', this.props.userInfo);
  }

  logout = () => {
    this.props.signOut();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Image
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Home");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-grid-outline" />
              <Text style={styles.linkText}>HOME</Text>
            </ListItem>

            <ListItem
              button
              onPress={() => {
                navigation.navigate("Barcode");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-barcode-outline" />
              <Text style={styles.linkText}>SCAN</Text>
            </ListItem>
            
            {this.props.isAnonymous &&
              <ListItem
                button
                onPress={() => {
                  navigation.navigate("Login");
                }}
                iconLeft
                style={styles.links}
              >
                <Icon name="ios-log-in-outline" />
                <Text style={styles.linkText}>LOGIN</Text>
              </ListItem>
            }
            {!this.props.isAnonymous && 
              <ListItem
                button
                onPress={() => {
                  navigation.navigate("Settings");
                }}
                iconLeft
                style={styles.links}
              >
                <Icon name="ios-settings-outline" />
                <Text style={styles.linkText}>SETTINGS</Text>
              </ListItem>
            }
            {!this.props.isAnonymous && 
              <ListItem
                button
                onPress={() => {
                  navigation.navigate("Favourites");
                }}
                iconLeft
                style={styles.links}
              >
                <Icon name="ios-heart-outline" />
                <Text style={styles.linkText}>FAVORIS</Text>
              </ListItem>
            }

          </Content>
          {!this.props.isAnonymous && 
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      this.logout()
                    }}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      LOG OUT
                    </Text>
                    <Text note style={{ color: "#fff" }}>
                      {this.props.userInfo.email}
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                  >
                    <Thumbnail
                      source={require("../../../assets/Contacts/book.png")}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
          }
        </Image>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAnonymous: state.login.isAnonymous,
  userInfo: state.login.userInfo
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
