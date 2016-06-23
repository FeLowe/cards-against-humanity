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

      var currentGame = this.get('game');

      var answerChoices = this.get('selectedAnswers');

      this.get('selectedAnswers').forEach((answer) => {
        totalVotes += answer.get('votedBy.length');
      });
      if (totalVotes >= currentGame.get('players.length')) {


        answerChoices.forEach((answer) => {
          if(answer.get('votedBy.length') >= winnerVotes) {
            if (answer.get('votedBy.length') === winnerVotes){
            } else {
              currentGame.set('winners', []);
              winnerVotes = answer.get('votedBy.length');

              currentGame.get('winners').then((winners) => {
                answer.get('player').then((player) => {
                  winners.addObject(player);
                  currentGame.save();
                });
              });
            }
          }
        });
      }
    }
  }
});
