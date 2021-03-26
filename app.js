//import Express from node_module
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', {useNewUrlParser: true, useUnifiedTopology: true})

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

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
app.use(methodOverride('_method'))
app.use(routes)


//start and listen the server
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`)
})