const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/:type/:method', (req,res)=>{
    const type = req.params.type
    const method = req.params.method
    Restaurant.find() 
    .lean()
    .sort({ [type] : [method]}) 
    .then(restaurants => res.render('index', { restaurants })) 
    .catch(error => console.error(error))
  })
  
module.exports = router