const initialState = {
    results: [],
    isLoading: false,
    hasError: false,
    videoId : ''
};
export default function(state: any = initialState, action: Function) {
    switch (action.type) {
        case "YOUTUBE_RESULTS_FETCHED":
            return { ...state, found: action.found, results: action.results };
        case "YOUTUBE_IS_LOADING":
            return { ...state, isLoading: action.isLoading };
        case "YOUTUBE_HAS_ERROR":
            return { ...state, hasError: action.hasError };
        default:
            return state;
    }
}