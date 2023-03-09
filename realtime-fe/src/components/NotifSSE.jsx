const { useState, useEffect } = require("react")

export const NotifSSE = () => {
  const [notif, setNotif] = useState(0)
  const [listening, setListening] = useState(false)
  
  const increment = () => {
    fetch('http://localhost:3000/sse/notif', { method: 'POST'})
  }
  
  useEffect(() => {
    if(!listening) {
      const events = new EventSource('http://localhost:3000/sse/notif')
      events.onmessage = (e) => {
        console.log('%c[SSE] req', 'color: #60CA40');
        const data = JSON.parse(e.data)
        
        setNotif(data.count)
      }
    }
    
    setListening(true)
    
  }, [listening, notif])
  
  return (
    <div style={{display: 'flex'}}>
      <div style={{ marginRight: '10px'}}>notif-sse: {notif}</div>
      <button onClick={() => increment()}>+</button>
    </div>
  )
}