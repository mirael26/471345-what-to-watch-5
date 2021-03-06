import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {ActionCreator} from "./store/action";
import {fetchFilmsList, checkAuth} from "./store/api-actions";
import {AuthorizationStatus} from "./const";
import {redirect} from "./store/middlewares/redirect";
import rootReducer from "./store/reducers/root-reducer";
import App from "./components/app/app";

const api = createAPI(
    () => store.dispatch(ActionCreator.updateAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

Promise.all([
  store.dispatch(fetchFilmsList()),
  store.dispatch(checkAuth()),
])
.then(() => store.dispatch(ActionCreator.getGenresList()))
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />,
      </Provider>,
      document.querySelector(`#root`)
  );
});


