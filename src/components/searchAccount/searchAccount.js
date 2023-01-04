import * as React from 'react';
import {useSelector} from "react-redux";
import AccountResult from "./AccountResult";

export default function SearchAccount({socket}) {
    const accountId = JSON.parse(localStorage.getItem("accountId"))

    const accountResult = useSelector((state) => {
        return state.search.searchResult.listAccount
    });

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    const isRelationship = (accountRes) => {
        let data = {
            flag: false,
            isFriend: null
        }
        for (let i = 0; i < relationship.length; i++) {
            if (relationship[i].accountReq === accountId && relationship[i].accountRes === accountRes && relationship[i].isAccept === true) {
                data.flag = true
                data.isFriend = relationship[i].isAccept
                break
            }
        }
        return data
    }

    return (
        <>
            {
                accountResult?.map((item, index) => {
                    const data = isRelationship(item?.accountId)
                    if (item?.accountId !== accountId) {
                        return (
                            <div className="col-4" key={index}>
                                <AccountResult item={item} initStatus={data.flag} isFriend={data.isFriend}
                                               socket={socket}/>
                            </div>
                        )
                    }
                })
            }
        </>
    );
}