export {
  isAnonymous,
  setIsAnonymous,
  isSignedOut,
  signOutHasErrored,
  signOut,
  setUserInfo,
  userInfo
} from "../screens/Login/actions";

export {
  captureBarcode,
  setBarcode
} from "../screens/Barcode/actions";

export {
  fetchBook,
  fetchFavorites,
  doAddToFavorites,
  doRemoveFromFavorites,
  isLoading,
  errorHasOccurred,
  setBook,
  googleCSE,
  setGoogleCSEType,
  youtubeVideos
} from "../screens/Book/actions";

export {
  setResults,
  gseHasError,
  gseIsLoading,
  requestGoogleCSE,
  openUrl,
  setUrl
} from "../screens/GoogleCSE/actions";

export {
  setYoutubeResults,
  youtubeHasError,
  youtubeIsLoading,
  requestYoutube
} from "../screens/YoutubeVideos/actions";

export {
  fetchFavoritesList,
  setItems,
  setFavouritesAreLoading,
  setFavouritesHaveError,
  deleteItem
} from "../screens/Favourites/actions";