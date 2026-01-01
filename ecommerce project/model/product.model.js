import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number
    }
})


// id:string,
// Name:string,
// description:string,
// Costprice:number,
// saleprice:number,
// Category:string,
// Stock:number,
// image:[String] -> cdn links front end 
// createdAt:date

