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
    const restaurantInfo = restaurantList.results.find(restaurant=> restaurant.id.toString() === req.params.id)
    res.render('show', {restaurant: restaurantInfo})
})

//routing for search results
app.get('/search',(req,res)=>{
    console.log(req.query.keyword)
    const keyword = req.query.keyword
    const searchResult = restaurantList.results.filter(restaurant=>{
        return restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase())
    })
    res.render('index', {restaurant: searchResult, keyword: keyword})
})

app.get('/restaurant/new',(req,res)=>{
  res.render('new')
})

app.post('/restaurant/new', (req, res) => {
    const name = req.body.name       
    return Restaurant.create({ name })     
      .then(() => res.redirect('/')) 
      .catch(error => console.log(error))
  })


//start and listen the server
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`)
})