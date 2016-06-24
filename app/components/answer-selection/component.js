import Ember from 'ember';

export default Ember.Component.extend({

  selectedStatus: "No selection yet",
  allSelected: false,
  voted: false,
  roundComplete: false,
  playerSelected: false,
  results: [],
  selectedAnswers: [],
  resultsObserver: Ember.observer('game.votes', function() {
    if (this.get('game.votes') >= this.get('game.players.length')) {
      this.get('game.winners').then((winners) => {
        this.set('results', winners);
      });
      this.set('roundComplete', true);
    }
  }),
  selectedObserver: Ember.observer('game.selected', function() {
    if (this.get('game.selected') >= this.get('game.players.length')) {
      this.set('allSelected', true);
    }
  }),

  actions: {
    selectCard(cardSelected) {
      var selectedCount = 0;
      var selectedArray = [];
      this.set('game.selected', this.get('game.selected') + 1);
      this.get('game.answers').then((answers) => {
        var answer = cardSelected;
        answers.addObject(answer);
        this.get('game').save();
      });
      this.get('game').save();
      this.set('playerSelected', true);
      this.set('selectedStatus', cardSelected);
      this.get('allAnswers').forEach((answer)=> {
        if (answer.get('selected') === true) {
          selectedCount++;
          selectedArray.push(answer);
          this.set('selectedAnswers', selectedArray);
        }
        //change to players.length later for different player amounts
        if (selectedCount === 4) {
          this.set('allSelected', true);
        }
      });
    },
    vote(votedAnswer) {
      votedAnswer.get('votedBy').addObject(this.get('player'));
      votedAnswer.save();
      $('.voteButtons').hide();
      var winnerVotes = 0;

      var currentGame = this.get('game');
      // console.log(currentGame);
      var totalVotes = currentGame.get('votes');
      var playerCount = currentGame.get('players.length');

      var answerChoices = currentGame.get('answers');

      // currentGame.set('votes', currentGame.get('votes') + 1);
      currentGame.save();
      currentGame.set('votes', totalVotes + 1);
      currentGame.save();
      // this.get('selectedAnswers').forEach((answer) => {
      //   totalVotes += answer.get('votedBy.length');
      // });
      // console.log("total votes", totalVotes);

      if (currentGame.get('votes') >= currentGame.get('players.length')) {
        answerChoices.forEach((answer) => {
          var answerVotes = answer.get('votedBy.length');
          // console.log(answer.get('cardcontent'), "answerVotes", answerVotes);
          // console.log("winnerVotes", winnerVotes);
          if (answerVotes >= winnerVotes) {
            if (answerVotes === winnerVotes){
              // console.log("equal");
              currentGame.get('winners').then((winners) => {
                winners.addObject(answer);
                currentGame.save();
              });
            } else {
              currentGame.set('winners', []);
              winnerVotes = answerVotes;
              // console.log("greater");
              currentGame.get('winners').then((winners) => {
                winners.addObject(answer);
                currentGame.save();
              });
            }
          }
        });
      }

      this.set('voted', true);

      if (currentGame.get('votes') >= currentGame.get('players.length')) {
        currentGame.get('winners').then((winners) => {
          winners.forEach((winner) =>{
            var playerWinner = winner.get('player');
            var playerWinnerPoints = playerWinner.get('userpoints');
            var playerId = playerWinner.get('id');
            if (winners.length > 1) {

              this.get('players').forEach((player) => {
                if (player.get('id') === playerId) {
                  player.set('userpoints', player.get('userpoints') + 1);
                  player.save();
                }
              });
            } else {
              this.get('players').forEach((player) => {
                if (player.get('id') === playerId) {
                  player.set('userpoints', player.get('userpoints') + 2);
                  player.save();
                }
              });
            }
          });
        });
      }
    },

    nextRound() {
      this.set('allSelected', false);
      this.set('voted', false);
      this.set('roundComplete', false);
      this.set('playerSelected', false);
      this.set('results', []);
      this.set('selectedAnswers', []);
      this.get('allAnswers').forEach(function(answer) {
        answer.set('selected', 'false');
        answer.set('votedBy', []);
        answer.set('player', []);
        answer.save();
      });
      this.set('game.round' + 1);
      this.set('game.winners', []);
      this.set('game.votes', 0);
      this.set('game.selected', 0);
      this.set('game.answers', []);
      this.get('game').save();

      var needsCard = true;
      var cards = this.get('allAnswers').toArray();
      var player = this.get('player');
      while (needsCard) {
        var rand = Math.floor(Math.random() * cards.length);
        if (cards[rand].get('drawn') === "false") {
          var answer = cards[rand];
          player.get('answers').then((answers) => {
            this.get('selectedStatus').then((played) => {
              answers.addObject(answer);
              answers.removeObject(played);
            }).then(function() {
            console.log('TWO', player.get('answers.length'));
            player.save();

            });
          });


          // player.get('answers').then((answers) => {
          //   answers.removeObject(this.get('selectedStatus'));
          //   answers.addObject(answer);
          //
          //   console.log('TWO', player.get('answers.length'));
          // }).then(function() {
          //   player.save();
          //
          // });

          // player.get('answers').then((answers) => {
          //   console.log('ONE', player.get('answers.length'));
          // });
          cards[rand].set('drawn', "true");
          answer.set('player', this.get('player'));
          cards[rand].save();
          needsCard = false;
        } else {
          rand = Math.floor(Math.random() * cards.length);
        }
      };
    },
  }
});
