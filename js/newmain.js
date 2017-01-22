var GameState = function(game) {
        this.MAX_CATS = 3; // number of cats
};

GameState.prototype.preload = function() {
    this.game.load.image('tile', 'assets/env/tile.png');
    this.game.load.image('room', 'assets/env/room.png');
    this.game.load.spritesheet('heart', 'assets/env/heart-sprite.png');

    // Load items assets
    this.game.load.image('yarn', 'assets/items/yarn-small.jpg');

    // Load cat assets
    this.game.load.spritesheet('garfield', 'assets/cats/garfield-sprite.png', 100, 100);
    this.game.load.spritesheet('marie', 'assets/cats/marie-sprite.png', 100, 100);
    this.game.load.spritesheet('mimi', 'assets/cats/mimi-sprite.png', 100, 100);
    this.game.load.spritesheet('whitey', 'assets/cats/whitey-sprite.png', 100, 100);
};

GameState.prototype.create = function() {
    // Set stage background to something sky colored
    this.game.stage.backgroundColor = 0x4488cc;

    // Create a group to hold the missile
    this.catGroup = this.game.add.group();
    this.target = game.add.sprite(0, 0, 'tile');
    this.target.scale.setTo(1, this.game.height/this.target.height);
};

GameState.prototype.update = function() {
    // If there are fewer than MAX_MISSILES, launch a new one
    if (this.catGroup.countLiving() < this.MAX_CATS) {
        // Set the launch point to a random location below the bottom edge
        // of the stage
        var newcat = this.launchCat(this.game.width - 100, 
			this.game.rnd.integerInRange(50, this.game.height-50));
		this.game.physics.arcade.moveToObject(newcat, this.target);
    }
};

GameState.prototype.launchCat = function(x, y) {
    // // Get the first dead missile from the missileGroup
    var cat = this.catGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (cat === null) {
        cat = new Cat(this.game);
        this.catGroup.add(cat);
    }

    // Revive the missile (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    cat.revive();

    // Move the missile to the given coordinates
    cat.x = x;
    cat.y = y;

    return cat;
};

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

var game = new Phaser.Game(1200, 900, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
