//import Express from node_module
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', {useNewUrlParser: true, useUnifiedTopology: true})
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

const db = mongoose.connection

db.on('error', ()=>{
    console.log('mongodb error!')
})

db.once('open', ()=>{
    console.log('mongodb connected!')
})

//setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//use static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true }))

//handle request and response
app.get('/',(req,res)=>{
    Restaurant.find() 
    .lean() 
    .then(restaurants => res.render('index', { restaurants })) 
    .catch(error => console.error(error))
})

//routing when click the restaurant for more Info
app.get('/restaurants/:id',(req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//routing for search results
app.get('restaurants/search',(req,res)=>{
    console.log(req.query.keyword)
    const keyword = req.query.keyword
    return Restaurant.find({"$or": [
      { "name": { $regex: `${keyword}`, $options: 'i' } },
      { "category": { $regex: `${keyword}`, $options: 'i' } }
    ] })
    .lean()
    .then( restaurant => res.render('index', {restaurants: restaurant}))
})

app.get('/restaurants/new',(req,res)=>{
   res.render('new')
})

app.post('/restaurants/new', (req, res) => {
    const {name, category, location, phone, map, rating, description, image} = req.body
    return Restaurant.create({ name, category, location, phone, map, rating, description, image})     
      .then(() => res.redirect('/')) 
      .catch(error => console.log(error))

  })


 // setting routers for editing
app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('edit', { restaurant }))
      .catch(error => console.log(error))
  })

  app.post('/restaurants/:id/edit', (req, res) => {
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
  app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })



//start and listen the server
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`)
})