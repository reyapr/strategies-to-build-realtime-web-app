import { useEffect, useState } from "react"

export const NotifLongPolling = () => {
  const [notif, setNotif] = useState(0)
  
  const getNotif = (requestDate) => {
    console.log('%c[LONG POLLING] req', 'color: red');
    fetch(`http://localhost:3000/long-polling/notif?requestDate=${requestDate}`)
      .then(res => res.json())
      .then(res => {
        if(!res.timeout) {
          setNotif(res.count)
        }
        getNotif(new Date().toISOString())
      })
      .catch(err => {
        getNotif(new Date().toISOString())
        console.log(err, `[LONG-POLLING] =================== err ==================`);
      })
  }
  
  useEffect(() => {
    getNotif(new Date(0).toISOString())
  }, [])
  
  return (
    <div style={{display: 'flex'}}>
      <div style={{ marginRight: '10px'}}>notif-long-polling: {notif}</div>
    </div>
  )
  
}