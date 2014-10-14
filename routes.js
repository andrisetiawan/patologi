var index = require('./app/controllers/index')
var notificationsController = require('./app/controllers/notificationsController')


module.exports = function(app) {
  app.use('/', index)

  // Notification
  app.get(    '/notifications', notificationsController.getNotifications)
  app.post(   '/notifications', notificationsController.createNotification)

  // Catch undefined routes
  catchError(app)
}

var catchError = function(app) {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // development error handler. will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: err
      })
    })
  }

  // production error handler. no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {}
    })
  })
}
