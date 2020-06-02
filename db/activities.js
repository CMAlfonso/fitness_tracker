function init(client) {
    async function createActivity({
        name,
        description
    }) {
        try {
            const {rows: [activity]} = await client.query(`
            INSERT INTO activities(name, description) 
            VALUES($1, $2) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
            `, [name, description]);
            
            return activity;
        } catch(error) {
            throw error;
        }
    }

    async function getAllActivities() {
        const { rows } = await client.query(
        `SELECT id, name 
        FROM activities;
        `);
    
        return rows;
  }

    async function updateActivity(id, fields = {}) {
        const setString = Object.keys(fields).map(
            (key, index) => `"${key}"=$${index + 1}`
        ).join(', ');

        if(setString.length === 0) {
            return;
        }

        try {
            const {rows: [activity]} = await client.query(`
            UPDATE activities
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
            `, Object.values(fields));

            return activity;
        } catch (error) {
            console.error(error);
        }
    }

  return {
      createActivity,
      getAllActivities,
      updateActivity
  }
}

module.exports = init;