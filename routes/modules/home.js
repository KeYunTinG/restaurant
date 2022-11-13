const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const restaurantList = require('../../restaurant.json')
// routes setting
router.get('/', (req, res) => {
    Restaurant.find({})
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})
router.get("/search", (req, res) => {
    if (!req.query.keywords) {
        res.redirect("/")
    }

    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()

    Restaurant.find({})
        .lean()
        .then(restaurants => {
            const filterrestaurants = restaurants.filter(
                data =>
                    data.name.toLowerCase().includes(keyword) ||
                    data.category.includes(keyword)
            )
            res.render("index", {
                restaurants: filterrestaurants,
                keywords,
            })
        })
        .catch(err => console.log(err))
})

module.exports = router