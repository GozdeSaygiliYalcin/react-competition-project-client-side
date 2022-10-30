import {configureStore} from '@reduxjs/toolkit';
import {
    authSlice,
    userSlice,
    mainSlice,

} from './features';
const store = configureStore({
    reducer:{
        auth: authSlice,
        user: userSlice,
        main: mainSlice,
    }     
});
export default store;