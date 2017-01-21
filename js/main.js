var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('bg0', 'assets/basic-bg.png');
    game.load.image('room', 'assets/room.jpg');
    game.load.spritesheet('heart-beat', 'assets/heart-sprite.png', 100, 100);
    game.load.spritesheet('cat', 'assets/catwalk1.png', 100, 100); 
}

function create() {
    points = 0;
    
    room = game.add.sprite(0,0, 'room');
    room.width = 800;
    room.height = 600;

    heart = game.add.sprite(500, game.height - 75, 'heart-beat');
    heart.animations.add('beating', [0, 1], 1.5, true, true);
    heart.scale.setTo(.5,.5);
    
    //cat =   game.add.sprite(700, 300, 'cat');
    //cat.animations.add('left', [0, 1], 2, true, true);

    //cat.scale.setTo(.75,.75);
    cat = new Cat(new Phaser.Point(700, 300));
    points = 1;
    
    pointsText = game.add.text(game.width - 200, game.height - 70,
        points);
}

function update() {
    cat.animations.play('left');
    heart.animations.play('beating');
    cat.x -= 2;
    if(cat.x < 200) {
        cat.y = 200 + game.rnd.realInRange(20, 80);
        cat.x = 800;
        points += 10;
        pointsText.text = points;
    }
}

// Returns collection of lanes
function Lanes() {

}

// Returns a lane with all the necessary attributes
function Lane() {

}

/*
    This returns a cat object with the specified attributes.
    Level 
*/
function Cat(type, speed, hp, size) {

    lane = lanes[game.rnd.realInRange(0, 4)];
    spawn = lane.spawner.spawnPos();
    cat = game.add.sprite(spawn.x, spawn.y, 'cat');
    cat.animations.add('left', [0, 1], 2, true, true);
    cat.scale.setTo(.75,.75);

    cat.catProps = {

        // from constructorparams
        "type": type, 
        "speed": speed,
        "level": level,
        "size": size,
        "hp": hp,

        // randomly assigned in constructor
        "lane": lane,

    };

    return cat;
}
