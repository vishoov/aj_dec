

const functionproducts = (req, res)=>{
    res.send("These are the products")
}

const idd = (req, res)=>{
    const id = req.params.id;
    res.send(`the product with id ${id} details`)
}


export {
    functionproducts,
    idd
}