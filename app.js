const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const session = require('express-session')

const port = process.env.VIRTUAL_PORT || 3000

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.set('trust proxy', 1)
app.use(morgan('combined'))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
morganBody(app, { noColors: true, prettify: false, maxBodyLength: 8000 })

//use sessions for tracking logins
const sessionSettings = {
  secret: 'SUPERSECRET',
  resave: true,
  saveUninitialized: false,
  cookie: { sameSite: 'lax' }
}

app.use(session(sessionSettings))

mongoose.connect('mongodb://127.0.0.1:27017/testAuth',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)

var routes = require('./routes/router')
app.use('/', routes)

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message)
})


app.listen(port, () => console.log(`Server running on port ${port}`))