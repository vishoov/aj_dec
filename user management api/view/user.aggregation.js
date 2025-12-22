// Mongoose Aggregation Pipelines

// Aggregation pipelines are sequential (step by step) processing and transformation of data that helps us in implementing

// Efficient Data processing : the transformations that we implement happen on the Database level (no need to bring all the data to the server)
// Scalable Analytics: Process LARGE amount of data efficiently with optimised stages and get detailed insights and identify data patterns
// Flexible transformation: we can combine multiple stages to transform and fetch the data 



// each stage = object
// pipeline =array of objects



import express from 'express'
import User from '../model/user.model.js';
const router = express.Router();


router.get("/aggregate", async (req, res)=>{
    try{
    
        const users = await User.aggregate(
            [
                {
                    $match:{
                        age:{
                            $exists:true
                        }
                    }
                },
                {
                    $group:{
                        _id:"$role",
                        count:{
                            $sum:1
                        }
                    }
                },
                {
                    $sort:{
                        age:1
                    }
                }
            ]
        )

        res.json({
            users
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})
// Aggregation Stages
// 1. $match : Filtering Documents
// this stage works exactly like the find() query, for filtering the data 

router.get('/match', async (req, res)=>{
    try{
        const pipeline = [
            {
                $match:{
                    age:{
                        $gt:20
                    }
                }
            }
        ]

        const users = await User.aggregate(pipeline)

        res.json({
            users
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})


// $group : groups and aggregates the data 
// 100 users -> get the count of distinct roles 
// admin?
// users?
// superadmin?



// group the data based on roles and get the count of each role
router.get('/group', async (req, res)=>{
    try{
        const users = await User.aggregate([
            {
                // fieldName:{
                // operation:'$operationonwhichfield'
                // }
                $group:{
                    // role should be unique 
                    _id:"$role",
                    count:{
                        $sum:1
                    },
                    averageAge:{
                        $avg:'$age'
                    },
                    maxAge:{
                        $max:'$age'
                    },
                    minAge:{
                        $min:'$age'
                    }
                }
            }
        ])

        res.json({
            users
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})



// 3. $project stage -> shape the output data
// we can select which fields to include, which fields to exclude and we can also add more computed fields 


router.get('/project', async (req, res)=>{
    try{
        const users = await User.aggregate([
            {
                // fieldName:{
                // operation:'$operationonwhichfield'
                // }
                $group:{
                    // role should be unique 
                    _id:"$role",
                    count:{
                        $sum:1
                    },
                    averageAge:{
                        $avg:'$age'
                    },
                    maxAge:{
                        $max:'$age'
                    },
                    minAge:{
                        $min:'$age'
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    role:"$_id",
                    averageAge:1,
                    maxAge:1,
                    minAge:1,
                    count:1,
                   
                }
            }
        ])

        res.json({
            users
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

// $sort - sorting documents 

router.get('/sort', async (req, res)=>{
    try{
        const users = await User.aggregate([
            {
                $sort:{
                    age:-1
                }
            }
        ])

        res.json({
            users
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})


// $limit and $skip -> Pagination

router.get('/pagination', async (req, res)=>{
    try{    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit ) || 5;

        const skip = (page-1)*limit;

        const users = await User.aggregate([
            {
                $sort:{
                    age:-1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:limit
            }
        ])
        res.json({
            users
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})






export default router;


// https://www.npmjs.com/package/bcrypt
// https://www.jwt.io/introduction