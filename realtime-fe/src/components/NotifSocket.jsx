import { useEffect, useState } from "react"

const { io } = require("socket.io-client")

const socket = io('http://localhost:3000')

export const NotifSocket = () => {
  const [notif, setNotif] = useState(0)
  
  useEffect(() => {
    socket.on('notif', (msg) => {
      setNotif(msg.count)
    })
    
    
  }, [notif])
  
  return (
    <div style={{display: 'flex'}}>
      <div style={{ marginRight: '10px'}}>notif-socket: {notif}</div>
      <button onClick={() => socket.emit('notif', 1)}>+</button>
    </div>
  )
}