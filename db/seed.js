const {
  client,
  getAllUsers,
  createUser,
  createActivity,
  getAllActivities,
  updateActivity,
  createRoutine,
  getAllRoutines,
  getPublicRoutines,
  updateRoutine
} = require('./index.js');

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS activities CASCADE;
      DROP TABLE IF EXISTS routines CASCADE;
    `)

    console.log("tables dropped")
  } catch (error) {
    console.log("ERROR DURING dropTables: ")
    console.error(error);
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
    `);

    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id),
        public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        "routineId" INTEGER REFERENCES routines(id),
        "activityId" INTEGER REFERENCES activities(id),
        duration INTEGER,
        count INTEGER,
        UNIQUE ("routineId", "activityId")
      )
    `)

    console.log("tables created")
  } catch (error) {
    console.log("ERROR DURING createTables: ")
    console.error(error);
  }
}

async function createInitialUsers() {
  try {
    const ironman = await createUser({ username: "ironman", password: "stark"});
    const captain = await createUser({ username: "captain", password: "rogers"});
    const thor = await createUser({ username: "thor", password: "odinson"});
    const hulk = await createUser({ username: "hulk", password: "banner"});
  } catch(error) {
    console.log("ERROR DURING createInitialUsers: ")
    console.error(error);
  }
}

async function createInitialActivities() {
  try {
    const shieldThrow = await createActivity({
      name: "Shield Throw",
      description: "The star-spangled round shield."
    });
    const hammerThrow = await createActivity({
      name: "Hammer Throw",
      description: "Throw Mjolnir!"
    });
    const repulsorRay = await createActivity({
      name: "Repulsor Ray",
      description: "Shoot a hand beam!"
    });

  } catch(error) {
  console.log("ERROR DURING dropTables: ")
    console.error(error);
  }
}

async function createInitialRoutines() {
  try {
    const [ironman, captain, thor] = await getAllUsers();

    const bootCamp = await createRoutine({
      creatorId: captain.id,
      public: true,
      name: "Boot Camp",
      goal: "Putting my military training to use."
    });

    const practicalUse = await createRoutine({
      creatorId: thor.id,
      public: false,
      name: "Practical Use",
      goal: "Get out on the the battlefield and show me what you got!"
    });

    const cardio = await createRoutine({
      creatorId: ironman.id,
      public: true,
      name: "Cardio",
      goal: "Good for the heart."
    });

  } catch(error) {
  console.log("ERROR DURING dropTables: ")
    console.error(error);
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialActivities();
    await createInitialRoutines();
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  try {
    // const users = await getAllUsers();
    // console.log("users: ", users);

    // const activities = await getAllActivities();
    // console.log("activities: ", activities);

    // const updateActivityResult = await updateActivity(activities[0].id, {
    //   name: "Fastball Special",
    //   description: "Team move including a team member throwing another."
    // })
    // console.log("updated activity: ", updateActivityResult);

    const routines = await getAllRoutines();
    console.log("routines: ", routines);

    // const publicRoutines = await getPublicRoutines();
    // console.log("public routines: ", publicRoutines);

    const updateRoutineResult = await updateRoutine(routines[0].id, {
      public: false,
      name: "Archery Training",
      goal: "Get familiar with ranged attacks."
    })
    console.log("updated routine: ", updateRoutineResult);
  } catch (error) {
    console.error("ERROR DURING TESTING: ", error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());