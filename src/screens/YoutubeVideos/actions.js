export function setYoutubeResults(bool: boolean, results) {
    return {
        type: "YOUTUBE_RESULTS_FETCHED",
        found: bool,
        results: results
    }
}
export function youtubeHasError(bool: boolean) {
    return {
        type: "YOUTUBE_HAS_ERROR",
        hasError: bool
    }
}
export function youtubeIsLoading(bool : boolean) {
    return {
        type: "YOUTUBE_IS_LOADING",
        isLoading: bool
    }
}
export function requestYoutube(url: string) {
    console.log('requestYoutube', url);
    return dispatch => { 
        dispatch(youtubeIsLoading(true));
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            if (typeof responseJson.items !== 'undefined' ) {
                console.log("PAGEINFO", responseJson.pageInfo);
                if (responseJson.pageInfo.totalResults > 0)  {
                    console.log('FOUND RESULTS');
                    dispatch(setYoutubeResults(true, responseJson));
                } else {
                    console.log('NOT FOUND RESULTS');
                    dispatch(setYoutubeResults(false, responseJson));
                }	  
            } else {
                //console.log('Error', responseJson);
                 dispatch(youtubeHasError(true));				
            }			   
            dispatch(youtubeIsLoading(false));
        })
    }
}
