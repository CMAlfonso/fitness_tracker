const {Client} = require("pg");

const client = new Client("postgres://localhost:5432/fitness:dev");

// console.log(client)

module.exports = {
    client,
    ...require('./users.js')(client),
    ...require('./activities.js')(client),
    ...require('./routines')(client),
    // ...require('./routine_activities')
}