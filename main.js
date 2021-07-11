// Imports all role files
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTransporter = require('role.transporter');

// Global limits on roles of creeps, edit as needed
let builderLimit = 1;
let harvesterLimit = 2;
let repairerLimit = 1;
let upgraderLimit = 1;
let transporterLimit = 0;

module.exports.loop = function() {

    // Clear creep names out of memory
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Count number of each role of creep
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');


    // Spawn replacement creeps
    
    if (harvesters.length < harvesterLimit) {
        var newName = 'Harvester' + Game.time;
        let canSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester' }, dryRun: true });
        if (canSpawn == 0) {
            console.log('Spawning new Harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester' } });
        } else {
            console.log("Can't afford to spawn a Harvester");
        };
    }
    
    if (upgraders.length < upgraderLimit) {
        var newName = 'Upgrader' + Game.time;
        let canSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'upgrader' }, dryRun: true });
        if (canSpawn == 0) {
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader' } });
        } else {
            console.log("Can't afford to spawn a Upgrader");
        };
    }
    
    if (repairers.length < repairerLimit) {
        var newName = 'Repairer' + Game.time;
        let canSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'repairer' }, dryRun: true });
        if (canSpawn == 0) {
            console.log('Spawning new Repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'repairer' } });
        } else {
            console.log("Can't afford to spawn a Repairer");
        };
    }
    
    if (builders.length < builderLimit) {
        var newName = 'Builder' + Game.time;
        let canSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder' }, dryRun: true });
        if (canSpawn == 0) {
            console.log('Spawning new Builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'builder' } });
        } else {
            console.log("Can't afford to spawn a Builder");
        };
    }

    if (transporters.length < transporterLimit) {
        var newName = 'Transporter' + Game.time;
        let canSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'transporter' }, dryRun: true });
        if (canSpawn == 0) {
            console.log('Spawning new Transporter: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'transporter' } });
        } else {
            console.log("Can't afford to spawn a Transporter");
        };
    }

    // Run Creeps
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
        if (creep.memory.role == 'runnerr') {
            roleRunner.run(creep);
        }
    }
    console.log("All is fine");
}