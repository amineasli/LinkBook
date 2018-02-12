const initialState = {
    results: [],
    isLoading: false,
    hasError: false,
    url : '',
    found: false
};
export default function(state: any = initialState, action: Function) {
    switch (action.type) {
        case "RESULTS_FETCHED":
            return { ...state, found: action.found, results: action.results };
        case "IS_LOADING":
            return { ...state, isLoading: action.isLoading };
        case "HAS_ERROR":
            return { ...state, hasError: action.hasError };
        case "OPEN_URL":
            return { ...state, url: action.url };
        default:
            return state;
    }
}