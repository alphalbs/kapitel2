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

    game.load.image('apfel', 'assets/apfel.png');

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

    createTrash();
}

function createCounter() {
    var style_wrong = { font: "65px Arial", fill: "#ff0000" };
    counter_wrong = game.add.text(50, 30, ""+wrong, style_wrong);
    var style_right = { font: "65px Arial", fill: "#008500" };
    counter_right = game.add.text(650, 30, ""+right, style_right);
}

function createTrash() {
    var random = game.rnd.integerInRange(200, 560);
    trash = trash_group.create(random, 0, 'apfel');
    trashtype = "bio";
    trash.body.gravity.y = 100;
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
    gelber_sack.events.onInputDown.add(function() { block.loadTexture('gelber_sack_tonne', 0); akt_tonne = "gelb"; }, this);
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
