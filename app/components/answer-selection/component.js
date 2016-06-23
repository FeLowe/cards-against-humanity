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
      console.log(currentGame);
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
      console.log("total votes", totalVotes);

      if (currentGame.get('votes') >= currentGame.get('players.length')) {
        answerChoices.forEach((answer) => {
          debugger;
          var answerVotes = answer.get('votedBy.length');
          console.log(answer.get('cardcontent'), "answerVotes", answerVotes);
          console.log("winnerVotes", winnerVotes);
          if (answerVotes >= winnerVotes) {
            if (answerVotes === winnerVotes){
              console.log("equal");
              currentGame.get('winners').then((winners) => {
                winners.addObject(answer);
                currentGame.save();
              });
            } else {
              currentGame.set('winners', []);
              winnerVotes = answerVotes;
              console.log("greater");
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
        console.log("full votes");
      }
    }
  }
});
