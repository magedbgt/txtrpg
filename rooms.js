//items
let items = {
    sword:{
        name: 'sword',
        description: ' There is a <strong>sword</strong> on a rock.',
        taken: false,
        edible: false,
        damage: 5, 
        action: function(target){
            if(target == undefined || target == null){
                gameTextUpdate('There\'s no enemy!');
                return;
            }
            let hit = getRandomIntInclusive(this.damage-3, this.damage)+parseInt(atk/2);
            itemAction(hit, target);
        }
    },
    snack: {
        name: 'snack',
        description: ' There\'s a snack on the ground.',
        taken: false,
        edible: true,
        eaten: false,
        recover: 10,
        action: function(){
            recoverHP(this);
            this.eaten = true;
            let name = this.name;
            updateInventory(name);
            gameTextUpdate('The '+this.name+ ' was eaten and your HP was recovered by '+this.recover+' points!'); 
        }
    },
    potion: {
        name: 'potion',
        description: ' There\'s a potion buried.',
        taken: false,
        edible: true,
        eaten: false,
        recover: 5,
        action: function(){
            maxHP += this.recover;
            recoverHP(this);
            this.eaten = true;
            let name = this.name;
            updateInventory(name);
            gameTextUpdate('You drank the '+this.name+ '. Your HP and max HP were increased by '+this.recover+' points!');
        }
    },
    staff:{
        name:'staff',
        description: 'There\'s a <strong>staff</strong> floating in the river',
        taken: false,
        edible: false,
        damage: 7,
        action: function(target){
            if(target == undefined || target.dead){
                gameTextUpdate('There\'s no enemy!');
                return;
            }
            let hit = getRandomIntInclusive(this.damage-5, this.damage) + atkm;
            target.hp -= hit;
            itemAction(hit, target);
        }
    }
};

//items action
function itemAction(hit, target){
    gameTextUpdate('You damage the enemy by '+hit+' points!');
    
    if(target.hp <=0){
        gameTextUpdate('The ' + target.name + ' died!');
        gameTextUpdate('You received '+ target.xp +' xp!'); 
        target.dead = true;
        xp += target.xp;
        if(xp >= 15 * level){
            xp = xp - level * 15;
            level = level + 1;
        }
        return;
    }
    target.action();  
}

//targets
class enemy{
    constructor(attr){
        this.name = attr.name;
        this.strength = attr.strength;
        this.description = 'There\'s a '+this.name+ ' in the area. They seem '+this.strength;
        this.hp = attr.enemyHp;
        this.damage = attr.damage;
        this.type = attr.type;
        this.xp = attr.xp;
        this.range = attr.range;
        this.dead = attr.dead;
    }
     action () {
        let hit = getRandomIntInclusive(this.damage-this.range, this.damage);

        hp -= hit; //global hp => char's hp

        gameTextUpdate('The '+ this.name +' hit you by '+hit+' points!');

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
    troll1: {name:'Tiny Troll', enemyHP: 20+parseInt(hp/3), type: 'forest', xp: 2, damage: parseInt(4+(atk/3)), range: 3, strength: 'weak', dead: false},
    troll2: {name: 'Rock Troll', enemyHP: 4+parseInt((atk)/(level/3)), type: 'forest', xp: 20, damage: parseInt(4+(atk/3)), range: 2, strength: 'strong', dead: false},
    troll3: {name:'Lava Troll', enemyHp: 999999, type: 'Lava', xp: 999, damage: 9999, range: 0, strength: 'pretty strong', dead: false}
}

let rooms = {
    start: {
        title: '<strong>The Beginning</strong>',
        description: "You are in a dark, cold place and you see a light to <b>north</b>\
     and you hear the sound of running water to the <b>west</b>.",
        type: 'forest',
        targetEnabled: false,
        directions: {
            north: "clearing1",
            west: "bridge1"
        },
        items: items.sword
    },
    clearing1: {
        title: '<strong>Clearing</strong>',
        description: "You arrive to a clearing, you see a lighthouse to the <b>north</b>\
     and there is a strange smell coming from the <b>east</b>. Behind you, to the <b>south</b>, there\'s a dark, cold place.",
        type: 'forest',
        targetEnabled: false,
        directions: {
            south: "start",
            north: "lighthouse",
            east: "trolls"
        },
        items: items.potion
    },
    lighthouse: {
        title: '<strong>Lighthouse</strong>',
        description: "You arrive to the lighthouse and walk up to the door. A strange old lady\
     opens the door. There is a clearing to the <b>south</b>. What do you do? ",
        type: 'forest',
        targetEnabled: true,
        directions: {
            south: "clearing1"
        }
    },
    trolls: {
        title: '<strong>Trolls</strong>',
        description: "You come from the <b>west </b> and arrive to another clearing. ",
        type: 'forest',
        targetEnabled: true,
        directions: {
            west: "clearing1"
        },
        items: items.staff,
    },
    bridge1: {
        title: '<strong>River Bank</strong>',
        description: "You see a river and there is a bridge to the <b>west</b>. You came from that dark, cold place to the <b>south</b>.",
        type: 'forest',
        targetEnabled: true,
        directions: {
            east: "start",
            west: "bridge2"
        },
        items: items.snack
    },
    bridge2: {
        title: '<strong>Troll Brigde</strong>',
        description: "You are at the bridge, and the river bank you came from is to the <b>east</b>.",
        type: 'forest',
        targetEnabled: true,
        directions: {
            east: "bridge1"
        },
        target: targets.troll1
    }
}

  