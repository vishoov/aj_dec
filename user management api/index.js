import express from 'express'
const app = express();
import userRoutes from './view/user.routes.js'
import aggregationRoutes from './view/user.aggregation.js'
app.use(express.json())


//environment variables
import dotenv from 'dotenv';
dotenv.config();

// mongoose code starts here 
import mongoose from 'mongoose';
// uri -> uniform resource identifier 
const uri = process.env.MONGO_ATLAS
import queryRoutes from "./view/user.querying.js"


import cors from 'cors';
//whitelisted ip address is when we have specifically mentioned to recieve or entertain requests only from this ip address
const corsOptions = {
    origin:"*", //origin means from where we can recieve requests 
    methods:["GET", "POST"], //only these methods will be allowed
    allowedHeaders:["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))

// Rate limiting
import rateLimit from 'express-rate-limit';

const limitingOptions = {
    windowMs:24*60*60*1000, ///24 hours in ms 
    max:500,  //Maximum number of requests allowed
    message:"Too many requests, please keep your bots away!"

}

const limiter = rateLimit(limitingOptions)


app.use(limiter)




//NEVER INCLUDE YOUR URIS IN THE CODE!!!!!!!!!!!!

// mongodb://localhost:27017/myDatabaseName
// mongoose.connect() -> this method is used for connecting to the database
mongoose.connect(uri, 
    {
        dbName:"newestDB"
    }
)
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