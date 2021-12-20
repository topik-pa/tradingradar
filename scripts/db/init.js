/* eslint-disable no-undef */

/* TEST */
db = new Mongo().getDB('tradingradar_test')
db.dropDatabase()

adminUserTest = {
  user: 'tr_admin_test',
  pwd: 'testdb',
  customData: {},
  roles: [
    {
      role: 'readWrite',
      db: 'tradingradar_test'
    }
  ]
}

db.createUser(adminUserTest)
//mongodb://tr_admin_test:testdb@localhost:27017/?authSource=tradingradar_test&readPreference=primary&appname=MongoDB%20Compass&ssl=false




/* DEVELOPMENT */
db = new Mongo().getDB('tradingradar_dev')
db.dropDatabase()

adminUserDev = {
  user: 'tr_admin_dev',
  pwd: 'devdb',
  customData: {},
  roles: [
    {
      role: 'readWrite',
      db: 'tradingradar_dev'
    }
  ]
}

db.createUser(adminUserDev)
//mongodb://tr_admin_dev:devdb@localhost:27017/?authSource=tradingradar_dev&readPreference=primary&appname=MongoDB%20Compass&ssl=false




/* PRODUCTION */
/*db = new Mongo().getDB('tradingradar')
db.dropDatabase()

adminUserProd = {
  user: 'tr_admin_prod',
  pwd: 'rxqZOno8YheFURYY',
  customData: {},
  roles: [
    {
      role: 'readWrite',
      db: 'tradingradar'
    }
  ]
}

db.createUser(adminUserProd)*/
//mongodb://tr_admin_prod:proddb@localhost:27017/?authSource=tradingradar_prod&readPreference=primary&appname=MongoDB%20Compass&ssl=false

