import { Button } from '@material-ui/core'
import React, { useState } from 'react'

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState("")
    // const handleTyping = () => socket.emit("typing", `${localStorage.getItem("userName")} is typing`)

    const handleTyping = () => socket.emit("typing", `nguoi gui dang soan tin nhan`)


    const handleSendMessage = (e) => {
        // e.preventDefault()
        // if (message.trim() && localStorage.getItem("userName")) {
        //     socket.emit("message",
        //         {
        //             text: message,
        //             name: localStorage.getItem("userName"),
        //             id: `${socket.id}${Math.random()}`,
        //             socketID: socket.id
        //         }
        //     )
        // }
        // setMessage("")

        // SANG

        e.preventDefault()
        if (message.trim()) {
            socket.emit("client-send-data",
                {
                    message: message,
                    nguoiguiId: 'sanggui',
                    nguoinhanId: 'sangnhan',
                    productId: 'sanpham1'
                }
            )
        }
        setMessage("")


    }

    function upload(files) {
        socket.emit("upload", files[0], (status) => {
            console.log(status);
        });
    }

    return (
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <div className="image-upload" >
                    <label htmlFor="file-input">
                        <img src="https://img.icons8.com/ios-glyphs/90/40C057/add-image.png" />
                    </label>
                    <input id="file-input" type="file" onChange={(e) => {
                        upload(e.target.files)
                        // setMessage(e.target.value)
                    }} />
                </div>
                <input
                    type="text"
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
                {/* <Button className='sendBtn' bgcolor='green'>Send</Button> */}
                {/* <img></img> */}
            </form>
        </div>
    )
}

export default ChatFooter