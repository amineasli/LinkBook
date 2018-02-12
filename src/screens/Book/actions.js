import { myFirebase } from "../../constants";

export function setBook(book: any, bool: boolean) {
    return {
        type: "BOOK_FOUND",
        book: book,
        found: bool        
    }
}
export function setFoundInFavorites(bool: boolean, key: string) {
    return {
        type: "BARCODE_FOUND",
        foundInFavorites: bool,
        iTemKey: key       
    }
}
export function errorHasOccurred(bool: boolean) {
    return {
        type: "HAS_ERROR",
        hasError: bool
    }
  
}
export function isLoading(bool : boolean) {
    return {
        type: "IS_LOADING",
        isLoading: bool
    }
}
export function setGoogleCSEType(searchType: string) {
    return {
        type: "SEARCH_TYPE",
        searchType: searchType
    }
}
export function setYoutubeVideosType(youtubeType: string) {
    return {
        type: "YOUTUBE_TYPE",
        youtubeType: youtubeType
    }
}
export function fetchBook(barcode: string) {
    return dispatch => {
        dispatch(isLoading(true));
        console.log("FetchBook", barcode);
        console.log("FetchBook", barcode.length);
        let barcodeType = "";
        if (barcode.length == 10) {
			barcodeType = "isbn";
		} else { 
			barcodeType = "ean";
		}
        
        myFirebase.database().ref("books").orderByChild(barcodeType).equalTo(barcode).on("value", (snapshot) => {
            let book = {};
            if (snapshot.exists()) {	
                    snapshot.forEach( (childSnapshot) => {
                    book = childSnapshot.val();
                    console.log(book);
                    dispatch(setBook(book, true));
                });
            } else {
                    dispatch(setBook(book, false));
                    console.log("Book not found");
            }	
            
            dispatch(isLoading(false));
        }, (errorObject) => {
            console.log("ERROR", errorObject);
            dispatch(errorHasOccurred(true));
            dispatch(isLoading(false));
        });
    }    
}

export function googleCSE(searchType: string) {
    return dispatch => {
        if (searchType) {
            console.log(searchType);
            dispatch(setGoogleCSEType(searchType));
        }
    }
}

export function youtubeVideos(youtubeType: string) {
    return dispatch => {
        if (youtubeType) {
            console.log(youtubeType);
            dispatch(setYoutubeVideosType(youtubeType));
        }
    }
}

export function fetchFavorites(uid: string, barcode: string) {
    return dispatch => {
        myFirebase.database().ref('/favorites/' + uid).orderByChild('barcode').equalTo(barcode).on("value", (snapshot) => {
			if (snapshot.exists()) {	
					    key = Object.keys(snapshot.val())[0];
						console.log(key);
                        console.log("ITEM FOUND");
                        dispatch(setFoundInFavorites(true, key));
			} else {
                        console.log("ITEM NOT FOUND");
                        dispatch(setFoundInFavorites(false, ''));
			}	
		}, (errorObject) => {
		  console.log("The read failed: " + errorObject.message);
		  
		});	
    }
}
export function doAddToFavorites(uid: string, barcode: string, book: Object, img: string){
    return dispatch => {
        favoriteBook = {
            //timestamp: Date.now(),
            barcode: barcode,
            title: book.title.trim(),
            author: book.author.trim(),
            imgUrl: img
        };
    
        favoriteListRef = myFirebase.database().ref('/favorites/' + uid);
        newFavoriteRef = favoriteListRef.push();
        newFavoriteRef.set(favoriteBook).then(() => {
            dispatch(setFoundInFavorites(true, newFavoriteRef.getKey()));
        }).catch((error) => {
            console.log("Error: " + error.message);
        });	
        console.log(uid, barcode, book, img);
    }
}

export function doRemoveFromFavorites(uid: string, key: string) {
    return dispatch => {
        myFirebase.database().ref('/favorites/' + uid + '/' + key).remove()
		  .then(() => {
		        /*Toast.show({
					  text: 'Le livre a bien été retiré des favoris',
					  position: 'bottom',
					  duration: 3000
                });*/
                
                console.log('REMOVED', '/favorites/' + uid + '/' + key);
                dispatch(setFoundInFavorites(false, ''));
		  })
		  .catch(function(error) {
			console.log("Remove failed: " + error.message);
		  });	
    }
}