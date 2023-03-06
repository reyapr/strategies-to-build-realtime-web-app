const { ObjectId } = require("mongodb");
const sleep = require('../../helper/sleep');


const getNotif = (notifCollection) => async (req, res) => {
  try {
    const requestDate = req.query.requestDate
    
    const intrvl = setInterval(async () => {
      const response = await notifCollection.findOne({ _id: new ObjectId('64032116e05e21c3ae61e530')})
      if (new Date(response.updatedAt) >= new Date(requestDate)) {
        res.status(200).json(response)
      } 
    }, 1000);
    
    const timeout = setTimeout(() => {
      clearInterval(intrvl)
      res.status(408).json({
        timeout: true
      })
    }, 10000);
    
    req.on('close', () => {
      clearInterval(intrvl)
      clearTimeout(timeout)
    })
  } catch (error) {
    console.log(error, `<=================== error ==================`);
  }
}


module.exports = {
  getNotif
}