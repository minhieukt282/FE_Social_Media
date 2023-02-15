import ReactScrollToBottom from "react-scroll-to-bottom";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createNotification} from "../../services/notificationService";
import {showMessage} from "../../services/messageService";
import Message from "./Message";
import CallIcon from '@mui/icons-material/Call';
import DuoIcon from '@mui/icons-material/Duo';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import "./Chat.css"

export default function Chat({socket}) {
    const dispatch = useDispatch()
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const {relationshipId} = useParams()
    const [isSent, setIsSent] = useState(false)

    useEffect(() => {
        dispatch(showMessage())
    }, [isSent])

    useEffect(() => {
        socket?.on("getNotification", data => {
            dispatch(showMessage())
        })
    }, [socket])

    const messages = useSelector(state => {
        return state.message.message
    })

    const listFriends = useSelector(state => {
        return state.listFriend.listFriend
    })

    let userInfo
    for (let i = 0; i < listFriends.length; i++) {
        if (relationshipId === listFriends[i].relationshipId && accountId !== listFriends[i].accountId) {
            userInfo = listFriends[i]
            break
        }
    }
    const handleSentMessage = async ({text}) => {
        const dataNotice = {
            displayName: JSON.parse(localStorage.getItem("displayName")),
            accountSent: accountId,
            accountReceiver: userInfo?.accountId,
            postPostId: +relationshipId,
            type: "message"
        }
        if (text.trim() !== '') {
            await dispatch(createNotification(dataNotice))
            socket.emit("sentMessage", {roomId: +relationshipId, accountId: accountId, message: text.trim()})
            setIsSent(!isSent)
        }
    }

    return (
        <div>
            <div className="imgChat">
                <div className="row">
                    <div className="col-5">
                        <Link to={`/profile/${userInfo?.accountId}`} style={{textDecoration: "none"}}>
                            <img style={{width: 50, height: 50}} src={userInfo?.img} alt="" className="navbarImg"/>
                            <h4 style={{marginLeft: 60, marginTop: -40}}>{userInfo?.displayName}</h4>
                        </Link>
                    </div>
                    <div className="col-5">
                        <CallIcon className="callIcon"/>
                        <DuoIcon className="DuoIcon"/>
                        <GroupAddIcon className="GroupAddIcon"/>
                    </div>
                </div>
            </div>

            <div className="chatPage">
                <div className="chatGroup">
                    <ReactScrollToBottom className="chatBox">
                        {
                            messages.map((item, index) => {
                                if (+item.roomId === +relationshipId) {
                                    return (
                                        <div key={index}>
                                            <Message user={item?.accountId === accountId ? '' : item?.accountId}
                                                     item={item}
                                                     classs={item?.accountId === accountId ? 'right' : 'left'}/>
                                        </div>
                                    )
                                }
                            })
                        }
                    </ReactScrollToBottom>
                    <div className="inputBox">
                        <Formik initialValues={
                            {text: ''}
                        } onSubmit={(values, {resetForm}) => {
                            if (values.text !== '') {
                                handleSentMessage(values).then(() => {
                                    resetForm()
                                });
                            }
                        }
                        }>
                            <Form>
                                <div className='row' style={{paddingLeft: 15, paddingTop: 10}}>
                                    <Field as={'input'} name={'text'}
                                           className='chatInput col-10'/>
                                    <button type="submit" className="sendBtn col-2">Sent</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}