import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router/immutable";
import { createBrowserHistory } from "history";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

export default function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};
  if (ENVIRONMENT !== "production" && typeof window === "object") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: "Redux",
        realtime: true,
        trace: true,
        traceLimit: 25,
      });
    }
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const routerMiddleware = createRouterMiddleware(history);
  const middlewares = [sagaMiddleware, routerMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
