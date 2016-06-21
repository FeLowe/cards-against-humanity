import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    deletePlayers(players, answers, questions) {
      var answerArray = answers.toArray();
      answerArray.forEach(function(answer) {
        answer.set('drawn', "false");
        answer.save();
      });
      var questionArray = questions.toArray();
      questionArray.forEach(function(question) {
        question.set('cardShown', "false");
        question.save();
      });
      this.sendAction('deletePlayers', players);
    },
  }
});
