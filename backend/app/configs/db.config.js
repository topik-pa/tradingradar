//TODO: url must be taken from env variables
module.exports = {
  url: process.env.NODE_ENV === 'test' ? 'mongodb://tr_admin_test:testdb@localhost:27017/tradingradar_test' : process.env.NODE_ENV === 'development' ? 'mongodb://tr_admin_dev:devdb@localhost:27017/tradingradar_dev' : 'mongodb+srv://tr_admin_prod:rxqZOno8YheFURYY@tradingradar.ov6kh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}