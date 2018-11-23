let dbData = {
  selectall: function (name, callback) {
    let mongoose = require('mongoose')
    let databaseName = 'mongodb://localhost:27017/blessings'
    mongoose.connect(databaseName, (err, db) => {
      if (err) {
        return err
      }
      let collection = db.collection(name)
      collection.find({}).toArray((err, result) => {
        if (err) {
          console.log('error:' + err)
          return false
        }
        callback(result)
      })
    })
  }
}

module.exports = dbData
