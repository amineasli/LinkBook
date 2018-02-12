
const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceWidth = Dimensions.get("window").width;
const commonColor = require("../../theme/variables/commonColor");

export default {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  input: {
   //width: deviceWidth,
    paddingLeft: 20,
    paddingRight: 20
  },
  roundedButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    width: 60,
    height: 60
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#2874F0',
    backgroundColor: 'transparent',
  },
  inputGrp: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 8,
    borderWidth: 0,
    borderColor: "transparent"
  },
  formErrorIcon: {
    color: "#fff",
    marginTop: 5,
    right: 10
  },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: commonColor.brandDanger,
    textAlign: "right",
    top: -10
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right",
    top: -10
  },
};
