// Creep that harvests energy and puts it in storage

var roleHarvester = {
    run: function(creep) {
        // Define the active room
        let room = Game.rooms['E7S6'];

        // If not fully loaded, finds energy sources and fills up
        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            creep.say("I'm full");
            // Empties energy collected into the container
            let container = room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER });
            if (container.length > 0) {
                if (creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Spawn1'], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleHarvester;

// Replace above code with below code if area contains a tower to enable tower charging
// var roleHarvester = {

//     /** @param {Creep} creep **/
//     run: function(creep) {
//         if (creep.store.getFreeCapacity() > 0) {
//             var sources = creep.room.find(FIND_SOURCES);
//             if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
//             }
//         } else {
//             var targets = creep.room.find(FIND_STRUCTURES, {
//                 filter: (structure) => {
//                     return (structure.structureType == STRUCTURE_EXTENSION ||
//                             structure.structureType == STRUCTURE_SPAWN ||
//                             structure.structureType == STRUCTURE_TOWER) &&
//                         structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//                 }
//             });
//             if (targets.length > 0) {
//                 if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
//                 }
//             }
//         }
//     }
// };

// module.exports = roleHarvester;