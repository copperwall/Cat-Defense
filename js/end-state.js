CatDefense.EndState = function(name) {};

CatDefense.EndState.prototype.preload = function() {
   // Background!
   this.game.load.image('background', 'assets/background.jpg');
}

CatDefense.EndState.prototype.create = function() {
   this.game.add.image(0, 0, 'background');
   this.game.add.text(250, this.game.world.centerY, "GAME OVER", {
      font: "80px Arial",
      fill: "#ffffff",
      align: "center"
   });
   this.game.add.text(275, this.game.world.centerY + 150, "Click to start try again", {
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
