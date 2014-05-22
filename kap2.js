// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});
var block;

// Load assets
function preload() {
    game.load.image('1', 'assets/black_40_40.png');
    game.load.image('2', 'assets/red_40_40.png');
    game.load.image('3', 'assets/blue_40_40.png');
    game.load.image('4', 'assets/green_40_40.png');
    game.load.image('5', 'assets/orange_40_40.png');
}

// Create game screen and wait for input
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    game.stage.backgroundColor = '#E6E6E6';

    things = game.add.group();
    things.enableBody = true;

    for (var i = 1; i < 6; i++) {
        var thing = things.create(i * 100, i * 5, i);
        thing.body.gravity.y = 300;
        thing.body.bounce.y = 0.8 + Math.random() * 0.2;
        thing.body.collideWorldBounds = true;
    }

    blocks = game.add.group();
    blocks.enableBody = true;
    block = blocks.create(70, 300, '1');
    block.body.immovable = true;
}

function update() {
    game.physics.arcade.collide(blocks, things);
    game.physics.arcade.collide(things, things);

    block.body.velocity.x = 0;
    block.body.velocity.y = 0;
    if (cursors.left.isDown) {
        block.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        block.body.velocity.x = 150;
    } else if (cursors.up.isDown) {
        block.body.velocity.y = -150;
    } else if (cursors.down.isDown) {
        block.body.velocity.y = 150;
    }
}
