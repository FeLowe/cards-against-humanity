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
    submitPlayers(params1, params2, params3, params4) {
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

        var playerArray = [player1, player2, player3, player4];
        var cards = [this.get('model.answers')];
        console.log(cards);
        playerArray.forEach(function(){

        });

    },
    deletePlayers(players) {
      players.forEach(function(players){
        players.destroyRecord();
      });
      $('#destroyPlayers').hide();
      $('#submitPlayers').show();
    },

  },
});
