import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    deletePlayers(players, answers, questions) {
      var answerArray = answers.toArray();
      answerArray.forEach(function(answer) {
        answer.set('drawn', "false");
        answer.set('selected', "false");
        answer.set('votedBy', []);
        answer.set('player', []);
        answer.save();
      });
      var questionArray = questions.toArray();
      questionArray.forEach(function(question) {
        question.set('cardshown', "false");
        question.set('current', "false");
        question.save();
      });
      this.sendAction('deletePlayers', players);
    },
  }
});
