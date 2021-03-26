//import packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

//setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//use static files and packages
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


//start and listen the server
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`)
})