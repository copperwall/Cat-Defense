var CatDefense = {};

CatDefense.GameState = function(game) {
        this.MAX_CATS = 5; // number of cats
        this.MAX_YARN = 2;
        this.catsLeft = 15;
        this.health = 3;
        this.catTypes = [
         // [name, health, speed],
            ['garfield',    50, 110],
            ['marie',       60, 100],
            ['mimi',        70, 90],
            ['calico',      80, 80],
            ['fluff',       90, 70],
            ['friday',      100, 60],
            ['tabby',       110, 50],
        ];
};

CatDefense.GameState.prototype.preload = function() {
    this.game.load.image('tile', 'assets/env/tile.png');
    this.game.load.image('room', 'assets/env/room.png');
    this.game.load.spritesheet('heart', 'assets/env/heart-sprite.png', 100, 100);

    // Load items assets
    this.game.load.image('yarn', 'assets/items/yarn.png');

    // Load cat assets
    this.catTypes.forEach(function(elem, index, arr) {
        this.game.load.spritesheet(elem[0], 'assets/cats/sprite-' + elem[0] + '.png', 100, 100);
    });

    // Audio!
    this.game.load.audio('theme', 'assets/audio/theme.ogg');
    this.game.load.audio('meow', 'assets/audio/meow.ogg');
    this.game.load.audio('trill', 'assets/audio/trill.ogg');

    // Background!
    this.game.load.image('background', 'assets/background.jpg');
};

CatDefense.GameState.prototype.create = function() {
    // Set stage background
    this.game.add.image(0, 0, 'background');

    // Make transparent sprite for detecting mouse click
    clickablebg = this.game.add.sprite(0, 0);
    clickablebg.scale.setTo(game.width/clickablebg.width, game.height/clickablebg.height);
    clickablebg.inputEnabled = true;
    clickablebg.input.priorityID = 0;
    clickablebg.events.onInputDown.add(this.placeObstacle, this, 0, this);

    // Create a group to hold the cat
    this.catGroup = this.game.add.group();
    this.obstacleGroup = this.game.add.group();

    this.theme = this.game.add.audio('theme');
    meow = this.game.add.audio('meow');
    trill = this.game.add.audio('trill');
    // Loop theme forever
    this.theme.loopFull(0.1);

    this.catsLeftText = this.game.add.text(this.game.width - 270, 20, "Cats left: " + this.catsLeft);

    // Setup pause button
    var pause_btn = this.input.keyboard.addKey(27);
    pause_btn.onDown.add(this.togglePause, this);

    // Add ammo tracker
    var yarnTile = this.game.add.image(10, 10, 'tile');
    yarnTile.scale.setTo(2, 1);

    var yarnIcon = this.game.add.image(20, 20, 'yarn');
    yarnIcon.scale.setTo(.8, .8);

    ammocount = this.MAX_YARN;
    ammotext = this.game.add.text(90, 30, this.ammocount);

    // Add ammo tracker
    var healthTile = this.game.add.image(120, 10, 'tile');
    healthTile.scale.setTo(2, 1);

    this.healthIcon = this.game.add.sprite(150, 10, 'heart');
    this.healthIcon.animations.add('beat', [0, 1], 0.5, true, true);
    this.healthIcon.scale.setTo(.8, .8);

    this.healthText = this.game.add.text(230, 30, this.health);
};

CatDefense.GameState.prototype.update = function() {
    ammotext.text = ammocount;

    this.healthIcon.animations.play('beat');

    // If there are fewer than MAX_CATS, launch a new one
    if (this.catGroup.countLiving() < this.MAX_CATS) {
        // Set the launch point to a random location past the right edge
        // of the stage
        var newcat = this.launchCat(this.game.width - 100 + this.game.rnd.integerInRange(1, 200),
			this.game.rnd.integerInRange(50, this.game.height-50));

        // Move cat to the center of the left edge of the stage
        //console.log(newcat);
        this.game.physics.arcade.moveToXY(newcat, 0, this.game.width / 2);
    }

    this.game.physics.arcade.collide(this.catGroup, this.obstacleGroup);
};

CatDefense.GameState.prototype.togglePause = function() {
   if (game.physics.arcade.isPaused) {
      this.pauseText.destroy();
      game.physics.arcade.isPaused = false;
   } else {
      this.pauseText = game.add.text(game.world.centerX - 100, game.world.centerY, "Pawsed", {
        font: "65px Arial",
        fill: "#ffffff",
        align: "center"
      });
      game.physics.arcade.isPaused = true;
   }
};

CatDefense.GameState.prototype.launchCat = function(x, y) {
    // Get the first dead cat from the catGroup :'(
    var cat = this.catGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (cat === null) {
        cat = new Cat(this.game);
        this.catGroup.add(cat);
    } else {
        this.catsLeft--;
        this.catsLeftText.setText("Cats Left: " + this.catsLeft);

        if (this.catsLeft == 0) {
            // End game
            this.togglePause();
        }
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

CatDefense.GameState.prototype.loseHealth = function() {
   this.health--;

   this.healthText.setText(this.health);

   if (this.health == 0) {
      // endgame
      this.togglePause();
   }
}

var Cat = function (game, x, y) {
    var state = CatDefense.getCurrentState();
    var numTypes = state.catTypes.length;
    var catType = state.catTypes[game.rnd.integerInRange(0,numTypes-1)];
    console.log(catType);

    Phaser.Sprite.call(this, game, x, y, catType[0]);
    this.health = catType[1];
    [[0,1],[1,0]][game.rnd.integerInRange(0,1)];
    this.animations.add('left', [0, 1], 2, true, true);

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(function(me, other) {
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
      meow.play();
      me.damage(35);
      other.damage(50);

      if (me.alive) {
         var timer = game.time.create(false);
         timer.add(500, function(cat) {
            this.physics.arcade.moveToXY(cat, 0, this.width / 2, catType[2]);
         }, game, me);
         timer.start();
      }
    });
}

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.update = function() {
    if (this.x < 100) {
      trill.play();
      this.kill();

      CatDefense.getCurrentState().loseHealth();
    }

    this.animations.play('left');
};

/*
    Obstacles code
*/

CatDefense.GameState.prototype.placeObstacle = function (sprite, pointer) {
    var x = pointer.x;
    var y = pointer.y;
    // Get the first dead cat from the catGroup :'(
    var obstacle = this.obstacleGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (obstacle === null) {
      if (this.obstacleGroup.length < this.MAX_YARN) {
         obstacle = new Obstacle(this.game);
         this.obstacleGroup.add(obstacle);
      } else {
         return;
      }
    }

    // Revive the cat (set it's alive property to true)
    // You can also define a onRevived event handler in your cat objects
    // to do stuff when they are revived.
    obstacle.revive();

    // Move the cat to the given coordinates
    obstacle.x = x;
    obstacle.y = y;

    // Accounting
    ammocount -= 1;

    return obstacle;
}

var Obstacle = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'yarn');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.events.onKilled.add(function() {
        ammocount += 1;
    });
    this.inputEnabled = true;
    this.input.priorityID = 1;
    this.events.onInputDown.add(function (elem) {
        elem.kill();
    }, this);
    this.anchor = new Phaser.Point(.5,.5);
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

// Start State
CatDefense.StartState = function(game) {

}

// Endgame State
// Pass win or loss boolean when starting the state, handle in init
CatDefense.EndState = function(game) {

}

CatDefense.EndState.prototype.init = function() {

}

CatDefense.getCurrentState = function () {
    return game.state.states[game.state.current];
}

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
game.state.add('game', CatDefense.GameState, true);
