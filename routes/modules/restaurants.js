const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')



router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/new', (req, res) => {
    return Restaurant.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:_id', (req, res) => {
    const id = req.params._id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

router.get('/:_id/edit', (req, res) => {
    const id = req.params._id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

router.put('/:_id', (req, res) => {
    const id = req.params._id
    const editRestaurant = req.body
    return Restaurant.updateOne({ _id: id }, editRestaurant)
        .then(() => res.redirect(`/${id}`))
        .catch(error => console.log(error))
})

router.delete('/:_id', (req, res) => {
    const id = req.params._id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



module.exports = router;