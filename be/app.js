import express from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import indexRouter from "./routes/index.js"
import usersRouter from "./routes/users.js"
import http from "http"
import cors from "cors"

const app = express()
const server= http.createServer(app)
// view engine setup

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use(usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

server.listen(4000, ()=> console.log("Server run on port 4000"))
