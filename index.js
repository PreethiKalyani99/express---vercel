const createError = require('http-errors')
const express = require('express')
const path = require('path')
const app = express()
const PORT = 4000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const homeRouter = require('./routes/home')
const usersRouter = require('./routes/users')
const echoRouter = require('./routes/echo')

app.use('/', homeRouter)
app.use('/users', usersRouter)
app.use('/echo', echoRouter)

app.use(function(req, res, next) {
    next(createError(404))
})
  
app.use(function(err, req, res, next) {
res.locals.message = err.message
res.locals.error = req.app.get('env') === 'development' ? err : {}

res.status(err.status || 500)
res.render('error')
})
  
app.listen(PORT, () => console.log("Listening at ", PORT))

module.exports = app 