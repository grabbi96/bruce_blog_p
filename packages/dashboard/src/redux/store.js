import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';
import { configureStore } from '@reduxjs/toolkit';
// (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk.withExtraArgument()))
// );

export const store = configureStore({
  reducer: rootReducer,
});
export default store;
