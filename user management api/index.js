import express from 'express'
const app = express();
import userRoutes from './view/user.routes.js'
import aggregationRoutes from './view/user.aggregation.js'
app.use(express.json())

import dotenv from 'dotenv';
dotenv.config();

// mongoose code starts here 
import mongoose from 'mongoose';
// uri -> uniform resource identifier 
const uri = process.env.MONGOURI
import queryRoutes from "./view/user.querying.js"



//NEVER INCLUDE YOUR URIS IN THE CODE!!!!!!!!!!!!

// mongodb://localhost:27017/myDatabaseName
// mongoose.connect() -> this method is used for connecting to the database
mongoose.connect(uri)
.then(()=>{
    console.log("Connected to mongoDB")
})
.catch((err)=>{
    console.error(err.message)
})



// mongoose code for DB connection ends here

app.get("/", (req, res)=>{
    res.send("Welcome to the user management api")
})


//this is used for api versioning 
app.use("/v1", userRoutes)
app.use("/query", queryRoutes)
app.use("/aggregate", aggregationRoutes)
// app.use("/v2", newRoutes)

app.listen(3000, ()=>{
    console.log('Server is live on http://localhost:3000/')
})