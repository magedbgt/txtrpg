//global variables
let currentRoom = 'start';
let backRoom = '';
let inventory = [];
let hp = 100;
let maxHP = 100;
let mp = 50;
let maxMP = 50;
let xp = 0;
let level = 1;
let charName = 'Adventurer';
let saveGameState = 0;
let screenName = 'start';
let atk = 5;
let atkm = 2;

class enemy{
    constructor(name, enemy_hp, type, xp, damage, range, strength, dead){
        this.name = name;
        this.strength = strength;
        this.description = 'There\'s a '+this.name+ ' in the area. They seem '+this.strength;
        this.hp = enemy_hp;
        this.damage = damage;
        this.type = type;
        this.xp = xp;
        this.range = range;
        this.dead = dead;
    }
     action () {
        let hit = getRandomIntInclusive(this.damage-this.range, this.damage);

        hp -= hit; //global hp => char's hp

        gameTextUpdate('The '+this.name+' hit you by '+hit+' points!');

            if(hp<=0){
                screenName = 'death';
                showDescription(screenName);
                return; 
            }
    }

    set died (isDead){
        this.dead = isDead;
    }

    get isDead (){
        return this.dead;
    }
}

let targets = {
    troll1: new enemy('Tiny Troll', 20 + parseInt(hp/3), 'forest', 2, parseInt(4+(atk/3)), 3, 'weak', false),
    troll2: new enemy('Rock Troll', 4 + parseInt((atk)/(level/3)), 'forest', 20, parseInt(4+(atk/3)), 2, 'strong', false)
}

//console.log(targets.troll1.type);

//let trolls = targets.filter(function(value){ return value.type == 'forest';});
const trolls = Object.fromEntries(Object.entries(targets).filter(([key, value]) => value.type === 'forest'))
 // filteredByValue = {V: 5} 

//console.log(trolls);

const aaa = Object.keys(trolls);
console.log(aaa);