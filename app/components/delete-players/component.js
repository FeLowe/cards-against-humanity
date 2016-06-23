import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    deletePlayers(players, answers, questions, game) {
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

      game.set('players', []);
      game.set('round', 1);
      game.set('winners', []);
      game.set('votes', 0);
      game.set('selected', 0);
      game.set('answers', []);
      game.save();

      this.sendAction('deletePlayers', players);
    },
  }
});
