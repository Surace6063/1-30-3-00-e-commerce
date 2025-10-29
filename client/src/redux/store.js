import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import authReducer from "./authSlice"

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    auth : authReducer
})

const persisitedReuducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persisitedReuducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),

})

export const persistor = persistStore(store)