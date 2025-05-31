const router = require('express').Router()

const {registerUser, authorizeUser} = require('../controllers/auth')

router.post('/signup', registerUser)

router.get('/signin', authorizeUser)


module.exports = router