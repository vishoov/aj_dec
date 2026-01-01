import express from 'express'

const router = express.Router()
import {
    functionproducts,
    idd
} from '../controllers/product.controllers.js'

router.get('/products', functionproducts)


router.get('/products/:id', idd)

router.post("/product", (req, res)=>{
    const productData = req.body;

    console.log(productData)

    res.status(201).json({
        message:"Product created successfully",
        product:productData
    })
})



export default router;