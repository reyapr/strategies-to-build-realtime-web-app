const { useState, useEffect } = require("react")

export const NotifSSE = () => {
  const [notif, setNotif] = useState(0)
  const [listening, setListening] = useState(false)
  
  useEffect(() => {
    if(!listening) {
      const events = new EventSource('http://localhost:3000/sse/notif')
      events.onmessage = (e) => {
        const data = JSON.parse(e.data)
        
        setNotif(data.count)
      }
    }
    
    setListening(true)
    
  }, [listening, notif])
  
  return (
    <div>notif-sse: {notif}</div>
  )
}