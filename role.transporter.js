// Creep that transports energy from storage to other structures
//      make list of structures sorted by energy
//      go to lowest
//      fill until empty or structure full

var roleTransporter = {
    run: function(creep) {
        let room = Game.rooms['E7S6'];
        creep.say("running");
        // if empty
        if (creep.store.getFreeCapacity() == 50) {
            creep.say("Need energy");
            // find a container with at least 50 energy in it
            // let containersWithEnergy = room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] >= 50 });
            // let containersWithEnergySorted = containersWithEnergy.sort(function(a, b) { return b - a });
            // if (containersWithEnergySorted.length > 0) {
            //     // move to it
            //     creep.moveTo(containersWithEnergySorted[0], { visualizePathStyle: { stroke: '#ffffff' } })
            //         // take out energy until full
            //     creep.withdraw(containersWithEnergySorted[0], RESOURCE_ENERGY);
            // } else {
                // Recharge from raw energy source
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            // }
        } else {
            creep.say("Transporting");
            // let structuresToCharge = room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.store.getCapacity()});
            // let structuresToChargeSorted = structuresToCharge.sort(function(a, b){return a-b});

            // Transfer energy from itself to the room spawn
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1'], { visualizePathStyle: { stroke: '#ffffff' } });
                // Todo: Allow this to also charge towers
            }
        }
    }
};

module.exports = roleTransporter;