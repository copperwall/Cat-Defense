var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('bg0', 'assets/basic-bg.png');
    game.load.image('room', 'assets/bare-room.jpg');
    game.load.image('rug', 'assets/rug.png');
    game.load.image('spawner', 'assets/spawner.png');
    game.load.image('yarn', 'assets/yarn.jpg');

    game.load.spritesheet('heart-beat', 'assets/heart-sprite.png', 100, 100);
    game.load.spritesheet('cat', 'assets/catwalk1.png', 100, 100); 

}

function create() {
    points = 0;
    
    room = game.add.sprite(0, 0, 'room');
    room.width = 800;
    room.height = 600;

    heart = game.add.sprite(500, game.height - 75, 'heart-beat');
    heart.animations.add('beating', [0, 1], 1.5, true, true);
    heart.scale.setTo(.5,.5);
    
    points = 1;
    
    lanes = Lanes(3, 650, 50);

    cat = Cat(game.width, game.height);
    p = spawnPos(lanes, 0, cat);
    console.log(p);
    cat.x = p.x;
    cat.y = p.y;
    
    pointsText = game.add.text(game.width - 200, game.height - 70,
        points);
}

function update() {
    cat.animations.play('left');
    heart.animations.play('beating');
    cat.x -= 2;
    if(cat.x < 200) {
        s = spawnPos(lanes, 0, cat);
        cat.x = s.x;
        cat.y = s.y;
        points += 10;
        pointsText.text = points;
    }
}


/*
    Group of Lanes
    Returns a group
*/
function Lanes(numLanes, laneWidth, laneHeight) {
    lanes = game.add.group();
    for(var i = 0; i < numLanes; i++) {
        lanes.add(Lane());
    }

    lanes.setAll('width', laneWidth);
    lanes.setAll('height', laneHeight);
    console.log(lanes.align(1, numLanes, laneWidth, laneHeight, Phaser.TOP_CENTER));
    lanes.x = (game.width - laneWidth)/2;
    lanes.y = (game.height - laneHeight*numLanes)/2;

    return lanes;
}

/*
    This returns a lane sprite
*/
function Lane() {
    lane = game.add.sprite(game.width, game.height, 'rug');
    return lane;
}

function spawnPos(lanes, laneNum, spawned) {
    lane = lanes.getAt(0);
    return new Phaser.Point(lane.x + lane.width,
        lane.y + game.rnd.realInRange(0,10) + lanes.y
        - spawned.height);
}

/*
    This returns a cat Sprite with the specified attributes.
    Each cat has a type and a level. With each increase of
    level, a cat's hp and speed increase. A cat's type modifies
    these characteristics.

    Types:
        A. Normal cats - no modifiers
        B. Fast cats - high speed, low hp (spd +1, hp -1),
            smaller in size
        C. Hungry cats - low speed, high hp (spd -1, hp +1),
            larger in size
    Levels:
        1. Speed 5, HP 5
        2. Speed 6, HP 6
        ...
        #. Speed 4 + #, HP 4 + #
*/
function Cat(spawn) {

    cat = game.add.sprite(spawn.x, spawn.y, 'cat');
    cat.animations.add('left', [0, 1], 2, true, true);
    cat.scale.setTo(.75,.75);

    return cat;
}


