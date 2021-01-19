let items = {
    sword:{
        name: 'sword',
        description: ' There is a <strong>sword</strong> on a rock.',
        taken: false,
        edible: false,
        damage: 5, 
        action: function(target){
            if(target == undefined || target.dead){
                gameTextUpdate('There\'s no enemy!');
                return;
            }
            let hit = getRandomIntInclusive(this.damage-3, this.damage);
            target.hp -= hit;
            // console.log(hit);
            gameTextUpdate('You damage the enemy by '+hit+' points!');
            if(target.hp <=0){
                gameTextUpdate('The '+target.name+' died!'); 
                target.dead = true;
                return;
            }
            target.action();
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
            hp += this.recover;
            if(hp>maxHP){
                hp = maxHP;
            }
            this.eaten = true;
            let name = this.name;
            updateInventory(name);
            gameTextUpdate('The '+this.name+ 'was eaten and your HP was recovered by '+this.recover+' points!'); 
        }
    },
    potion1: {
        name: 'potion',
        description: ' There\'s a blue potion buried.',
        taken: true,
        edible: true,
        eaten: false,
        recover: 5,
        action: function(){
            maxHP += this.recover;
            this.eaten = true;
            let name = this.name;
            updateInventory(name);
            gameTextUpdate('You drank the '+this.name+ ' and your max HP was increased by '+this.recover+' points!');
        }
    }
};



// let keys = Object.keys(items);
// let taken = [];

// for(let i = 0; i < keys.length; i++){
//     if(items[keys[i]].taken){
//         taken.push(items[keys[i]].name);
//     }
// }

// console.log(keys);
// console.log(taken);

// string = 'take blue potion';
// s1 = string.split(' ')[0];
// s2 = string.split(' ')[1];
// s3 = string.split(' ')[2];

// console.log(s1);
// console.log(s2);
// console.log(s3);

// string = 'blue_potion';
// s1 = string.split('_')[0];
// s2 = string.split('_')[1];

// console.log(s1);
// console.log(s2);

let lala = ['a', 'b', 'c'];

function testa(a){
    for(let i = 0; i<a.length; i++){
        console.log(a[i]);
    }
}

testa(lala);