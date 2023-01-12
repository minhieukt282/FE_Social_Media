import ReactScrollToBottom from "react-scroll-to-bottom";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
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
    const {relationshipId} = useParams()
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const [room, setRoom] = useState(+relationshipId)
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
        socket.emit("sentMessage", {roomId: room, accountId: accountId, message: text})
        const dataNotice = {
            displayName: JSON.parse(localStorage.getItem("displayName")),
            accountSent: accountId,
            accountReceiver: userInfo.accountId,
            postPostId: 0,
            type: "message"
        }
        await dispatch(createNotification(dataNotice))
        setIsSent(!isSent)
    }

    return (
        <div>
            <div className="imgChat">
                <img style={{width: 50, height: 50}} src={userInfo.img} alt="" className="navbarImg"/>
                <h4 style={{marginLeft: 60, marginTop: -40}}>{userInfo.displayName}</h4>
                <CallIcon style={{position:"absolute",marginLeft:600,top:110,color:"blue"}}/>
                <DuoIcon style={{position:"absolute",marginLeft:650,top:110,color:"blue"}}/>
                <GroupAddIcon style={{position:"absolute",marginLeft:700,top:110,color:"blue"}}/>
            </div>

            <div className="chatPage">
                <div className="chatGroup">
                    <ReactScrollToBottom className="chatBox">
                        {
                            messages.map((item, index) => {
                                if (+item.roomId === +relationshipId) {
                                    return (
                                        <div key={index}>
                                            <Message user={item.accountId === accountId ? '' : item.accountId}
                                                     item={item}
                                                     classs={item.accountId === accountId ? 'right' : 'left'}/>
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
                                    <Field as={'input'} style={{width: '100%'}} name={'text'}
                                           className='chatInput col-10'/>
                                    <button type="submit" className="sendBtn col-2">Sent </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}