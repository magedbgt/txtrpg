//currentRoom title and desc
function showDescription(screen){
    if(screen == 'game'){
        //debugger;
        let plusDesc = '';
        if(rooms[currentRoom].items != undefined && !rooms[currentRoom].items.taken){
            plusDesc += rooms[currentRoom].items.description;
        }
        if(rooms[currentRoom].target != undefined && !rooms[currentRoom].target.dead){
            plusDesc += rooms[currentRoom].target.description;
        }
        gameTextUpdate(rooms[currentRoom].title);
        gameTextUpdate(rooms[currentRoom].description+plusDesc);

    }else if(screen == 'start'){
        gameTextUpdate('Start Game');
        gameTextUpdate('Load Game');

    }else if(screen == 'nameChar'){
        gameTextUpdate('Name your character:');
        gameTextUpdate('Type Name + Name of your character (e.g.: Name Adventurer)');
    }else if(screen == 'death'){
        gameTextUpdate('You died!');
        gameTextUpdate('-------');
        gameTextUpdate('Start Game');
        gameTextUpdate('Load Game');
    }
    gameTextUpdate('-------');
}


//save game
function saveGame(){
    let whatToSave = [
        {
            name:'currentRoom',
            var: currentRoom
        },
        {
            name:'backRoom',
            var: backRoom
        },
    ];
    for(let i = 0; i < whatToSave.length; i++){
        localStorage.setItem(whatToSave[i].name, whatToSave[i].var);
    }
    gameTextUpdate('Game saved!');
    gameTextUpdate('-------');
}

//load game
function loadGame(){
    currentRoom = localStorage.currentRoom;
    backRoom = localStorage.backRoom;
    $("#game-text").html('');
    gameTextUpdate('Game loaded!');
    gameTextUpdate('-------');
    showDescription();
}

//help
function showHelp(){
    // gameTextUpdate('Here are the possible commands:');
    for(let i = 0; i < commands.length; i++){
        gameTextUpdate(commands[i].name+" -- "+commands[i].description);
    }
    gameTextUpdate('-------');
}

//inventory
function showInventory(){
    if(inventory.length == 0){
        gameTextUpdate('Your inventory is empty!');
        gameTextUpdate('-------');
        return;
    }
    gameTextUpdate('Your inventory has:');
    for(let i = 0; i < inventory.length; i++){
        gameTextUpdate(inventory[i]);
    }
    gameTextUpdate('-------');
}

//pick up items
function takeItem(item){
    if(rooms[currentRoom].items.name == item && !rooms[currentRoom].items.taken){
        //update inventory
        inventory.push(item);
        rooms[currentRoom].items.taken = true;

        //append
        gameTextUpdate(item+' taken!');
        gameTextUpdate('-------');
    }else{
        gameTextUpdate('There\'s no such item!');
        gameTextUpdate('-------');
    }
}

//use items
function useItem(item){
    if(!inventory.includes(item)){
        gameTextUpdate('You don\'t have this item!');
        gameTextUpdate('-------');
        return;
    }
    if(items[item].edible){
        items[item].action();
    }
    else{
        items[item].action(rooms[currentRoom].target);
    }
    gameTextUpdate('-------');

}

//change rooms
function changeRoom(dir){
    if(rooms[currentRoom].directions[dir] != undefined){
        //store back room
        backRoom = currentRoom;

        //update current room
        currentRoom = rooms[currentRoom].directions[dir];

        //append
        showDescription(screenName);
    }else{
        switch(dir){
            case 'back':
                goBack();
                break;
            default:
                gameTextUpdate('You can\' go that way!');
                gameTextUpdate('-------');
        }
    }
}

//change to previous room
function goBack(){
    if(backRoom == ''){
        gameTextUpdate('There\'s nowhere to go back!');
        gameTextUpdate('-------');
        return;
    }

   let temp;
   //temp assumes backRoom value
   temp = backRoom;

   //backRoom assumes currentRoom value
   backRoom = currentRoom;

   //currentRoom assumes backRoom value stored as temp;
   currentRoom = temp;
   showDescription(screenName);
}

function showStats(){
    gameTextUpdate('<strong>☺ '+charName+'</strong>');
    gameTextUpdate('♥ '+hp+'/'+maxHP +' hp');
    gameTextUpdate('♦ '+mp+'/'+maxMP +' mp');
    gameTextUpdate('• '+xp+' xp/ level '+level);
    gameTextUpdate('-------');
}

//player input
function playerInput(input, screen){
    //debugger;
    //input = sanitize(input);
    let command = input.split(" ")[0];
    let noun = input.split(" ")[1];
    console.log('1: '+command+' / 2: '+noun);

     if(screen == 'game'){
        switch(command){
            case 'go':
                changeRoom(noun);
                break;
            case 'take':
                takeItem(noun);
                break;
            case 'use':
                useItem(noun);
                break;
            case 'description':
                showDescription(screenName);
                break;
            case 'help':
                showHelp();
                break;
            case 'stats':
                showStats();
                break;
            case 'inventory':
                showInventory();
                break;
            case 'clear':
                $("#game-text").html('');
                showDescription(screenName);
                break;
            case 'save':
                saveGame();
                break;
            case 'load':
                loadGame();
                break;
            default:
                gameTextUpdate('Can\'t understand that :C');
                gameTextUpdate('-------');
        }
     }else if(screen == 'start' || screen == 'death'){
        switch(command){
            case 'start':
                $("#game-text").html('');
                screenName = 'nameChar';
                currentRoom = 'start';
                console.log(screenName);
                showDescription(screenName);
                break;
            case 'load':
                loadGame();
                break;
            default:
                gameTextUpdate('Can\'t understand that :C');
                gameTextUpdate('-------');
        }
     }else if(screen == 'nameChar'){
        switch(command){
            case 'name':
                $("#game-text").html('');
                screenName = 'game';
                charName = noun;
                console.log(screenName);
                showDescription(screenName);
                break;
            default:
                gameTextUpdate('Can\'t understand that :C');
                gameTextUpdate('-------');
        }
     }

}

//game init on document onload
$(document).ready(function(){
    //append
    showDescription(screenName);
    
    //keyboard event (keydown Vanilla JS)
    $(document).keypress(function(key){
        if(key.which === 13 && $('#user-input').is(':focus')){
            //user input
            let input = $('#user-input').val().toLowerCase();
            //append user input
            gameTextUpdate('input: '+sanitize(input));
            playerInput(input, screenName);
            
            //scroll to bottom of div
            $("#game-text").scrollTop($("#game-text")[0].scrollHeight);

            //clean input
            $('#user-input').val("");
        }
    });
})