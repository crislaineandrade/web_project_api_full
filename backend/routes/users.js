const router = require('express').Router();

const {
  getAllUsers, getUser, createUser, updateProfile, updateAvatar, login
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.post('/signin', login)
router.post('/signup', createUser)
module.exports = router