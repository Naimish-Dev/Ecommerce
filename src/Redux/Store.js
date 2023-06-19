import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartrSlice from "./CartSlice";
import UserSlice from "./UserSlice";
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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducer = combineReducers({ cart: cartrSlice, user: UserSlice });

const persistedReducer = persistReducer(persistConfig, reducer);


const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default Store;
export let persistor = persistStore(Store);
