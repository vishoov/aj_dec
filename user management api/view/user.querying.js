import express from 'express';
const router = express.Router();
import User from '../model/user.model.js';


//QUERYING IN MONGODB
//matching query = when we want to find docuemnts with the input queries
router.get("/username", async (req, res)=>{
    try{
        const username = req.body.username;
        const users = await User.find({username:username})

        if(!users){
            res.status(404).send("no users found")
        }

        res.json({
            users
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


// router.post("/addUsers", async (req, res)=>{
//     const users = req.body;

//     const userss = await User.insertMany(users);

//     res.json({
//         users
//     })
// })




//Comparison operators
// >, <, >=, <=, !=
// > -> $gt
// < -> $lt
// >= -> $gte
// <= -> $lte
// != -> $ne
//  == -> $eq
router.get("/greaterThan/:value", async (req, res)=>{
    try{
        const ageValue = req.params.value;

        const user = await User.find({
            age:{
                $gt:ageValue
            }
        })

        if(!user){
            res.send("no user")
        }

        res.status(200).json({
            user
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


// >=18 and <=40 with role 'User'
// Multiple conditions

// LOGICAL OPERATORS
// AND -> ALL TRUE -> True output
// OR -> Atleast one to be true -> True
// NOT -> Not true  (!)

router.get("/adult_users", async (req, res)=>{
    try{
        const user = await User.find({
            $and: [
                {
                    age:{
                        $gte:18
                    }
                },
                {
                    age:{
                        $lte:40
                    }
                },
                {
                    role:"admin"
                }
            ]
        })

        if(!user){
            res.send("not found")
        }

        res.json({
            user
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


// /greaterThan/:Value/role/:value?notequal=val
// users with age greater than {Value}
// with role {value}
// age not equal to {val}

// age = 20 or 25 or 30

// Membership operators
// $in operator is used for checking multiple values of a single field
// $nin -> not in


router.get("/agefilter", async (req, res)=>{
    try{
        const users = await User.find({
          age:{
            $in : [20, 25, 30]
          }
        })

        res.send({
            users
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


// optional fields 
// whenever we want to find if a field exists or not 
// phone number
// address
// role


// fields with multiple kinds of values
//recoveryMail

// $type is used for fetching the users with a given type


router.get("/checkAddress", async (req, res)=>{
    try{
        const users = await User.find({
            address:{
                $exists:true
                // $type:"String"
            }
        })

        if(users.length===0){
            res.status(404).json({
                message:"No user found with address"
            })
        }


        res.status(200).json({
            users
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


// fetch all users
//sort the data on basis of age
// ascending : 1
// descending : -1


// limit will only send us a fixed number of documents 

// select allows you to select and show only the fields that are required
// .select('field1 field2') it will only include these fields
// .select('+field') it will include this field also with all the other visible fields


// .skip(count) skips the count documents 

router.get("/all_users", async (req, res)=>{
    try{
        const users = await User.find()
        .sort({age:-1})
        .skip(2)
        .limit(10)
        .select('username email age')

        //HW you have to build a pagination route
        // all users 
        // page number in the route parameters 
        // 1 -> show first 10
        // 2 -> show second 10 (11-20)


        res.json({users})
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

// update email

router.put("/changeUsername", async (req, res)=>{
    try{
        const { username, newusername } = req.body;

        //Option1 : using updateOne method
        // const updatedUser = await User.updateOne(
        //     // search for user
        //     {
        //         username:username
        //     },
        //     // it will update its field
        //     {
        //         $set: {
        //             username:newusername
        //         }
        //     }
        // )


        // Option 2 : findOneAndUpdate() this method is different from updateOne because it returns the updated document 
        const updatedUser = await User.findOneAndUpdate(
            {
                username:username
            },
            {
                $set:{
                    username:newusername
                }
            },
            {
                new:true
            }
        )
        console.log(updatedUser)
        res.send(updatedUser)

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})





router.put("/ageFix", async (req, res)=>{
    try{
        const users = await User.updateMany({
            age:{
                $exists:false
            }
        },{
            age:18
        }
    )

        res.json({
            users
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})




router.put("/findByIdAndUpdate/:id", async (req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, {
            $set:{
                username:"checkedbro"
            }
            
        }, {
            new:true
        })

        res.json({user})
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


// Delete Queries 

//deleteOne()
// deleteMany()
// findOneAndDelete()
// findByIdAndDelete()

router.delete("/deleteUser", async (req, res)=>{
    try{
        const user = await User.findOneAndDelete({
            username:"nancywhite"
        })

        res.json({
            message:"User deleted successfully",
            user
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})





export default router;



// 1st page => first 10
// 2nd page => second 10 

// 100
// 1

// 2 - 11-20