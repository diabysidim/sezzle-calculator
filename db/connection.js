
const mongoose = require("mongoose")
// connection set up;

module.exports = async ()=>{

  try {
      return await  mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
     
  }
  catch(e){
    
    console.log(e)
    
  }}