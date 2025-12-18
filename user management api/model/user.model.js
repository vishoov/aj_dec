// Schema -> Collection 

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true, //without username, the data wont be created
        unique:true, //abcd123 
        trim:true,
        lowercase:true, // ABC123 -> abc123
        minLength:4,
        maxLength:30,
        immutable:false
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        immutable:true,
        match:/.+\@.+\..+/
    },
    age:{
        type:Number,
        min:18, 
        max:200,
        default:18
        
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:20,
        select:false, //exclude the data from queries
        validate:{
            validator: function(v){
                let hasUpperCase = false;
                let hasLowerCase = false;
                let number = false;

                for(let i=0; i<v.length; i++){
                    const char = v[i];
                    const charCode = char.charCodeAt(0);

                    //uppercase
                    if(charCode>=65 && charCode<=90){
                        hasUpperCase=true
                    }
                    //lowercase
                    if(charCode>= 97 && charCode<=122){
                        hasLowerCase = true
                    }

                    if(charCode>=48 && charCode<=57){
                        number=true
                    }
                    console.log(hasUpperCase, hasLowerCase, number)
                    
                    
                }
                return hasUpperCase && hasLowerCase && number
            },
            message:'Password that you are trying to enter is invalid, please include lowercase uppercase and number in it'
        }
    },
    role:{
        type:String,
        enum:["admin", "user", "superadmin"],
        default:"user"
    }
    // ,
    // createdAt:{
    //     type:Date,
    //     default:Date.now,
    //     immutable:true
    // }
},
{
    timestamps:true
})

// collection name, schema 
const User = mongoose.model("User", userSchema)
// User -> model 
export default User