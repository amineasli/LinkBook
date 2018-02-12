// @flow
var Color = require("color");
import React, { Component } from "react";
import { Image, Switch, TouchableOpacity, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Thumbnail,
  Item,
  View,
  Left,
  Right,
  Body,
  Input,
  Toast
} from "native-base";
import { connect } from "react-redux";
import { Field, reduxForm, initialize } from "redux-form";
import { Grid, Col } from "react-native-easy-grid";
import Modal from "react-native-modalbox";

import styles from "./styles";
import { myFirebase } from "../../constants";

const headerLogo = require("../../../assets/header-logo.png");
const primary = require("../../theme/variables/commonColor").brandPrimary;
const light = Color(primary).alpha(0.3);

type Props = {
  navigation: () => void
};

const required = value => (value ? undefined : "Champ obligatoire");
/*const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined; 
const maxLength15 = maxLength(15);*/
const minLength = min => value =>
  value && value.length < min ? `Doit être ${min} caractères ou plus` : undefined;
const minLength6 = minLength(6);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Adresse email invalide"
    : undefined;

class Settings extends Component {
  state: {
    monSwitch: true,
    offset: {
      x: 0,
      y: 0,
    },
    open: false
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      monSwitch: true,
      offset: {
        x: 0,
        y: 0
      },
      open: false
    };
  }
  componentDidMount() {
    const initialFormData = {
      email: this.props.userInfo.email
    }

    this.props.dispatch(initialize('settings', initialFormData))
  }

  modalO() {
    this.setState({ open: true });
  }

  modalX() {
    this.setState({ open: false });
  }

renderInput =  ({ input, label, type, meta: { touched, error, warning } }) => (
    //console.log('Settings userInfo', this.props.userInfo);

      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={input.name === "email" ? "ios-mail-open-outline" : "ios-unlock-outline"}
            style={{ color: "#fff" }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="rgba(255,255,255,0.6)"
            style={styles.input}
            placeholder={input.name === "password" || input.name === "passwordConfirmation"  ? "Mot de passe" : ""}
            secureTextEntry={input.name === "password" || input.name === "passwordConfirmation" ? true : false}
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
);
  
//BUGGGGEDD!!
submit = values => { 
    if (this.props.valid) {
        const { email, password, passwordConfirmation } = values;
        console.log(email, password, passwordConfirmation);
        user = this.props.userInfo;
        emailSuccess = false;
        passwordSuccess = false ;
        msg = '';

        if (email !== user.email || password != undefined ) {
          
          return myFirebase.auth().signInWithEmailAndPassword(user.email, passwordConfirmation).then((user) => {
            if (email !== user.email) {
              user.updateEmail(email).then(() => {
                console.log('Update successful');
                emailSuccess = true;
              }).catch((error) => {
                console.log('Error Mise a jour Email', error);
                Toast.show({
                  text: "Erreur de mise a jour d'Email",
                  //duration: 3000,
                  position: "top",
                  textStyle: { textAlign: "center" },
                  buttonText: 'OK'
                });
                return;
              }); 
            }
            
            if(password != undefined){
              user.updatePassword(password).then(() => {
                console.log('Update Password successful');
                passwordSuccess = true;
              }).catch((error) => {
                console.log('Error Mise a jour Password ', error);
                Toast.show({
                  text: "Erreur de mise a jour mot de passe",
                  //duration: 3000,
                  position: "top",
                  textStyle: { textAlign: "center" },
                  buttonText: 'OK'
                });
              });
            }

            this.showMsg(emailSuccess, passwordSuccess);

          }).catch((error) => {
            console.log('Error Login/Pass', error);
            Toast.show({
              text: "Erreur Login/mot de passe",
              //duration: 3000,
              position: "top",
              textStyle: { textAlign: "center" },
              buttonText: 'OK'
            });
          });
        }
    } 
}
//BUGGGGEDD!!
showMsg(emailSuccess, passwordSuccess ) {
  msg = '';
  if (emailSuccess && passwordSuccess) {
    msg = "Email/Password updated successfully"
  } else {
    if (emailSuccess) {
      msg = "Email updated successfully"
    } else if (passwordSuccess) {
      msg = "Password updated successfully"
    }
  }

  Toast.show({
    text: msg,
    //duration: 3000,
    position: "top",
    textStyle: { textAlign: "center" },
    buttonText: 'OK'
  });
  //this.props.signOut();
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Login" })]
  });
  this.props.navigation.dispatch(resetAction);
  
}

textInput: Any;

render() {
    const navigation = this.props.navigation;
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      
      <Container>
        
        <Header 
         style={[
          styles.headerStyle,
          this.state.open ? styles.headerModalStyle : styles.headerStyle
        ]}
        hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>
          </Left> 
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right>  
            <Button transparent onPress={() => this.modalO()}>
              <Text style={styles.headerTextIcon}>Mettre à jour</Text>
            </Button>
          </Right>
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.signupHeader}>SETTINGS</Text>
            <View style={styles.profileButtons}>
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <Thumbnail
                  source={require("../../../assets/Contacts/book.png")}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bg}>
            <View style={styles.signupContainer}>
                  <Field
                    name="email"
                    component={this.renderInput}
                    type="email"
                    validate={[email]}
                  />
                  <Field
                    name="password"
                    component={this.renderInput}
                    type="password"
                    validate={[minLength6]}
                  />
            </View>
          </View>
          <View style={styles.notificationSwitchContainer}>
            <Text style={styles.notificationHeader}>AUTRES</Text>
            <View>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    NewsLetter
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ monSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.monSwitch}
                  />
                </Col>
              </Grid>
            </View>
          </View>
        </Content>

        <Modal
          position="top"
          entry="top"
          isOpen={this.state.open}
          onOpened={() => this.setState({ open: true })}
          onClosed={() => this.setState({ open: false })}
          backButtonClose
          style={styles.modal}
        >
          <View>
            <View style={styles.modalContentBox}>
              <Grid style={{ flex: 10, padding: 20 }}>
                <Col>
                <Field
                  name="passwordConfirmation"
                  component={this.renderInput}
                  type="password"
                  validate={[minLength6, required]}
                />
                </Col>
                <Col>
                  <Button 
                    style={styles.roundedButton}
                    onPress={handleSubmit(this.submit)}
                    type="submit" 
                    disabled={pristine || submitting}
                  >
                    <Text>OK</Text>
                  </Button>
                </Col>
              </Grid>
            </View>
          </View>
        </Modal>

      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.login.userInfo
});

SettingsComponent = connect(
  mapStateToProps
)(Settings);

export default reduxForm({
  form: 'settings' // a unique name for this form
})(SettingsComponent);

