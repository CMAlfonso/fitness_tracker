const {
  client,
  getAllUsers,
  createUser
} = require('./index');

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
    `)

    console.log("tables dropped")
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
    `)

    console.log("tables created")
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    const ironman = await createUser({ username: "ironman", password: "stark"});
    const cap = await createUser({ username: "captain", password: "rogers"});
    const thor = await createUser({ username: "thor", password: "odinson"});
    const hulk = await createUser({ username: "hulk", password: "banner"});

    console.log(ironman, hulk)
  } catch(error) {
    console.error(error);
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  try {
    const users = await getAllUsers();
    console.log("users: ", users);
  } catch (error) {
    console.error(error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());