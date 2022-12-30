import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./posts/postSlice";
import loginReducer from "./login/loginSlice";
import registerReducer from "./register/registerSlice";
import waitingFriendsReducer from "./addFriend/friendSlice";
import notificationReducer from  "./notification/notificationSlice"


export const store = configureStore({
    reducer: {
        posts: postReducer,
        loginWed: loginReducer,
        registerWed: registerReducer,
        waitingFriend: waitingFriendsReducer,
        notification: notificationReducer
    }
})