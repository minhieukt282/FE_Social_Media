import * as React from 'react';
import {useSelector} from "react-redux";
import AccountResult from "./AccountResult";

export default function SearchAccount({socket}) {
    const accountId = JSON.parse(localStorage.getItem("accountId"))

    const accountResult = useSelector((state) => {
        return state.search.searchResult.listAccount
    });

    console.log("accountResult", accountResult)

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    const isRelationship = (accountRes) => {
        let data = {
            isFriend: false,
            isWaitRes: false,
        }
        for (let i = 0; i < relationship.length; i++) {
            if ((relationship[i].accountReq === accountRes && relationship[i].accountRes === accountId) ||
                (relationship[i].accountReq === accountId && relationship[i].accountRes === accountRes)) {
                data.isFriend = relationship[i].isFriend
                data.isWaitRes = true
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
                                <AccountResult item={item} initIsFriend={data.isFriend} initIsWaitRes={data.isWaitRes}
                                               socket={socket}/>
                            </div>
                        )
                    }
                })
            }
        </>
    );
}