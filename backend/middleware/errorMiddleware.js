const errorHandler = (error, _, res, next) => {
   //FIX: check for bad status codes, if it's a good status code then we want to send a bad status code 
   const statusCode = res.statusCode <400 ? 500 : res.statusCode
   console.log('error middleware')

   res.status(statusCode)
   res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
   })
}

module.exports = { errorHandler}