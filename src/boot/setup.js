import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Spinner } from "native-base";

import App from "../App";
import { persistor, store }  from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
  
  constructor() {
    super();
    //persistor.purge();
  }

  render() {
    /*return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          <PersistGate loading={<Spinner color='blue' />} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </StyleProvider>
    );*/
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
            <App />
        </Provider>
      </StyleProvider>
    );
  }
}
