function init(client) {
    async function addActivityToRoutine({
        routineId,
        activityId,
        count,
        duration
    }) {

    }

    async function updateRoutineActivity(id, fields = {}) {

    }

    async function destroyRoutineActivity(id) {

    }

    return {
        addActivityToRoutine,
        updateRoutineActivity,
        destroyRoutineActivity
    }
}

module.exports = init;