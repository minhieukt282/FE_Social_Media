import * as React from 'react';
import {useSelector} from "react-redux";
import PostDetails from "../post/PostDetails";

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

    return (
        <>
            {
                postResults?.map((item, index) => {
                    const isFriend = isRelationship(item?.accountId)
                    if (item?.status === 'public' || (item?.status === 'onlyFriend' && isFriend === true) || (item?.accountId === accountId)) {
                        return (
                            <div className="col-12" key={index}>
                                <PostDetails key={index} socket={socket} item={item} countComment={item.comments.length}
                                             countLike={item.likes.length} isSetting={false}/>
                            </div>
                        )
                    }
                })
            }
        </>
    );
}