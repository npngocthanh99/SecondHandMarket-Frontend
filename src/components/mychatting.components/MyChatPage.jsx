import { Grid } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react'
import useWindowDimensions from '../../helps/useWindowDimensions'
import MyHeader from '../MyHeader'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const MyChatPage = ({ socket }) => {
    const { height, width } = useWindowDimensions();
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.emit('join_room', 'sanpham1')
        socket.on("messageResponse", (data) => {
            console.log('data::::', data);
            // setMessages([...messages, data])
            setMessages(data)

        });

    }, [socket])

    useEffect(() => {
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [socket])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'auto' },);
    }, [messages]);

    return (
        <>
            <MyHeader />
            <Grid container justifyContent='center'>
                <Grid item xs={8}>
                    <div className="chat">
                        <ChatBar socket={socket} />
                        <div className='chat__main'>
                            <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
                            <ChatFooter socket={socket} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>

        //                 <MyHeader />


        //         <Grid item xs={8} sm={8}>
        //             <div className="chat">
        //                 <ChatBar socket={socket} />
        //                 <div className='chat__main'>
        //                     <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        //                     <ChatFooter socket={socket} />
        //                 </div>
        //             </div>
        //         </Grid>
        //     </Grid>
        // </Box>


    )
}

export default MyChatPage