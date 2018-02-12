export function setResults(bool: boolean, results) {
    return {
        type: "RESULTS_FETCHED",
        found: bool,
        results: results
    }
}
export function gseHasError(bool: boolean) {
    return {
        type: "HAS_ERROR",
        hasError: bool
    }
}
export function gseIsLoading(bool : boolean) {
    return {
        type: "IS_LOADING",
        isLoading: bool
    }
}
export function setUrl(url: string) {
    return {
        type: "OPEN_URL",
        url: url
    }
}

export function requestGoogleCSE(url: string) {
    console.log(url);
    return dispatch => { 
        dispatch(gseIsLoading(true));
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            if (typeof responseJson.queries !== 'undefined' ) {
                if (responseJson.queries.request[0].totalResults > 0)  {
                    console.log('FOUND RESULTS');
                    dispatch(setResults(true, responseJson));
                } else {
                    console.log('NOT FOUND RESULTS');
                    dispatch(setResults(false, responseJson));
                }	  
            } else {
                 dispatch(gseHasError(true));				
            }			   
            dispatch(gseIsLoading(false));
        })
    }
}

export function openUrl(url: string) {
    return dispatch => {
        dispatch(setUrl(url));
    }
}