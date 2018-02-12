import { myFirebase } from "../../constants";

export function setFavouritesHaveError(bool: boolean) {
    return {
        type: "FAVOURITES_HAVE_ERROR",
        favouritesHaveError: bool
    }
}

export function setFavouritesAreLoading(bool : boolean) {
    return {
        type: "FAVOURITES_ARE_LOADING",
        favouritesAreLoading: bool
    }
}

export function setItems(items: Array) {
    return {
        type: "ITEMS_FOUND",
        items: items
    }
}

export function fetchFavoritesList(uid: string) {
   
    return dispatch => {
        dispatch(setFavouritesAreLoading(true));
        myFirebase.database().ref('/favorites/' + uid).orderByChild('barcode').on("value", (snapshot) => {
            items = [];
			if (snapshot.exists()) {
                                
				snapshot.forEach((childSnapshot) => {
					  // childData will be the actual contents of the child
					  //console.log('I is :', i);
					  childData = childSnapshot.val();
					  childData.key = childSnapshot.key;
					  items.push(childData)
					
                });
                  
                console.log('ITEMS', items);
                items = items.reverse();
            } 
            dispatch(setItems(items));
            dispatch(setFavouritesAreLoading(false));
            
		}, (errorObject) => {
            dispatch(setFavouritesAreLoading(false));
			console.log("The read failed: " + errorObject.message);
		});		
    }
}

export function deleteItem(uid: string, key: string){
    return dispatch => {
        myFirebase.database().ref('/favorites/' + uid + '/' + key).remove()
        .then(() => {
            console.log('ID', key, 'removed');
        })
        .catch(function(error) {
        console.log("Remove failed: " + error.message);
        });
    }
}