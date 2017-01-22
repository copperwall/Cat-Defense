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

    // Create a group to hold the cat
    this.catGroup = this.game.add.group();
    this.obstacleGroup = this.game.add.group();

    this.target = game.add.sprite(0, 0, 'tile');
    this.target.scale.setTo(1, this.game.height/this.target.height);

    game.input.onDown.add(this.placeObstacle, this, 0, this);

};

GameState.prototype.update = function() {
    // If there are fewer than MAX_CATS, launch a new one
    if (this.catGroup.countLiving() < this.MAX_CATS) {
        // Set the launch point to a random location past the right edge
        // of the stage
        var newcat = this.launchCat(this.game.width - 100,
			this.game.rnd.integerInRange(50, this.game.height-50));

        // Move cat to the center of the left edge of the stage
        this.game.physics.arcade.moveToXY(newcat, 0, this.game.width / 2);
    }


};

GameState.prototype.launchCat = function(x, y) {
    // Get the first dead cat from the catGroup :'(
    var cat = this.catGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (cat === null) {
        cat = new Cat(this.game);
        this.catGroup.add(cat);
    }

    // Revive the cat (set it's alive property to true)
    // You can also define a onRevived event handler in your cat objects
    // to do stuff when they are revived.
    cat.revive();

    // Move the cat to the given coordinates
    cat.x = x;
    cat.y = y;

    return cat;
};

var Cat = function (game, x, y) {
    var type = ['garfield',
            'marie',
            'mimi',
            'whitey'][game.rnd.integerInRange(0,3)];

    Phaser.Sprite.call(this, game, x, y, type);
    this.animations.add('left', [0, 1], 2, true, true);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(function(me, other) {
      // TODO:
      // When a cat collides with an obstacle, that obstacle should lose one
      // hit point and the cat should lose one hit point.
      //
      // This can probably be done with sprite health things. If the health
      // gets to zero, either the obstacle or the cat is kill.
      //
      // If the cat is alive after a collision it should try to move again. If
      // the obstacle is alive again, it'll collide again. This repeats until
      // one or both dies.
      //
      // If the cat survives and obstacle dies, the cat should begin moving
      // back to the target.
    });
}

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.update = function() {
    this.animations.play('left');
};

/*
    Obstacles code
*/

GameState.prototype.placeObstacle = function (t) {
    console.log(t.x, t.y);
    x = t.x;
    y = t.y;
    // Get the first dead cat from the catGroup :'(
    var obstacle = this.obstacleGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (obstacle === null) {
        obstacle = new Obstacle(this.game);
        this.obstacleGroup.add(obstacle);
    }

    // Revive the cat (set it's alive property to true)
    // You can also define a onRevived event handler in your cat objects
    // to do stuff when they are revived.
    obstacle.revive();

    // Move the cat to the given coordinates
    obstacle.x = x;
    obstacle.y = y;

    return obstacle;
}

var Obstacle = function (game, x, y) {
    console.log(x,y);
    Phaser.Sprite.call(this, game, x, y, 'yarn');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

var game = new Phaser.Game(1200, 900, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
