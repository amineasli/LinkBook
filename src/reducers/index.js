import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import loginReducer from "../screens/Login/reducer";
import barcodeReducer from "../screens/Barcode/reducer";
import bookReducer from "../screens/Book/reducer";
import googleCSEReducer from "../screens/GoogleCSE/reducer";
import youtubeVideosReducer from "../screens/YoutubeVideos/reducer";
import favouritesReducer from "../screens/Favourites/reducer";

export default combineReducers({
  form: formReducer,
  login: loginReducer,
  barcode: barcodeReducer,
  book: bookReducer,
  google: googleCSEReducer,
  youtube: youtubeVideosReducer,
  favourites: favouritesReducer
});
