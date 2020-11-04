
const mongoose = require("mongoose")
// connection set up;

module.exports = async ()=>{

  try {
      return await  mongoose.connect("mongodb://localhost:27017/sezzleCalculator", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
     
  }
  catch(e){
    
    console.log(e)
    
  }}