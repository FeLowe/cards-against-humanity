import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectCard(cardSelected) {
      var answerArray = this.get('answers').toArray();
      answerArray.forEach(function(answer) {
        answer.set('selected', "false");
        answer.save();
      });
      cardSelected.set('selected', true);
      cardSelected.save();
      //remember to reset later
      this.sendAction('selectCard', cardSelected);
    }
  }
});
