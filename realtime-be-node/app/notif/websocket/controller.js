const { ObjectId } = require("mongodb");

const notifSync = async (notifCollection, socket, io) => {
  
  const response = await notifCollection.findOne(
    { _id: new ObjectId('64032116e05e21c3ae61e530')}
  )
  
  socket.emit('notif', response)
  
  socket.on('notif', async (incomingMsg) => {
    const response = await notifCollection.findOneAndUpdate(
      { _id: new ObjectId('64032116e05e21c3ae61e530')},
      { 
        $inc: { count: Number(incomingMsg) },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: 'after' }
    )
    io.emit('notif', response.value)
  })
}

module.exports = {
  notifSync
}