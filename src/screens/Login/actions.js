import { myFirebase } from "../../constants";

export function isAnonymous(bool: boolean) {
  return {
    type: "IS_ANONYMOUS",
    isAnonymous: bool
  };
}
export function isSignedOut(bool: boolean) {
  return {
    type: "IS_SIGNED_OUT",
    signedOut: bool
  };
}
export function signOutHasErrored(bool: boolean) {
  return {
    type: "SIGNOUT_HAS_ERRORED",
    signedOutHasErrored: bool
  };
}
export function userInfo(user: any) {
  return {
    type: "USER_INFO",
    userInfo: user
  }
}
export function setIsAnonymous(bool: boolean) {
  return dispatch => {
    if (bool) { 
      myFirebase.auth().signInAnonymously().then((user) => {
        console.log("Signed In as Anonymous");
        dispatch(isAnonymous(true));
      });
    } else {
      dispatch(isAnonymous(false));
    }
  };
}
export function setUserInfo(user) {
  return dispatch => {
      if (user) {
        dispatch(userInfo(user));
      } 
  }
}
export function signOut() {
  return dispatch => {
    myFirebase.auth().signOut().then(() => {
      console.log("Success SignOut");
      dispatch(isSignedOut(true));
    }).catch((error) => {
      console.log("Error SignOut");
      dispatch(signOutHasErrored(true));
    }); 
  };
}

