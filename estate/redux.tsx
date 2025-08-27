import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import globalReducer from "../estate/src/state/api"; 
import { api } from "../estate/src/state/api";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// PERSIST CONFIG
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"], 
};

// COMBINED REDUCERS
const rootReducer = combineReducers({
//   global: globalReducer,
  [api.reducerPath]: api.reducer,
});

// PERSISTED REDUCER
const persistedReducer = persistReducer(persistConfig, rootReducer);

// STORE
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

// PERSISTOR
export const persistor = persistStore(store);

// TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
