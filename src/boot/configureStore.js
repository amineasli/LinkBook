// @flow
import { AsyncStorage } from "react-native";
//import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers";



  const enhancer = compose(
    applyMiddleware(thunk),
    /*devTools({
      name: "flatapp",
      realtime: true
    })*/
  );

  const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    blacklist: ['favourites']
  };

  const persistReducerConst = persistReducer(persistConfig, rootReducer);
  
 //export const store = createStore(persistReducerConst, enhancer);
 export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);
  


