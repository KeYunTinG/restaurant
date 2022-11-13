const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// routes setting
router.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})
router.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurant = restaurantList.results.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.includes(keyword)
    )
    res.render('index', { restaurants: restaurant, keyword: keyword })
})


module.exports = router