var Notification      = require('../models/notification')
var moment = require('moment');


// GET /notifications
module.exports.getNotifications = function(request, response) {
  console.log(request.query)
  Notification.find().sort({created_at: 'desc'}).exec(function(err, notifications) {
    if(err) { 
      errorHandler(err, request, response)
    } else {
      // response.json(notifications)
      response.render('notifications', { notifications: notifications, moment: moment })
    }
  })
}

// POST /notifications
module.exports.createNotification = function(request, response) {
  var notification = new Notification()
  notification.message = JSON.stringify(request.body)
  notification.created_at = Date.now()

  notification.save(function(err, result) {
    if(err) {
      errorHandler(err, request, response)
    } else {
      response.json({ status_message: 'A new Notification has been saved.' })
    }
  })
}

// Error Handler
var errorHandler = function(error, request, response) {
  console.log(error)
  if (error.name == "CastError" && error.type == "ObjectId") {
    response.status(400).send({ message: "Invalid ObjectId." })
  } else if (error.type == '404') {
    response.status(404).send({ message: "Object not found." })
  } else {
    response.status(500).send(error)
  }
}