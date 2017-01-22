CatDefense.StartState = function(name) {};

CatDefense.StartState.prototype.preload = function() {
   // Background!
   this.game.load.image('background', 'assets/background.jpg');
   this.game.load.image('splash', 'assets/ggj_splash.jpg');
}

CatDefense.StartState.prototype.create = function() {
   this.game.add.image(-200, 0, 'splash');
   var timer = game.time.create(false);
   timer.add(3000, function(game) {

      this.game.add.image(0, 0, 'background');
      this.game.add.text(250, this.game.world.centerY, "Cat Defense!!!11!", {
         font: "80px Arial",
         fill: "#ffffff",
         align: "center"
      });
      this.game.add.text(275, this.game.world.centerY + 150, "Click to start playing right meow", {
         font: "40px Arial",
         fill: "#ffffff",
         align: "center"
      });
   });
   timer.start();
   this.game.input.mouse.capture = true;
}

CatDefense.StartState.prototype.update = function() {
   // if mouse click go to the game state
   if (this.game.input.activePointer.leftButton.isDown) {
      this.state.start('game');
   }
}
