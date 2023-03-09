import { useEffect, useState } from "react"

const { io } = require("socket.io-client")



export const NotifSocket = () => {
  const [notif, setNotif] = useState(0)
  const [socket, setSocket] = useState(null)
  
  useEffect(() => {
    if(socket) {
      socket.on('notif', (msg) => {
        setNotif(msg.count)
      })
      
    } else {
      setSocket(io('http://localhost:3000'))
    }
    
  }, [notif, socket])
  
  return (
    <div style={{display: 'flex'}}>
      <div style={{ marginRight: '10px'}}>notif-socket: {notif}</div>
      <button onClick={() => socket.emit('notif', 1)}>+</button>
    </div>
  )
}