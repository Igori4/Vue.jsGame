new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = [];
    },

    attack: function() {
      let demage = this.calculalteDemage(3, 10);
      this.monsterHealth -= demage;
      this.turns.unshift({
        isPlayer: true,
        text: "player hit the monster " + demage
      });

      this.checkWin();

      this.monsterAttack();

      this.checkWin();
    },

    specialAttack: function() {
      let demage = this.calculalteDemage(10, 15);
      this.monsterHealth -= demage;
      this.turns.unshift({
        isPlayer: true,
        text: "player hit the monster " + demage
      });
      this.monsterAttack();
      this.checkWin();
    },

    monsterAttack: function() {
      let demage = this.calculalteDemage(5, 12);
      this.playerHealth -= demage;
      this.turns.unshift({
        isPlayer: false,
        text: "monster hit the player " + demage
      });
    },

    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "plyaer heal himself to " + 10
      });
    },

    giveUp: function() {
      this.gameIsRunning = false;
    },

    calculalteDemage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkWin: function() {
      if (this.monsterHealth <= 0) {
        let playAgain = confirm("You win, do you want to plya again?");
        if (playAgain) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
      }

      if (this.playerHealth <= 0) {
        let playAgain = confirm("You lost, do you want to plya again?");
        if (playAgain) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
      }
    }
  }
});
