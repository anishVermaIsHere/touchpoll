import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer.js';
import storage from 'redux-persist/lib/storage';
import pollSlice from '../slices/polls/poll-slice.js';
import userSlice from '../slices/user/user-slice.js';
import snackBarSlice from '../slices/snackbar/snackbar-slice.js';



// const persistConfig={
//     key:'root',
//     storage
// }

// const rootReducer=combineReducers({
//     pollSlice,
//     userSlice,
//     snackBarSlice
// })

// const persistedReducer=persistReducer(persistConfig,rootReducer);

const store = configureStore({
    // reducer:persistedReducer
    reducer: {
        pollSlice,
        userSlice,
        snackBarSlice
    }
})

store.subscribe(()=>{
    // console.log("State Update .... ", store.getState());
}) 


export default store;
