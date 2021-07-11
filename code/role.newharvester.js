// forever
// if own energy is not full
// recharge

// else
// make list of containers sorted from least full to most full
// go to first in list
// empty energy into it

var roleNewHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {


        const containersWithEnergy = Game.rooms['E7S6'].find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0 });
        console.log(containersWithEnergy);
        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.say("Moving");
                creep.moveTo(sources[0]);
            }
        } else if (containersWithEnergy[0].store[RESOURCE_ENERGY] < containersWithEnergy[0].store.getCapacity) {
            if (creep.transfer(Game.structures['60cd14993235f68a9dc82d43'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
};

module.exports = roleNewHarvester;