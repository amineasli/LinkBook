const initialState = {
   book: {},
   found: false,
   foundInFavorites: false,
   iTemKey: '',
   isLoading: true,
   hasError: false,
   searchType: '',
   youtubeType: ''
};
export default function(state: any = initialState, action: Function) {
    switch (action.type) {
      case "BOOK_FOUND":
        return { ...state, book: action.book, found: action.found };
      case "HAS_ERROR":
        return { ...state, hasError: action.hasError };
      case "IS_LOADING":
        return { ...state, isLoading: action.isLoading };
      case "SEARCH_TYPE":
        return { ...state, searchType: action.searchType };
      case "YOUTUBE_TYPE":
        return { ...state, youtubeType: action.youtubeType };
      case "BARCODE_FOUND":
        return { ...state, foundInFavorites: action.foundInFavorites, iTemKey: action.iTemKey };
      default:
        return state;
    }
}