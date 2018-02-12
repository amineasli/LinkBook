// @flow
import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  Input,
  View,
  Toast,
  Left,
  Right,
  Footer
} from "native-base";
import { Field, reduxForm } from "redux-form";

import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

import { myFirebase } from '../../constants';

const required = value => (value ? undefined : "Required");
const minLength = min => value =>
  value && value.length < min ? `Doit être ${min} caractères ou plus` : undefined;
const minLength6 = minLength(6);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class SignUpForm extends Component {
  textInput: any;
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={
              input.name === "email" ? "mail" : "unlock"
            }
            style={{ color: "#fff" }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={
              input.name === "email" ? "Email" : "Mot de passe"
            }
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
          : <Text style={styles.formErrorText2}>> error here</Text>}
      </View>
    );
  }
  signUp() {
    if (this.props.valid) {
      this.props.navigation.goBack();
    } else {
      Toast.show({
        text: "All the fields are compulsory!",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  submit = values => {
    console.log('Values:', values);
    //console.log('Props:', this.props);
    if (this.props.valid) {
        const { email, password } = values;
        return myFirebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => { 
          user.sendEmailVerification().then(() => {
            console.log("Email Sent");
            Toast.show({
              text: 'Votre compte a été créé avec succès',
              position: "top",
              textStyle: { textAlign: "center" },
              buttonText: 'OK'
            });
            this.props.navigation.goBack();
          }).catch((error) => {
            Toast.show({
              text: 'Erreur lors de la création de votre compte',
              position: "top",
              textStyle: { textAlign: "center" },
              buttonText: 'OK'
            });
            console.log("Error:", error);
          });
        })
        .catch((error) => {
          Toast.show({
            text: 'Erreur lors de la création de votre compte',
            position: "top",
            textStyle: { textAlign: "center" },
            buttonText: 'OK'
          });
          console.log("Error:", error.message);
        });
    } 
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Container>
        <StatusBar
          backgroundColor={commonColor.statusBarColor}
          barStyle="light-content"
        />
        <Image
          source={require("../../../assets/bg-signup.png")}
          style={styles.background}
        >
          <Content padder>
            <Text style={styles.signupHeader}>CREATE ACCOUNT</Text>
            <View style={styles.signupContainer}>
         
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
                bordered
                block
                style={styles.signupBtn}
                onPress={handleSubmit(this.submit)}
                type="submit" 
                disabled={submitting}
              >
                <Text style={{ color: "#FFF" }}>Continue</Text>
              </Button>
            </View>
          </Content>
          <Footer
            style={{
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Left style={{ flex: 2 }}>
              <Button small transparent>
                <Text style={styles.helpBtns}>Terms & Conditions</Text>
              </Button>
            </Left>
            <Right style={{ flex: 1 }}>
              <Button
                small
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.helpBtns}>SignIn</Text>
              </Button>
            </Right>
          </Footer>
        </Image>
      </Container>
    );
  }
}

const SignUp = reduxForm({
  form: "signup"
})(SignUpForm);
export default SignUp;
