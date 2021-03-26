const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/search',(req,res)=>{
    const keyword = req.query.keyword
    return Restaurant.find({"$or": [
      { "name": { $regex: `${keyword}`, $options: 'i' } },
      { "category": { $regex: `${keyword}`, $options: 'i' } }
    ] })
    .lean()
    .then( restaurant => res.render('index', {restaurants: restaurant, keyword} ))
  })
  
router.get('/new',(req,res)=>{
    res.render('new')
  })
  
  
router.post('/new', (req, res) => {
    if (typeof req.body.name !=='string' || req.body.name.length < 3) {
      return res.send('The restaurant name is invalid, which should be at least 3 characters')
    } 
    const {name, category, location, phone, map, rating, description, image} = req.body
    return Restaurant.create({ name, category, location, phone, map, rating, description, image})     
      .then(() => res.redirect('/')) 
      .catch(error => console.log(error))
  })
  
  //routing when click the restaurant for more Info
router.get('/:id',(req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('show', { restaurant }))
      .catch(error => console.log(error))
  })
  
   // setting routers for editing
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
    })
  
router.put('/:id', (req, res) => {
    const id = req.params.id
    const source = req.body
    return Restaurant.findById(id)
      .then(restaurant => {
        Object.assign(restaurant, source)
        return restaurant.save()
      })
      .then(()=> res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
    })
  
    // setting router for delete function
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })

module.exports = router
