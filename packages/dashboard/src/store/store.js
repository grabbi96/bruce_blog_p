import rootReducer from "./reducers/rootReducer";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

// export default { store, persistor };
