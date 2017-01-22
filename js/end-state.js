CatDefense.EndState = function(name) {};

CatDefense.EndState.prototype.preload = function() {
   // Background!
   this.game.load.image('background', 'assets/background.jpg');
   this.game.load.image('win', 'assets/win.png');
   this.game.load.image('lose', 'assets/lose.png');
}

CatDefense.EndState.prototype.create = function() {
   this.game.add.image(0, 0, 'background');
   this.game.add.image(160, 100, this.result);
   this.game.add.text(320, this.game.world.height - 100, "Click to start try again", {
      font: "40px Arial",
      fill: "#ffffff",
      align: "center"
   });
   this.game.input.mouse.capture = true;
}

CatDefense.EndState.prototype.update = function() {
   // if mouse click go to the game state
   if (this.game.input.activePointer.leftButton.isDown) {
      this.state.start('game');
   }
}

CatDefense.EndState.prototype.init = function(result) {
   this.result = result;
}
