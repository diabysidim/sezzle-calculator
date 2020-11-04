const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  logs: [{
      userMessages:{
        username: String,
        timestamp: String,
        text:String
      }
  }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

roomSchema.index({ name: 1, ownwe: 1 }, { unique: true })

roomSchema.statics.createRoom = async (name, owner)=>{
  try{
    const room  = await new Room({name, owner});
    await room.save();
    return room;
  }
  catch(e){
    console.log(e)
    throw new Error("the name of the room is taken")
  }
  

}
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
