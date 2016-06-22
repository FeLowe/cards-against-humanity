import Ember from 'ember';

export default Ember.Component.extend({

  selectedStatus: "No selection yet",
  allSelected: false,
  voted: false,
  selectedAnswers: [],

  actions: {
    selectCard(cardSelected) {
      var selectedCount = 0;
      var selectedArray = [];
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
      var totalVotes = 0;
      var winnerVotes = 0;
      var winners = [];
      var currentGame = this.get('game');
      var answerChoices = this.get('selectedAnswers');

      this.get('selectedAnswers').forEach((answer) => {
        totalVotes += answer.get('votedBy').toArray().length;
      });
      if (totalVotes >= this.get('game.players').toArray().length) {
        console.log("hello");
        console.log(this.get('selectedAnswers'));
        answerChoices.forEach((answer) => {
          if(answer.get('votedBy').toArray().length >= winnerVotes) {
            if (answer.get('votedBy').toArray().length === winnerVotes){
              currentGame.push(answer.get('player'));
            } else {
              currentGame.set('winners', []);
              currentGame.get('winners').addObjects(answer.get('player'));
              winnerVotes = answer.get('votedBy').toArray().length;
            }
          }
        });
        console.log(winners[0]);
      }
    }
  }
});
