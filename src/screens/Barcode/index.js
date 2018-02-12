import React from 'react';
import { View, StyleSheet, Alert, Vibration } from 'react-native';
import { Icon, Button, Form, Input, Text, Item } from 'native-base'; 
import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { Col, Row, Grid } from "react-native-easy-grid";

import { captureBarcode, setBarcode } from "../../actions";
import styles from "./styles";

declare type Any = any;
const required = value => (value ? undefined : "Champ obligatoire");

const barcodeLength = value => {
  return (value.replace(/[^0-9]/g, "").length == 10 
    || value.replace(/[^0-9]/g, "").length == 13 ?  undefined : 'Error');
}

class Barcode extends React.Component {

  constructor(props) {
      super(props);
        this.state = {
		    	cameraActive: true
      }
		  this.handleBarCodeRead = this.handleBarCodeRead.bind(this);
	  	console.log("in constructor");
  }

	static navigationOptions = {
		 headerMode: 'none',
		 header: null 
  }

  componentDidMount() {
   // this.navigateToBook('9782818500996');
  }
	
	componentDidUmount() {
		this.handleBarCodeRead = null;
		console.log('Did UnMount');
  }
  
	handleBarCodeRead(data){
		
    //console.log(data.data);
    barcode = data.data.replace(/[^0-9]/g, "");
		Vibration.vibrate(500);
    this.navigateToBook(barcode);
		 
		//this.props.navigation.navigate('Book', { barcode: data.data });
  }
  
  navigateToBook(barcode) {

    this.handleBarCodeRead = null;
		this.setState({cameraActive: false});
    this.props.captureBarcode(barcode);

    const resetAction = NavigationActions.reset({
		  index: 1,
		  actions: [
			NavigationActions.navigate({ routeName: 'Drawer'}),
			//NavigationActions.navigate({ routeName: 'Barcode'}),
			NavigationActions.navigate({ routeName: 'Book'})
		  ]
		});
		this.props.navigation.dispatch(resetAction);
  }

  submit = value => {
    if (this.props.valid) {
     barcode = value.barcode.replace(/[^0-9]/g, "");
     console.log('Submit', barcode);
     this.navigateToBook(barcode);
    } 
  }

  textInput: Any;
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon active name="barcode" style={{ color: "#fff" }} />
          <Input
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Code-barre"
            {...input}
            ref={c => (this.textInput = c)}
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

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

      if (this.state.cameraActive) {
          return (
            <Grid>
                <Row size={85}>
                  <Camera
                        style={styles.preview}
                        onBarCodeRead={this.handleBarCodeRead}
                        ref="camera"
                        aspect={Camera.constants.Aspect.fill}
                        barCodeTypes={['ean13', 'qr']}
                    >
                    <View style={styles.rectangleContainer}>
                      <View style={styles.rectangle}/>
                    </View>
                    </Camera>
                </Row>
                <Row size={15}> 
                    <Grid style={{ flex: 10, padding: 20 }}>
                      <Col size={80}> 
                        <Field 	
                            name="barcode"
                            style={styles.input}
                            placeholder={'Code-barre'}
                            component={this.renderInput}
                            type="text"
                            keyboardType={'numeric'}
                            validate={[required, barcodeLength]}
                        />
                      </Col>
                      <Col size={20}> 
                      <Button style={styles.roundedButton} 
                        onPress={handleSubmit(this.submit)}
                        type="submit" 
                        disabled={submitting}
                        component={this.renderInput}
                      >	
                            <Text>OK</Text>
                      </Button>
                      </Col>
                  </Grid>
                </Row>
                
            </Grid>
          );
    } else {
        return null;
    }	  	  
  }

}

const mapStateToProps = (state) => ({
  barcode: state.barcode.barcode,
});

function mapDispatchToProps(dispatch) {
  return {
    captureBarcode: barcode => dispatch(captureBarcode(barcode))
  };
}

BarcodeComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Barcode);

export default reduxForm({
  form: 'barcode' // a unique name for this form
})(BarcodeComponent);