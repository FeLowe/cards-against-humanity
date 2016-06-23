import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      questions: this.store.findAll('question'),
      answers: this.store.findAll('answer'),
      players: this.store.findAll('player'),
      game: this.store.findRecord('game', 0)
    });
  },
  actions: {
    submitPlayers(playersPlaying, answers, questions) {

      playersPlaying.forEach(function(player) {
        var allAnswers = answers.toArray();
        var answerHand = [];

        while (answerHand.length < 10) {
          var rand = Math.floor(Math.random() * allAnswers.length);
          if (allAnswers[rand].get('drawn') === "false") {
            var answer = allAnswers[rand];
            allAnswers[rand].set('drawn', "true");
            answer.set('player', player);
            allAnswers[rand].save();
            answerHand.push(allAnswers[rand]);
          } else {
            rand = Math.floor(Math.random() * allAnswers.length);
          }
        }
        player.get('answers').addObjects(answerHand);
        player.save();
      });

      var questionsArray = questions.toArray();
      var currentQuestion = questionsArray[Math.floor(Math.random() * questionsArray.length)];
      currentQuestion.set('cardshown', "true");
      currentQuestion.set('current', "true");
      currentQuestion.save();

      this.transitionTo('index');
    },
    deletePlayers(players) {
      players.forEach(function(player){
        player.set('username', "");
        player.set('userpoints', 0);
        player.set('answers', []);
        player.save();
      });
    },
  },
});
