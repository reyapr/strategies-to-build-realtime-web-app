const { ObjectId } = require("mongodb");

let clients = [];

const getNotif = (notifCollection) => async (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
  };
  res.writeHead(200, headers);
  
  const response = await notifCollection.findOne(
    { _id: new ObjectId('64032116e05e21c3ae61e530')}
  )
  
  const data = `data: ${JSON.stringify(response)}\n\n`
  
  res.write(data);
  
  const clientId = Date.now()
  
  const newClient = {
    id: clientId,
    response: res
  }
  
  clients.push(newClient)
  
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

const updateNotif = (notifCollection) => async (req, res) => {
  console.log( `<=================== update Notif ==================`);
  try {
    const response = await notifCollection.findOneAndUpdate(
      { _id: new ObjectId('64032116e05e21c3ae61e530')},
      { 
        $inc: { count: 1 },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: 'after' }
    )
    res.status(200).json(response.value)
    clients.forEach(c => c.response.write(`data: ${JSON.stringify(response.value)}\n\n`))
  } catch(err) {
    console.log(err, `<=================== err ==================`);
  }
}

module.exports = {
  getNotif,
  updateNotif
}