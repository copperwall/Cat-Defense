var loadObjects = function() {
    game.load.image('bg0', 'assets/basic-bg.png');
    game.load.image('room', 'assets/room.jpg');
    game.load.spritesheet('heart-beat', 'assets/heart-sprite.png', 100, 100);
    game.load.image('cat', 'assets/cat.png');
    game.load.spritesheet('catwalk1', 'assets/catwalk1.png', 100, 100); 
}

function Cat(x, y) {
    cat = game.add.sprite('catwalk');
    cat.animations('left', [0, 1], 2, true, true);
    cat.scale.setTo(.75,.75);
    return cat;
}
