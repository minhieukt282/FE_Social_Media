import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./posts/postSlice";
import loginReducer from "./login/loginSlice";
import registerReducer from "./register/registerSlice";
import waitingFriendsReducer from "./addFriend/friendSlice";
import notificationReducer from "./notification/notificationSlice"
import likeReducer from "./liked/likedSlice"
import accountInfoReducer from "./account/accountSlice"
import searchReducer from "./search/searchSlice"
import relationshipReducer from "./relationship/relationshipSlice"
import listFriendReducer from "./listFriend/listFriendSlice"

export const store = configureStore({
    reducer: {
        posts: postReducer,
        loginWed: loginReducer,
        registerWed: registerReducer,
        waitingFriend: waitingFriendsReducer,
        notification: notificationReducer,
        likes: likeReducer,
        accountInfo: accountInfoReducer,
        search: searchReducer,
        relationship: relationshipReducer,
        listFriend: listFriendReducer
    }, middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
