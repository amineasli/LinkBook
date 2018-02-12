const primary = require("../../theme/variables/commonColor").brandPrimary;

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  bookHeaderContainer: {
    padding: 20,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: primary
  },
  bookHeader: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "900",
    alignSelf: "center"
  },
  bookHead: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFF"
  },
  bookContent: {
    padding: 20,
    backgroundColor: "#FFF"
  },
  bookTopicsBox: {
    paddingBottom: 20
  },
  bookInfoHeader: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "900",
    color: "#000"
  },
  bookInfoPerc: {
    alignSelf: "flex-end",
    fontSize: 14,
    fontWeight: "900",
    color: "#000"
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  roundedButton: {
    marginTop: 7,
    height: 50
  },
};
