const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})