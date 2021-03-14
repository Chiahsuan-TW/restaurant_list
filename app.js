//import Express from node_module
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//use static files
app.use(express.static('public'))

//handle request and response
app.get('/',(req,res)=>{
    res.render('index', {restaurant: restaurantList.results})
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


//start and listen the server
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`)
})