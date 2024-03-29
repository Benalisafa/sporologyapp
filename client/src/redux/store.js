import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth.reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  storage,
}



const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer.reducer),
  
})

export const store = configureStore({
  reducer: rootReducer,
  
})
// export default store;

export  const persistor = persistStore(store)

