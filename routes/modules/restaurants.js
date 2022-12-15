const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')



router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/new', (req, res) => {
    const userId = req.user._id
    return Restaurant.create(...req.body, userId)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params._id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

router.get('/:_id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params._id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

router.put('/:_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params._id
    const editRestaurant = req.body
    return Restaurant.findOneAndUpdate({ _id: userId }, req.body)
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch(error => console.log(error))
})

router.delete('/:_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params._id
    return Restaurant.findOneAndDelete({ _id, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



module.exports = router;