import * as React from 'react';
import {useSelector} from "react-redux";
import PostDetails from "../post/postDetails";

export default function SearchPost({socket}) {
    const accountId = JSON.parse(localStorage.getItem("accountId"))

    const postResults = useSelector((state) => {
        return state.search.searchResult.listPost
    });

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    const isRelationship = (accountRes) => {
        let flag = false
        for (let i = 0; i < relationship.length; i++) {
            if ((relationship[i].accountReq === accountId && relationship[i].accountRes === accountRes && relationship[i].isFriend === true) ||
                (relationship[i].accountReq === accountRes && relationship[i].accountRes === accountId && relationship[i].isFriend === true)) {
                flag = true
                break
            }
        }
        return flag
    }

    const countLikes = useSelector(state => {
        return state.likes.countLikes
    })

    const findCountLikes = (postId) => {
        let count = 0
        for (let i = 0; i < countLikes.length; i++) {
            if (countLikes[i].postId === postId) {
                count = countLikes[i].countLike
                break
            }
        }
        return count
    }

    return (
        <>
            {
                postResults?.map((item, index) => {
                    const isFriend = isRelationship(item?.accountId)
                    console.log(isFriend, index)
                    if (item?.status === 'public' || (item?.status === 'onlyFriend' && isFriend === true) || (item?.accountId === accountId)) {
                        const countLikeOfPost = findCountLikes(item?.postId)
                        return (
                            <div className="col-12" key={index}>
                                <PostDetails key={index} socket={socket} item={item}
                                             countLike={countLikeOfPost} isSetting={false}/>
                            </div>
                        )
                    }
                })
            }
        </>
    );
}