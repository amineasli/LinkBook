const initialState = {
    items: [],
    favouritesHaveError: false,
    favouritesAreLoading: false
 };
 export default function(state: any = initialState, action: Function) {
     switch (action.type) {
       case "FAVOURITES_HAVE_ERROR":
         return { ...state, favouritesHaveError: action.favouritesHaveError };
       case "FAVOURITES_ARE_LOADING":
         return { ...state, favouritesAreLoading: action.favouritesAreLoading };
       case "ITEMS_FOUND":
         return { ...state, items: action.items };
       default:
         return state;
     }
 }