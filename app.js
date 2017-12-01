const express = require('express')
const bodyParser = require('body-parser')
const HttpError = require('./errors/http-error')
const NotFoundError = require('./errors/not-found')

const app = express()

const courselistRouter = require('./controllers/courselist-controller')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/', (req, res, next) => {
//   req.send('OK')
// })

app.use('/course-lists', courselistRouter)

app.use((req, res, next) => {
  return next(new NotFoundError())
})

app.use((err, req, res, next) => {
  if (!(err instanceof HttpError)) {
    console.error(err)
    err = new HttpError(err.message || 'Unknown error')
  }

  res.status(err.statusCode)
  res.json({
    error: err
  })
})

if (!module.parent) {
  app.listen(3000, () => {
    console.log('Server launched on port 3000')
  })
}

module.exports = app
