const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const primary = require("../../theme/variables/commonColor").brandPrimary;

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  newsContent: {
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  newsHeader: {
    color: "#444",
    fontWeight: "bold"
  },
  newsLink: {
    color: "#666",
    fontSize: 9,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    alignSelf: "flex-end"
  },
  newsTypeText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 5
  },
  textNote: {
    color: "#777",
    fontSize: 12
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  newsImage: {
    width: 100,
    height: 120
  },
};
