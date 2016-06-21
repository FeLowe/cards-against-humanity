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
    submitPlayers(params1, params2, params3, params4, answers) {
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
        console.log("hello");
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
      this.transitionTo('index');
      $('#submitPlayers').hide();
      $('#destroyPlayers').show();

    },
    deletePlayers(players) {
      players.forEach(function(player){
        player.destroyRecord();
      });
      $('#destroyPlayers').hide();
      $('#submitPlayers').show();
    },
  },
});
