var game = new Phaser.Game(1200, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    // Load env assets
    game.load.image('tile', 'assets/env/tile.png');
    game.load.image('room', 'assets/env/room.png');
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
    // The room
    room = game.add.sprite(0, 0, 'room');
    room.scale.setTo(game.width/room.width, game.height/room.height);
    
    // The thing the cats march to
    target = game.add.sprite(0, 0, 'tile');
    target.scale.setTo(1, game.height/target.height);

    // The tiles where you can place your defense
    tiles = game.add.group();
    tiles.createMultiple(50, 'tile', 0, true);
    tiles.align(10, 5, 90, 90, Phaser.CENTER);
    tiles.x = (game.width - 900)/2;
    tiles.y = (game.height - 450)/2;

    
    
    cat = launchCat(game.width, 100);
/*
    cat = game.add.sprite(game.width, 0, 'garfield');
    cat.animations.add('left', [0, 1], 2, true);
    game.physics.arcade.enable(cat);
    cat.body.velocity.x = -50;
*/
    game.physics.arcade.moveToObject(cat, target);
}

function update() {
    cat.animations.play('left');
}


function launchCat(x, y) {
    var cat = new Cat(game);
    cat.x = x;
    cat.y = y;
    return cat;
}


var Cat = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y,
        ['garfield',
         'marie',
         'mimi',
         'whitey'][game.rnd.integerInRange(0,3)]);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
}

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;





