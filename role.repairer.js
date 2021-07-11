// Creep that seeks out and repairs broken structures

var roleRepairer = {
    run: function(creep) {

        // If not fully loaded with energy
        if (creep.store.getFreeCapacity() > 0) {
            // Find energy sources and load up on energy
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.say("Moving");
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            // find damaged structures
            const targets = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax });
            // Sort structures
            targets.sort((a, b) => a.hits - b.hits);
            // As long as there is a structure to repair, travel to the first one and repair it
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.say("Moving");
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
                creep.say("Repairing");
                creep.repair(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

module.exports = roleRepairer;