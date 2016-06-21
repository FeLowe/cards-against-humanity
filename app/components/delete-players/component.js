import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    deletePlayers(players, answers) {
      var answerArray = answers.toArray();
      console.log(answerArray);
      answerArray.forEach(function(answer) {
        answer.set('drawn', "false");
        answer.save();
      });
      this.sendAction('deletePlayers', players);
    },
  }
});
