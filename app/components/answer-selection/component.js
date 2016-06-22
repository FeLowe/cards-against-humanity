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
    vote(selectedAnswer) {
      selectedAnswer.get('votedBy').addObject(this.get('player'));
      selectedAnswer.save();
      $('.voteButtons').hide();
    }
  }
});
