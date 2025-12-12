
import express from 'express';

const router = express.Router();
//express.Router() is used when you want to define routes in files except for endpoint file 


router.get("/secondFile", (req, res)=>{
    res.send("this route is stored in the second file ")
})

router.post("/postRoute", (req, res)=>{
    res.send("Welcome to the post route")
})

export default router;