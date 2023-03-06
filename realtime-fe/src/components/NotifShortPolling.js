import { useEffect, useState } from "react"

export const NotifShortPolling = () => {
  const [notif, setNotif] = useState(0)
  
  const getNotif = () => {
    setInterval(() => {
      fetch(`http://localhost:3000/short-polling/notif`)
        .then(res => res.json())
        .then(res => {
          setNotif(res.count)
        })
        .catch(err => {
          console.log(err, `<=================== err ==================`);
        })
    }, 1000);
  }
  
  useEffect(getNotif, [])
  
  return (
    <div style={{display: 'flex'}}>
      <div style={{ marginRight: '10px'}}>notif-short-polling: {notif}</div>
    </div>
  )
}