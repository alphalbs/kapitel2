// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div', {preload: preload, create: create});

// Load assets
function preload() {
    game.load.image('einstein', 'assets/einstein.png');
}

// Create game screen and wait for input
function create() {
    game.add.sprite(0, 0, 'einstein');
}
