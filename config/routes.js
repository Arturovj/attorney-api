const express = require("express");
const router = express.Router();
const upload = require('../config/storage.config')

const authMiddleware = require('../middlewares/auth.middleware')

const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')
const postsController = require('../controllers/posts.controller')

router.get('/', (req, res, next) => {
  console.log('hola');
  res.status(200).json({ ok: true })
})

/* Auth */

router.post('/login', authMiddleware.isNotAuthenticated, authController.login)

/* Users */

router.post('/users',upload.single('image'), authController.create)
router.get('/users', authMiddleware.isAuthenticated, usersController.list)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', usersController.getUserById)
router.patch('/users/:id', usersController.updateUser)

/* Posts */

router.post('/posts',upload.single('image'), authMiddleware.isAuthenticated, postsController.create)
router.get('/posts/:id', postsController.detail)
router.get('/posts', postsController.list)
router.put('/posts/:id', authMiddleware.isAuthenticated, postsController.update)
router.delete('/posts/:id', authMiddleware.isAuthenticated, postsController.delete)


module.exports = router 