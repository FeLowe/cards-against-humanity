import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      questions: this.store.findAll('question'),
      answers: this.store.findAll('answer'),
      players: this.store.findAll('player'),
    });
  },
  actions: {
    submitPlayers(params1, params2, params3, params4, answers, questions) {
      var answersDealt = function() {
        var allAnswers = answers.toArray();
        var answerHand = [];

        while (answerHand.length < 10) {
          var rand = Math.floor(Math.random() * allAnswers.length);
          if (allAnswers[rand].get('drawn') === "false") {
            allAnswers[rand].set('drawn', "true");
            allAnswers[rand].save();
            answerHand.push(allAnswers[rand]);
          } else {
            rand = Math.floor(Math.random() * allAnswers.length);
          }
        }
        return answerHand;
      };
      var player1 = this.store.createRecord('player', params1);
      var player2 = this.store.createRecord('player', params2);
      var player3 = this.store.createRecord('player', params3);
      var player4 = this.store.createRecord('player', params4);
      var playerArray = [player1, player2, player3, player4];
      playerArray.forEach(function(player) {
        player.get('answers').addObjects(answersDealt());
        player.save();
      });

      var questionsArray = questions.toArray();
      var currentQuestion = questionsArray[Math.floor(Math.random() * questionsArray.length)];
      currentQuestion.set('cardshown', "true");
      currentQuestion.save();
      console.log(currentQuestion);

      this.transitionTo('index');
    },
    deletePlayers(players) {
      players.forEach(function(player){
        player.destroyRecord();
      });
    },
  },
});
