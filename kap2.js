// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});
var block, trash, right, wrong, counter_wrong, counter_right, trashtype, act_tonne, active, game_length, speed, missed, mistakes, trashname, mistake_count;
var percentage = 0;

// Load assets
function preload() {
    game.load.image('restmuell_tonne', 'assets/restmuell_tonne.png');
    game.load.image('papiermuell_tonne', 'assets/papiermuell_tonne.png');
    game.load.image('glas_tonne', 'assets/glas_tonne.png');
    game.load.image('gelber_sack_tonne', 'assets/gelber_sack_tonne.png');
    game.load.image('biomuell_tonne', 'assets/biomuell_tonne.png');
    game.load.image('sondermuell_tonne', 'assets/sondermuell_tonne.png');

    game.load.image('restmuell', 'assets/restmuell_labeled.png');
    game.load.image('papiermuell', 'assets/papiermuell_labeled.png');
    game.load.image('glas', 'assets/glas_labeled.png');
    game.load.image('gelber_sack', 'assets/gelber_sack_labeled.png');
    game.load.image('biomuell', 'assets/biomuell_labeled.png');
    game.load.image('sondermuell', 'assets/sondermuell_labeled.png');

    game.load.image('Apfel', 'assets/muell/bio/apfel.png');
    game.load.image('Teebeutel', 'assets/muell/bio/teebeutel.png');

    game.load.image('Brot', 'assets/muell/bio/brot.png');
    game.load.image('Fischgraete', 'assets/muell/bio/fischgraete.png');
    game.load.image('Gemuese', 'assets/muell/bio/gemuese.png');
    game.load.image('Laub', 'assets/muell/bio/laub.png');
    game.load.image('Bananenschale', 'assets/muell/bio/bananenschale.png');

    game.load.image('Glasflasche', 'assets/muell/glas/glasflasche.png');
    game.load.image('Nutelloglas', 'assets/muell/glas/nutello.png');
    game.load.image('Weinflasche', 'assets/muell/glas/weinflasche.png');

    game.load.image('Duschgel', 'assets/muell/gruener_punkt/duschgel.png');
    game.load.image('Joghurtbecher', 'assets/muell/gruener_punkt/joghurtbecher.png');
    game.load.image('Konserve', 'assets/muell/gruener_punkt/konserve.png');
    game.load.image('Plastikbeutel', 'assets/muell/gruener_punkt/plastikbeutel.png');
    game.load.image('Tetrapack', 'assets/muell/gruener_punkt/tetrapack.png');

    game.load.image('Briefumschlaege', 'assets/muell/papier/briefumschlaege.png');
    game.load.image('Karton', 'assets/muell/papier/karton.png');
    game.load.image('Zeitung', 'assets/muell/papier/zeitung.png');

    game.load.image('Asche', 'assets/muell/rest/asche.png');
    game.load.image('Hundehaufen', 'assets/muell/rest/hundehaufen.png');
    game.load.image('Kugelschreiber', 'assets/muell/rest/kugelschreiber.png');
    game.load.image('Spielzeug', 'assets/muell/rest/spielzeug.png');

    game.load.image('Batterie', 'assets/muell/sonder/batterie.png');
    game.load.image('Energiesparlampe', 'assets/muell/sonder/energiesparlampe.png');



    game.load.image('background', 'assets/background.jpg');
    game.load.image('overlay', 'assets/overlay.png');
}

// Create game screen and wait for input
function create() {
    right = 0;
    wrong = 0;
    missed = 0;
    mistakes = "";
    mistake_count = 0;
    game_length = 20; // max. bitte 24 - 20 sind wohl optimal
    speed = 50;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var background = game.add.sprite(0, 0, 'background');
    // game.stage.backgroundColor = '#E6E6E6';

    createTonne();
    createBorders();
    createButtons();
    createCounter();

    trash_group = game.add.group();
    trash_group.enableBody = true;

    rest = new Array("Asche","Hundehaufen","Kugelschreiber","Spielzeug");
    papier = new Array("Briefumschlaege","Karton","Zeitung");
    gp = new Array("Konserve","Plastikbeutel","Duschgel","Joghurtbecher","Tetrapack");
    glas = new Array("Weinflasche","Nutelloglas","Glasflasche");
    bio = new Array("Apfel","Teebeutel","Laub","Gemuese","Bananenschale","Brot","Fischgraete");
    sonder = new Array("Batterie","Energiesparlampe");

    active = true;

    createTrash();
}

function createCounter() {
    var style_wrong = { font: "65px Arial", fill: "#ff0000" };
    counter_wrong = game.add.text(50, 30, ""+wrong, style_wrong);
    var style_right = { font: "65px Arial", fill: "#008500" };
    counter_right = game.add.text(650, 30, ""+right, style_right);
}

function createTrash() {
    var random1 = game.rnd.integerInRange(0, 5);
    var random2 = game.rnd.integerInRange(200, 536);
    switch(random1) {
        case 0:
            var random3 = game.rnd.integerInRange(0, rest.length - 1);
            trash = trash_group.create(random2, 0, rest[random3]);
            trashname = rest[random3];
            trashtype = "Restmuell";
            break;
        case 1:
            var random3 = game.rnd.integerInRange(0, papier.length - 1);
            trash = trash_group.create(random2, 0, papier[random3]);
            trashname = papier[random3];
            trashtype = "Papier";
            break;
        case 2:
            var random3 = game.rnd.integerInRange(0, gp.length - 1);
            trash = trash_group.create(random2, 0, gp[random3]);
            trashname = gp[random3];
            trashtype = "Gelber Punkt";
            break;
        case 3:
            var random3 = game.rnd.integerInRange(0, glas.length - 1);
            trash = trash_group.create(random2, 0, glas[random3]);
            trashname = glas[random3];
            trashtype = "Glas";
            break;
        case 4:
            var random3 = game.rnd.integerInRange(0, bio.length - 1);
            trash = trash_group.create(random2, 0, bio[random3]);
            trashname = bio[random3];
            trashtype = "Bio";
            break;
        case 5:
            var random3 = game.rnd.integerInRange(0, sonder.length - 1);
            trash = trash_group.create(random2, 0, sonder[random3]);
            trashname = sonder[random3];
            trashtype = "Sondermuell";
            break;
        default:
            break;
    }
    trash.body.gravity.y = speed;
}

function update() {
    if(active) {
        checkForBorders();
        game.physics.arcade.collide(block, trash, collisionHandler, null, this);
        if (trash.y > 600) {
            trash.kill();
            wrong++;
            missed++;
            counter_wrong.text = ""+wrong;
            if (right+wrong == game_length) {
                showResult();
            } else {
                createTrash();
            }
        }
    }
}

function collisionHandler() {
    if (trashtype == akt_tonne) {
        right++;
        counter_right.text = ""+right;
    } else {
        wrong++;
        counter_wrong.text = ""+wrong;
        if (mistake_count < 5) {
            mistakes = mistakes+"\n- "+trashname+" in "+akt_tonne+" Tonne,";
            mistakes = mistakes+"\n"+"  "+trashtype+" wäre richtig.";
            mistake_count++;
        } else {
            mistake_count++;
        }
    }
    trash.kill();

    if (right+wrong == game_length) {
        showResult();
    } else {
        createTrash();
    }
}

function showResult() {
    active = false;
    var shape = game.add.graphics(0, 0);
    shape.lineStyle(0, 0x0000FF, 1);
    shape.beginFill(0xBBBBBB, 0.7);
    shape.drawRect(0, 0, 800, 600);
    var overlay = game.add.sprite(180, 70, 'overlay');
    var style = { font: "25px Arial", fill: "#000000" };
    var text = game.add.text(210, 95, "Deine Auswertung:", style);
    style = { font: "18px Arial", fill: "#000000" };
    text = game.add.text(210, 135, "Du hast den Müll "+right+" mal richtig und \n"+wrong+" mal falsch entsorgt!", style);
    if (wrong > 0) {
        text = game.add.text(210, 190, "Und das hast du falsch entsorgt:", style);
        if (mistake_count == 6) {
            mistakes = mistakes+"\n... und 1 weiteres";
        } else if (mistake_count > 6) {
            mistakes = mistakes+"\n... und "+(mistake_count-5)+" weitere";
        }
        text = game.add.text(220, 195, mistakes, style);
    } else {
        text = game.add.text(210, 190, "Glückwunsch! Du hast keine Fehler gemacht.", style);
    }
    if (missed > 1) {
        text = game.add.text(210, 477, "Du hast leider "+missed+" Objekte verpasst!", style);
    }
    style = { font: "30px Arial", fill: "#FF0000" };
    text = game.add.text(520, 470, Math.round((right/game_length)*100)+" %", style);
    percentage = Math.round((right/game_length)*100);
}

function createTonne() {
    blocks = game.add.group();
    blocks.enableBody = true;

    block = blocks.create(game.world.centerX, 550, 'restmuell_tonne');
    akt_tonne = "Restmuell";
    block.body.immovable = true;
}

function createBorders() {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x000000, 1);
    graphics.moveTo(200, 0);
    graphics.lineTo(200, 600);
    graphics.moveTo(600, 0);
    graphics.lineTo(600, 600);
}

function createButtons() {
    var restmuell = game.add.sprite(10, 300, 'restmuell');
    var papiermuell = game.add.sprite(10, 400, 'papiermuell');
    var gelber_sack = game.add.sprite(10, 500, 'gelber_sack');

    var glas = game.add.sprite(610, 300, 'glas');
    var biomuell = game.add.sprite(610, 400, 'biomuell');
    var sondermuell = game.add.sprite(610, 500, 'sondermuell');

    restmuell.inputEnabled = true;
    restmuell.events.onInputDown.add(function() { block.loadTexture('restmuell_tonne', 0); akt_tonne = "Restmuell"; }, this);
    papiermuell.inputEnabled = true;
    papiermuell.events.onInputDown.add(function() { block.loadTexture('papiermuell_tonne', 0); akt_tonne = "Papier"; }, this);
    gelber_sack.inputEnabled = true;
    gelber_sack.events.onInputDown.add(function() { block.loadTexture('gelber_sack_tonne', 0); akt_tonne = "Gelber Punkt"; }, this);
    glas.inputEnabled = true;
    glas.events.onInputDown.add(function() { block.loadTexture('glas_tonne', 0); akt_tonne = "Glas"; }, this);
    biomuell.inputEnabled = true;
    biomuell.events.onInputDown.add(function() { block.loadTexture('biomuell_tonne', 0); akt_tonne = "Bio"; }, this);
    sondermuell.inputEnabled = true;
    sondermuell.events.onInputDown.add(function() { block.loadTexture('sondermuell_tonne', 0); akt_tonne = "Sondermuell"; }, this);
}

function checkForBorders() {
    if (game.input.x > 220 && game.input.x < 580) {
        block.x = game.input.x-20;
    } else if (game.input.x <= 200) {
        block.x = 200;
    } else if (game.input.x >= 560) {
        block.x = 560;
    }
}
