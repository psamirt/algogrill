const express = require('express')
const router = express.router()



//------------ productos nuevos para el admin -------------- 
router.post('/newProduct', postProduct)

//-----------obtener productos -------------
// router.get('/getAllProducts', getProducts)

module.exports = router