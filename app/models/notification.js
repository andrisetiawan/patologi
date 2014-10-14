var mongoose     = require('mongoose')
var Schema       = mongoose.Schema;

var NotificationSchema   = new Schema({
  message     : { type: String, default: '' },
  created_at  : { type: Date },
  updated_at  : { type: Date }
})

module.exports = mongoose.model('Notification', NotificationSchema)