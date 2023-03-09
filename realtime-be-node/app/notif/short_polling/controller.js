const { ObjectId } = require("mongodb");

const updateNotif = (notifCollection) => async (req, res) => {
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
  } catch(err) {
    console.log(err, `<=================== err ==================`);
  }
}

const getNotif = (notifCollection) => async (req, res) => {
  try {
    const response = await notifCollection.findOne({ _id: new ObjectId('64032116e05e21c3ae61e530')})
    res.status(200).json(response)
  } catch (error) {
    console.log(error, `<=================== error ==================`);
  }
}

module.exports = {
  updateNotif,
  getNotif
}