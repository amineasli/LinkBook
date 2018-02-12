// @flow
import React, { Component } from "react";
import { Image, Platform, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Toast,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { myFirebase } from "../../constants";
import { setIsAnonymous, setUserInfo, currentUserIsLoading } from "../../actions";

import styles from "./styles";
// import commonColor from "../../theme/variables/commonColor";

const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/logo.png");

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
/*const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;*/

declare type Any = any;
class LoginForm extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Se connecter'
  });

  textInput: Any;

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={input.name === "email" ? "mail" : "unlock"}
            style={{ color: "#fff" }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={input.name === "email" ? "Email" : "Mot de passe"}
            secureTextEntry={input.name === "password" ? true : false}
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
  }
  
submit = values => {
  if (this.props.valid) {
      const { email, password } = values;
      return myFirebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {     
        console.log("YES Connected");
        this.props.setIsAnonymous(false);
        this.props.setUserInfo(user);
        console.log("USER", user);
        console.log('LOGIN IS_ANONYMOUS', this.props.isAnonymous);
        console.log('LOGIN USER_INFO', this.props.userInfo);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log("Connection failed");
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

skip = () => {
  this.props.setIsAnonymous(true);
  this.props.navigation.navigate('Home');
}

render() {
      console.log("STATE", this.state);
      const navigation = this.props.navigation;
      //console.log('Props', this.props);
      const { handleSubmit, pristine, reset, submitting } = this.props;  
      return (
        <Container>
          <StatusBar barStyle="light-content" />
          <Image source={bg} style={styles.background}>
            <Content contentContainerStyle={{ flex: 1 }}>
              <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
              </View>
              <View style={styles.container}>
                <View style={styles.form}>
                  <Field
                    name="email"
                    component={this.renderInput}
                    type="email"
                    validate={[email, required]}
                  />
                  <Field
                    name="password"
                    component={this.renderInput}
                    type="password"
                    validate={[minLength6, required]}
                  />

                  <Button
                    rounded
                    primary
                    block
                    large
                    style={styles.loginBtn}
                    onPress={handleSubmit(this.submit)}
                    type="submit" 
                    disabled={submitting}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? { fontSize: 16, textAlign: "center", top: -5 }
                          : { fontSize: 16, fontWeight: "900" }
                      }
                    >
                      Se connecter
                    </Text>
                  </Button>

                  <View style={styles.otherLinksContainer}>
                    <Left>
                      <Button
                        small
                        transparent
                        style={{ alignSelf: "flex-start" }}
                        onPress={() => navigation.navigate("SignUp")}
                      >
                        <Text style={styles.helpBtns}>Create Account</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Button
                        small
                        transparent
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => navigation.navigate("ForgotPassword")}
                      >
                        <Text style={styles.helpBtns}>Forgot Password</Text>
                      </Button>
                    </Right>
                  </View>
                  <View style={{ flex: 1, alignSelf: "flex-end" }}>
                    <Button
                      light
                      small
                      transparent
                      style={styles.skipBtn}
                      onPress={() => this.skip()}
                    >
                      <Text
                        style={
                          (
                            [styles.helpBtns],
                            { top: Platform.OS === "ios" ? null : 0 }
                          )
                        }
                      >
                        Skip
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Content>
          </Image>
        </Container>
      );
    }
}

/* const Login = reduxForm({
  form: "login"
})(LoginForm);
export default Login;*/

const mapStateToProps = (state) => ({
  isAnonymous: state.login.isAnonymous,
  userInfo: state.login.userInfo,
  currentUserIsLoading: state.login.currentUserIsLoading
});

function mapDispatchToProps(dispatch) {
  return {
    setIsAnonymous: bool => dispatch(setIsAnonymous(bool)),
    setUserInfo: user => dispatch(setUserInfo(user)),
    setCurrentUserIsLoading: bool => dispatch(setCurrentUserIsLoading(bool))
  };
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default reduxForm({
  form: 'login' // a unique name for this form
})(Login);