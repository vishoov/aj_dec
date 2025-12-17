// Schema -> Collection 

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    }
})

// collection name, schema 
const User = mongoose.model("User", userSchema)

export default User