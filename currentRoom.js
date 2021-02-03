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

//randomizing numbers
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//preventing tags
function sanitize(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

//facilitate append
function gameTextUpdate(text){
    $('#game-text').append('<p> >> '+text+'</p>');
}

//randomize 2 integers (inclusive)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //hp recover
  function recoverHP(item){
    hp += item.recover;
    if(hp>maxHP){
        hp = maxHP;
    }
  }

  //update inventory
  function updateInventory(name){
    inventory = inventory.filter(function(value){ return value != name;});
  }

   //random target matches property
   function spawnTarget(room){
     //rooms[currentRoom].type;
    const possibleTargets = Object.fromEntries(Object.entries(targets).filter(([key, value]) => value.type === room.type))

    if(room.targetEnabled){
      
      const keys = Object.keys(possibleTargets);
      const index = getRndInteger(0, keys.length);
      room.target = possibleTargets[keys[index]];
    }
  }

const newTarget = (id,name, description, dead, hp, damage, action) => {
    let newObj = {
        name: name,
        description: description,
        dead: dead,
        hp: hp,
        damage: damage,
        action: action
    }
    targets[id] = newObj;
}
//newTarget("mage1","mage","fofa",false,1000000,999999999999,teste);

//targets.mage1.action();
