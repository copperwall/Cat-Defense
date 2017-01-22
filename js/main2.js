var game = new Phaser.Game(1000, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    // Load env assets
    game.load.image('tile', 'assets/env/tile.png');
    game.load.iamge('room', 'assets/env/room.png');
    game.load.spritesheet('heart', 'assets/env/heart-sprite.png');

    // Load items assets
    game.load.image('yarn', 'assets/items/yarn-small.jpg');

    // Load cat assets
    game.load.spritesheet('garfield', 'assets/cats/garfield-sprite.png', 100, 100);
    game.load.spritesheet('marie', 'assets/cats/marie-sprite.png', 100, 100);
    game.load.spritesheet('mimi', 'assets/cats/mimi-sprite.png', 100, 100);
    game.load.spritesheet('whitey', 'assets/cats/whitey-sprite.png', 100, 100);

}

function create() {
    
}

function update() {
    
}


