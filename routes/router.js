const express = require('express')
const Bookmark = require('../models/Bookmark')
const router = express.Router()
const User = require('../models/User')
const Logger = require('../Logger')

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/profile', (req, res, next) => {
  // try to find an existing session
  User.findById(req.session.userId).exec((error, user) => {
    if (error) {
      return next(error)
    }
    if (user === null) {
      // if there is no session, tell the user they are unauthorized
      var err = new Error('Not authorized! Go back!')
      Logger.log(`AUTH: User not authorized.`)
      err.status = 400
      return next(err)
    } else {
      // if there is a session, then load the user's bookmarks
      // and redirect to the profile page
      Bookmark.find({}, (err, bookmarks) => {
        if (err) return res.render('profile', { user, bookmarks: [] })
        return res.render('profile', { user, bookmarks })
      })
    }
  })
})

router.post('/profile', (req, res, next) => {
  console.log(req.body)
  if (req.body.password !== req.body.passwordConf) {
    // registration error
    var err = new Error('Passwords do not match.')
    err.status = 400
    return next(err)
  } else if (req.body.email && req.body.password) {
    // registration success
    var userData = { email: req.body.email, password: req.body.password }
    User.create(userData, (error, user) => {
      if (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
          var err = new Error('User already exists!')
          Logger.log(`ERROR: User registration failed for ${req.body.email}`)
          err.status = 401
          return next(err)
        }
        return next(error)
      }
      else {
        Logger.log(`AUTH: User created for ${req.body.email}`)
        req.session.userId = user._id
        return res.redirect('/profile')
      }
    })
  } else if (req.body.logemail && req.body.logpassword) {
    // user login
    User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
      if (error || !user) {
        var err = new Error('Wrong email or password.')
        Logger.log(`ERROR: Wrong email or password for ${req.body.logemail}`)
        err.status = 401
        return next(err)
      } else {
        req.session.userId = user._id
        Logger.log(`AUTH: Log in for ${req.body.logemail}`)
        return res.redirect('/profile')
      }
    })
  } else {
    var err = new Error('All fields required.')
    err.status = 400
    return next(err)
  }
})

router.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/')
      }
    })
  }
})

router.post('/add', (req, res, next) => {
  if (req.body.title && req.body.url && req.body.rating) {
    // if the bookmark properties are present
    var { title, url, rating } = req.body
    const bookmarkData = { title, url, rating }
    // create the bookmark with the user provided data
    Bookmark.create(bookmarkData, (error, bookmark) => {
      if (error) {
        var err = new Error(error)
        Logger.log(`ERROR: Bookmark creation error for ${req.body.url}`)
        err.status = 401
        return next(err)
      }
      else {
        Logger.log(`DB: Bookmark created for ${req.body.url}`)
        return res.redirect('/profile')
      }
    })
  } else {
    var err = new Error('Invalid data')
    Logger.log('ERROR: Bookmark data error')
    err.status = 401
    return next(err)
  }
})

router.get('/search', (req, res, next) => {
  if (req.query.q) {
    // if there is a proper query parameter
    var searchTerm = req.query.q
    // TODO: add this line
    // searchTerm = encodeURI(searchTerm) 
    Logger.log(`DB: query for ${searchTerm}`)
    // make the search case insensitive
    const searchRegex = new RegExp(searchTerm, 'i')
    // find and return the matching bookmarks
    Bookmark.find({ title: searchRegex }, (err, bookmarks) => {
      if (err) return res.render('search', { bookmarks: [] })
      return res.render('search', { bookmarks })
    })
  } else {
    // if there is not a proper query parameter
    var err = new Error('Search term is required.')
    err.status = 400
    return next(err)
  }
})


module.exports = router