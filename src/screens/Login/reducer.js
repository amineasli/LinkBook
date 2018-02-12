const initialState = {
  isAnonymous: true,
  signedOut: false,
  signedOutHasErrored: false,
  userInfo: {},
  currentUserIsLoading: false
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "IS_ANONYMOUS":
      return { ...state, isAnonymous: action.isAnonymous };
    case "IS_SIGNED_OUT":
      return { ...state, signedOut: action.signedOut };
    case "SIGNOUT_HAS_ERRORED":
      return { ...state, signedOutHasErrored: action.signedOutHasErrored };
    case "USER_INFO":
      return { ...state, userInfo: action.userInfo };
    default:
      return state;
  }
}
