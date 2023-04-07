import React from 'react'
import useWindowDimensions from '../../helps/useWindowDimensions';
// import { useEffect } from 'react'

// import { useNavigate } from "react-router-dom"

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {

    console.log('messages:::::::', messages)

    // const navigate = useNavigate()


    // const handleLeaveChat = () => {
    //     localStorage.removeItem("userName")
    //     navigate("/")
    //     window.location.reload()
    // }

    const { height, width } = useWindowDimensions();

    return (
        <>
            <header className='chat__mainHeader' style={{ marginTop: 300 }}>
                <p>Hangout with Colleagues</p>
                {/* <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button> */}
            </header>


            <div className='message__container' >
                {messages.map(message => (
                    message.nguoiguiId === 'sanggui' ? (
                        <div className="message__chats" key={message.id}>
                            <p className='sender__name'>You</p>
                            {/* nguoi gui */}
                            <div className='message__sender'>
                                <p>{message.message}</p>
                            </div>
                            <p style={{ fontSize: 10, textAlign: 'right', paddingRight: 90 }}>{message.createdAt}</p>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.nguoinhanId}</p>
                            {/* nguoi nhan */}
                            <div className='message__recipient'>
                                <p>{message.message}</p>
                            </div>
                            <p style={{ fontSize: 10, paddingLeft: 90 }}>{ }</p>
                        </div>
                    )
                ))}

                <div className='message__status'>
                    <p>{typingStatus}</p>
                </div>
                <div ref={lastMessageRef} />
            </div>
        </>
    )
}

export default ChatBody