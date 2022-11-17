const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const PORT = process.env.PORT || 3000
require('./config/mongoose')



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`App is running on localhost:${PORT}`)
})