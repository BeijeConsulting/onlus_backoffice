// file: todos/todosReducer.ts noEmit
import { combineReducers } from '@reduxjs/toolkit'

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

import chronoDuck from './ducks/chronoDuck';



const reducer = combineReducers({
  // here we will be adding reducers

  chronoDuck
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batched subscribe, and devtools enhancers were composed together
