import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    deletePlayers(players, answers) {
      var answerArray = answers.toArray();
      answerArray.forEach(function(answer) {
        answer.set('drawn', "false");
        answer.save();
      });
      this.sendAction('deletePlayers', players);
    },
  }
});
