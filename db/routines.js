function init(client) {
    async function createRoutine({
        creatorId,
        public,
        name,
        goal
    }) {
        try {
            const {rows: [routine]} = await client.query(`
            INSERT INTO routines("creatorId", public, name, goal) 
            VALUES($1, $2, $3, $4) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
            `, [creatorId, public, name, goal]);
            
            return routine;
        } catch(error) {
            throw error;
        }
    }

    async function getAllRoutines() {
        const { rows } = await client.query(
          `SELECT id, "creatorId", public, name, goal 
          FROM routines;
        `);
      
        return rows;
      }

    async function getPublicRoutines() {
        const {rows} = await client.query(`
            SELECT * FROM routines 
            WHERE public=true;
        `);

        return rows;
    }

    // async function getAllRoutinesByUser({creatorId}) {
    //     const {rows: [routine]} = await client.query(`
    //         SELECT *
    //         FROM routines
    //         WHERE "creatorId"=$1;
    //     `, [creatorId]);
    // }

    async function updateRoutine(id, fields = {}) {
        const setString = Object.keys(fields).map(
            (key, index) => `"${key}"=$${index + 1}`
        ).join(', ');

        if(setString.length === 0) {
            return;
        }

        try {
            const {rows: [routine]} = await client.query(`
            UPDATE routines
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
            `, Object.values(fields));

            return routine;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        createRoutine,
        getAllRoutines,
        getPublicRoutines,
        updateRoutine
    }
}

module.exports = init;