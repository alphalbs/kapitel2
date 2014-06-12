// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});
var block, trash, right, wrong, counter_wrong, counter_right, trashtype, act_tonne;

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

    game.load.image('apfel', 'assets/muell/bio/apfel.png');
    game.load.image('teebeutel', 'assets/muell/bio/teebeutel.png');

    game.load.image('brot', 'assets/muell/bio/brot.png');
    game.load.image('fischgraete', 'assets/muell/bio/fischgraete.png');
    game.load.image('gemuese', 'assets/muell/bio/gemuese.png');
    game.load.image('laub', 'assets/muell/bio/laub.png');
    game.load.image('bananenschale', 'assets/muell/bio/bananenschale.png');

    game.load.image('braunglas', 'assets/muell/glas/braunglas.png');
    game.load.image('nutellaglas', 'assets/muell/glas/nutellaglas.png');
    game.load.image('weinflasche', 'assets/muell/glas/weinflasche.png');

    game.load.image('duschgel', 'assets/muell/gruener_punkt/duschgel.png');
    game.load.image('joghurtbecher', 'assets/muell/gruener_punkt/joghurtbecher.png');
    game.load.image('konserve', 'assets/muell/gruener_punkt/konserve.png');
    game.load.image('plastikbeutel', 'assets/muell/gruener_punkt/plastikbeutel.png');
    game.load.image('tetrapack', 'assets/muell/gruener_punkt/tetrapack.png');

    game.load.image('briefumschlaege', 'assets/muell/papier/briefumschlaege.png');
    game.load.image('karton', 'assets/muell/papier/karton.png');
    game.load.image('zeitung', 'assets/muell/papier/zeitung.png');

    game.load.image('asche', 'assets/muell/rest/asche.png');
    game.load.image('hundehaufen', 'assets/muell/rest/hundehaufen.png');
    game.load.image('kugelschreiber', 'assets/muell/rest/kugelschreiber.png');
    game.load.image('spielzeug', 'assets/muell/rest/spielzeug.png');

    game.load.image('batterie', 'assets/muell/sonder/batterie.png');
    game.load.image('energiesparlampe', 'assets/muell/sonder/energiesparlampe.png');



    game.load.image('background', 'assets/background.jpg');
}

// Create game screen and wait for input
function create() {
    right = 0;
    wrong = 0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var background = game.add.sprite(0, 0, 'background');
    // game.stage.backgroundColor = '#E6E6E6';

    createTonne();
    createBorders();
    createButtons();
    createCounter();

    trash_group = game.add.group();
    trash_group.enableBody = true;

    rest = new Array("asche","hundehaufen","kugelschreiber","spielzeug");
    papier = new Array("briefumschlaege","karton","zeitung");
    gp = new Array("konserve","plastikbeutel","duschgel","joghurtbecher","tetrapack");
    glas = new Array("weinflasche","nutellaglas","braunglas");
    bio = new Array("apfel","teebeutel","laub","gemuese","bananenschale","brot","fischgraete");
    sonder = new Array("batterie","energiesparlampe");

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
    var random2 = game.rnd.integerInRange(200, 560);
    switch(random1) {
        case 0:
            var random3 = game.rnd.integerInRange(0, rest.length - 1);
            trash = trash_group.create(random2, 0, rest[random3]);
            trashtype = "rest";
            break;
        case 1:
            var random3 = game.rnd.integerInRange(0, papier.length - 1);
            trash = trash_group.create(random2, 0, papier[random3]);
            trashtype = "papier";
            break;
        case 2:
            var random3 = game.rnd.integerInRange(0, gp.length - 1);
            trash = trash_group.create(random2, 0, gp[random3]);
            trashtype = "gp";
            break;
        case 3:
            var random3 = game.rnd.integerInRange(0, glas.length - 1);
            trash = trash_group.create(random2, 0, glas[random3]);
            trashtype = "glas";
            break;
        case 4:
            var random3 = game.rnd.integerInRange(0, bio.length - 1);
            trash = trash_group.create(random2, 0, bio[random3]);
            trashtype = "bio";
            break;
        case 5:
            var random3 = game.rnd.integerInRange(0, sonder.length - 1);
            trash = trash_group.create(random2, 0, sonder[random3]);
            trashtype = "sonder";
            break;
        default:
            trash = trash_group.create(random2, 0, apfel);
            trashtype = "bio";
            break;
    }
    trash.body.gravity.y = 50;
}

function update() {
    checkForBorders();
    game.physics.arcade.collide(block, trash, collisionHandler, null, this);
    if (trash.y > 600) {
        trash.kill();
        wrong++;
        counter_wrong.text = ""+wrong;
        createTrash();
    }
}

function collisionHandler() {
    trash.kill();
    if (trashtype == akt_tonne) {
        right++;
        counter_right.text = ""+right;
    } else {
        wrong++;
        counter_wrong.text = ""+wrong;
    }
    createTrash();
}

function createTonne() {
    blocks = game.add.group();
    blocks.enableBody = true;

    block = blocks.create(game.world.centerX, 550, 'restmuell_tonne');
    akt_tonne = "rest";
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
    restmuell.events.onInputDown.add(function() { block.loadTexture('restmuell_tonne', 0); akt_tonne = "rest"; }, this);
    papiermuell.inputEnabled = true;
    papiermuell.events.onInputDown.add(function() { block.loadTexture('papiermuell_tonne', 0); akt_tonne = "papier"; }, this);
    gelber_sack.inputEnabled = true;
    gelber_sack.events.onInputDown.add(function() { block.loadTexture('gelber_sack_tonne', 0); akt_tonne = "gp"; }, this);
    glas.inputEnabled = true;
    glas.events.onInputDown.add(function() { block.loadTexture('glas_tonne', 0); akt_tonne = "glas"; }, this);
    biomuell.inputEnabled = true;
    biomuell.events.onInputDown.add(function() { block.loadTexture('biomuell_tonne', 0); akt_tonne = "bio"; }, this);
    sondermuell.inputEnabled = true;
    sondermuell.events.onInputDown.add(function() { block.loadTexture('sondermuell_tonne', 0); akt_tonne = "sonder"; }, this);
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
