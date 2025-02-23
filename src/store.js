import { createStore, combineReducers } from 'redux';
import messageReducer from './reducers/messageReducer';
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  messages: messageReducer,
  theme: themeReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
