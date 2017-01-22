
var loadObjects = function() {
    game.load.image('bg0', 'assets/basic-bg.png');
    game.load.image('room', 'assets/room.jpg');
    game.load.spritesheet('heart-beat', 'assets/heart-sprite.png', 100, 100);
    game.load.spritesheet('cat', 'assets/catwalk1.png', 100, 100); 
}


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

function Lanes(loc) {

}
