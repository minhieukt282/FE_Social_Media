import * as React from 'react';
import {useSelector} from "react-redux";
import {useState} from "react";
import AccountResult from "./AccountResult";

export default function SearchAccount({socket}) {
    const [refreshPage, setRefreshPage] = useState(false)
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const accountResult = useSelector((state) => {
        return state.search.searchResult
    });

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    const isRelationship = (accountRes) => {
        let data = {
            flag: false,
            isAccept: false
        }
        for (let i = 0; i < relationship.length; i++) {
            if (relationship[i].accountReq === accountId && relationship[i].accountRes === accountRes) {
                data.flag = true
                data.isAccept = relationship[i].isAccept
                break
            }
        }
        return data
    }

    return (
        <>
            {
                accountResult.listAccount?.map((item, index) => {
                    const data = isRelationship(item?.accountId)
                    if (item?.accountId !== accountId) {
                        return (
                            <div className="col-4" key={index}>
                                <AccountResult item={item} initStatus={data.flag} isAccept={data.isAccept} socket={socket}/>
                            </div>
                        )
                    }
                })
            }
        </>
    );
}