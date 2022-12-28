import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./Post/postSlice";
import loginReducer from "./login/loginSlice";
import registerReducer from "./register/registerSlice";

export const store = configureStore({
    reducer:{
        posts:postReducer,
        loginWed:loginReducer,
        registerWed:registerReducer
    }
})