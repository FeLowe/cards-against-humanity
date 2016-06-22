import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectCard(cardSelected) {
      var playerAnswerArray = this.get('playerAnswers').toArray();
      playerAnswerArray.forEach(function(playerAnswer) {
        playerAnswer.set('selected', "false");
        playerAnswer.save();
      });
      cardSelected.set('selected', true);
      cardSelected.save();
      //remember to reset later
      this.sendAction('selectCard', cardSelected);
    }
  }
});
