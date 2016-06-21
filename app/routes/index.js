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
        var allAnswers = [];
        var answerHand = [];

        answers.forEach(function(answer) {
          allAnswers.push(answer);
        });

        while (answerHand.length < 10) {
          var rand = Math.floor(Math.random() * allAnswers.length);
          if (allAnswers[rand].get('drawn') === "false") {
            allAnswers[rand].set('drawn', "true");
            allAnswers[rand].save();
            console.log(allAnswers[rand].get('drawn'));
            answerHand.push(allAnswers[rand]);
          } else {
            rand = Math.floor(Math.random() * allAnswers.length);
          }
        }

        console.log(answerHand);
        return answerHand;
      };
      console.log(answersDealt());
      var player1 = this.store.createRecord('player', params1);
      var player2 = this.store.createRecord('player', params2);
      var player3 = this.store.createRecord('player', params3);
      var player4 = this.store.createRecord('player', params4);
      player1.save();
      player2.save();
      player3.save();
      player4.save();
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
