import express from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import indexRouter from "./routes/index.js"
import usersRouter from "./routes/users.js"
import http from "http"
import cors from "cors"
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 200, // Giới hạn 200 requests mỗi 1 phút cho mỗi IP
  message: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau.'
});

const app = express()
const server= http.createServer(app)
// view engine setup

app.use(logger('dev'))
app.use(cors({
  origin: 'https://booking.gzomedia.net'
}));
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'];

  if (userAgent && userAgent.includes('Postman')) {
      return res.status(403).send('Yêu cầu không được phép từ Postman');
  }

  next();
});
app.use(limiter);
app.use(express.json({limit: "1mb"}))
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

server.listen(4225, ()=> console.log("Server run on port 4000"))
