import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import categoryReducer from "./categorySlice/categorySlice";
import blogReducer from "./blogSlice/blogSlice";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  category: categoryReducer,
  blogs: blogReducer,
});
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
